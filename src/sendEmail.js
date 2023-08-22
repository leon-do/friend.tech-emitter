import { Resend } from "resend";

const resend = new Resend(process.env.RESEND);

// sendEmail("vietnow1591@gmail.com", "Viet", "Duc");
export default async function sendEmail(_email, _from, _to) {
  await resend.emails.send({
    from: "Friend.Tech Alerts <onboarding@resend.dev>",
    to: _email,
    subject: "Friend.Tech Alert",
    html: `<div>Hello ${_from}</div> <div> ${_to} has just signed up to friend.tech </div>`,
  });
}
