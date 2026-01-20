import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const BATCH_SIZE = 500;
const SLEEP_MS = 200;
const MAX_TOTAL = 40000;


const sleep = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

function chunkArray<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

Deno.serve(async (req) => {
  try {
    const { leads } = await req.json();

    if (!Array.isArray(leads) || leads.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "No leads provided" }),
        { status: 400 }
      );
    }

    // 🔒 Hard safety cap
    const limited = leads.slice(0, MAX_TOTAL);

    const batches = chunkArray(limited, BATCH_SIZE);

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let inserted = 0;

    for (let i = 0; i < batches.length; i++) {
      console.log(`Batch ${i + 1}/${batches.length}`);

      const { error } = await supabaseAdmin.rpc("bulk_insert_leads", {
        json_data: batches[i],
      });

      if (error) {
        console.error("Batch failed", i + 1, error);
        return new Response(
          JSON.stringify({
            success: false,
            failedBatch: i + 1,
            error: error.message,
          }),
          { status: 500 }
        );
      }

      inserted += batches[i].length;
      await sleep(SLEEP_MS);
    }

    return new Response(
      JSON.stringify({
        success: true,
        inserted,
        batches: batches.length,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Edge crash", err);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500 }
    );
  }
});
