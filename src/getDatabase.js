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
    .eq("to", _twitterUsername.toLowerCase());

  if (error) return [];

  return data;
}
