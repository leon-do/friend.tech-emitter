import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://wzdsmylqlohsavmvnbmk.supabase.co",
  process.env.SUPABASE,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// getDatabase("elonmusk");
export default async function getDatabase(_twitterUsername) {
  const { data, error } = await supabase
    .from("friends")
    .select("*")
    .eq("to", _twitterUsername);

  if (error) return [];

  console.log("getDatabase", data);
  return data;
}
