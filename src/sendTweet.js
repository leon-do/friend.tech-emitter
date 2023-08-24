import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

export default async function tweet(_twitterUsername) {
  try {
    const username = _twitterUsername ? "@" + _twitterUsername : "";
    await client.v2.tweet(
      `Hello ${username} check your email for a @friendtech alert`
    );
  } catch {
    return false;
  }
}
