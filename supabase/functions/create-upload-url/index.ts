import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {
  const { fileName } = await req.json();

  if (!fileName) {
    return new Response(
      JSON.stringify({ error: "Missing fileName" }),
      { status: 400 }
    );
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const path = `imports/${Date.now()}-${fileName}`;

  const { data, error } = await supabase.storage
    .from("uploads")
    .createSignedUploadUrl(path);

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      signedUrl: data.signedUrl,
      path,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
});
