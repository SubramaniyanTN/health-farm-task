import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {
  try {
    console.log("Inserting....")
    const { filePath } = await req.json();
    console.log("File path....", filePath)
    if (!filePath) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing filePath" }),
        { status: 400 }
      );
    }

    // 🔐 Authenticated client (user context)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      {
        global: {
          headers: {
            Authorization: req.headers.get("Authorization")!,
          },
        },
      }
    );

    // ✅ Insert import job ONLY
    const { error,data } = await supabase
      .from("import_jobs")
      .insert({
        file_path: filePath,
        status: "pending",
      });
      console.log("Error....", error)
      console.log("Data....", data)
    if (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Import job created",
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: "Internal error" }),
      { status: 500 }
    );
  }
});
