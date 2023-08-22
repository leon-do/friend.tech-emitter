import "dotenv/config";
import { createPublicClient, http, parseAbiItem } from "viem";
import getTrades from "./src/getTrades.js";
import getDatabase from "./src/getDatabase.js";
import getFriend from "./src/getFriend.js";
import sendEmail from "./src/sendEmail.js";

createPublicClient({ transport: http("https://1rpc.io/base") }).watchEvent({
  address: "0xCF205808Ed36593aa40a44F10c7f7C2F67d4A4d4",
  event: parseAbiItem(
    "event Trade(address trader, address subject, bool isBuy, uint256 shareAmount, uint256 ethAmount, uint256 protocolEthAmount, uint256 subjectEthAmount, uint256 supply)"
  ),
  onLogs: (logs) => handleLogs(logs),
});

async function handleLogs(logs) {
  for (let log of logs) {
    // get trader past trades
    const trades = await getTrades(log.args.trader);
    // if traded before, skip
    if (trades.length > 0) continue; 

    // get friend
    const friend = await getFriend(log.args.trader);
    // if no friends, skip
    if (!friend) continue;

    // get rows from databae
    const rows = await getDatabase(friend.twitterUsername);
    // if no rows, skip
    if (rows.length === 0) continue;

    // send email
    for (let row of rows) {
      sendEmail(row.email, row.from, row.to);
    }
  }
}
