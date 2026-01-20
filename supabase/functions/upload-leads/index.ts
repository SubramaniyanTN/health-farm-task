import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {
  try {
    console.log("🔥 upload-leads called");

    const { leads } = await req.json();

    if (!Array.isArray(leads) || leads.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "No leads provided",
        }),
        { status: 200 }
      );
    }

    const limitedLeads = leads.slice(0, 500);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase.rpc("bulk_insert_leads", {
      json_data: limitedLeads,
    });

    if (error) {
      console.error("RPC ERROR", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        inserted: limitedLeads.length,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("FUNCTION CRASH", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
      }),
      { status: 200 }
    );
  }
});
