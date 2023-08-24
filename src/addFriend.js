import fs from "fs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND);
const path = "./src/friends.txt";

// addFriend("joe");
export default async function addFriend(_twitterUsername) {
  // append to friends.txt
  fs.appendFileSync(path, `\n@${_twitterUsername}`);
  // read friends.txt
  const friends = fs.readFileSync(path, "utf8");
  // if list is long enough
  if (friends.split("\n").length > 1000) {
    try {
      // send email
      await resend.emails.send({
        from: "Friend.Tech Alerts <info@mail.bipsea.xyz>",
        to: process.env.EMAIL,
        subject: "Friend.Tech List",
        html: `<div>${friends}</div>`,
      });
      // clear friends.txt
      fs.writeFileSync(path, "---");
    } catch {
      return false;
    }
  }
}
