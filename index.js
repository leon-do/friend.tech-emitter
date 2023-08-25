import "dotenv/config";
import { createPublicClient, http, parseAbiItem } from "viem";
import isNewFriend from "./src/isNewFriend.js";
import getDatabase from "./src/getDatabase.js";
import getFriend from "./src/getFriend.js";
import sendEmail from "./src/sendEmail.js";
import sendTweet from "./src/sendTweet.js";
import addFriend from "./src/addFriend.js";

createPublicClient({ transport: http("https://base.meowrpc.com") }).watchEvent({
  address: "0xCF205808Ed36593aa40a44F10c7f7C2F67d4A4d4",
  event: parseAbiItem(
    "event Trade(address trader, address subject, bool isBuy, uint256 shareAmount, uint256 ethAmount, uint256 protocolEthAmount, uint256 subjectEthAmount, uint256 supply)"
  ),
  onLogs: (logs) => handleLogs(logs),
  onError: (error) => console.log("viem-error: ", error),
});

async function handleLogs(logs) {
  for (let log of logs) {
    // get trader past trades
    if (!isNewFriend(log.args)) continue;
    console.log("log", log);

    // get friend
    const friend = await getFriend(log.args.trader);
    // if no friends, skip
    if (!friend) continue;
    console.log("friend", friend);

    // append to friends.txt
    addFriend(friend.twitterUsername);

    // get rows from databae
    const rows = await getDatabase(friend.twitterUsername);
    // if no rows, skip
    if (rows.length === 0) continue;
    console.log("rows", rows);

    // send email
    for (let row of rows) {
      sendEmail(row.email, row.to);
      sendTweet(row.from);
    }
  }
}
