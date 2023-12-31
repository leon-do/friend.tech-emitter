import axios from "axios";

// getFriend("0xb74246Aa1d35ff55A25B82408560765213212DEc");
export default async function getFriend(address) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const friend = await axios
    .get(`https://prod-api.kosetto.com/users/${address}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log("getFriend-error:", error);
      return null;
    });

  return friend;
}
