import axios from "axios";

// getFriend("0xb74246Aa1d35ff55A25B82408560765213212DEc");
export default async function getFriend(address) {
  const friend = await axios
    .get(`https://prod-api.kosetto.com/users/${address}`)
    .then((res) => res.data)
    .catch(() => null);

  return friend;
}
