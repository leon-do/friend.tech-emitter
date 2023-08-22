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

// getDatabase("doe");
export default async function getDatabase(twitter) {
  const { data, error } = await supabase
    .from("friends")
    .select("*")
    .eq("to", twitter);

  if (error) return [];

  console.log("getDatabase", data);
  return data;
}
