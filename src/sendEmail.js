import { Resend } from "resend";

const resend = new Resend(process.env.RESEND);

// sendEmail("d333z333@gmail.com", "0xD33z");
export default async function sendEmail(_email, _twitterUsername) {
  try {
    await resend.emails.send({
      from: "Friend.Tech Alerts <info@mail.bipsea.xyz>",
      to: _email,
      subject: "Friend.Tech Alert",
      html: `<div>@${_twitterUsername} has just signed up to friend.tech </div>`,
    });
  } catch (error) {
    console.log("sendEmail error:", error);
    return false;
  }
}
