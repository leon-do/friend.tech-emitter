import axios from "axios";

export default async function getTrades(address) {
  const trades = await axios
    .post("https://api.studio.thegraph.com/query/5210/friend-tech/v1", {
      query: `
        query MyQuery {
            trades(where: {trader: "${address}"}) {
                id
                blockNumber
            }
        }`,
    })
    .then((res) => res.data.data.trades)
    .catch((error) => {
      console.log("getTrades-error:", error);
      return [];
    });

  return trades;
}
