import { buildMessage, sendToSlack, type Mode } from "./message.js";

const mode = process.argv[2] as Mode | undefined;

if (mode !== "morning" && mode !== "evening") {
  console.error("Usage: npx tsx src/index.ts <morning|evening>");
  process.exit(1);
}

const token = process.env.SLACK_USER_TOKEN;
const channel = process.env.SLACK_CHANNEL_ID;

if (!token || !channel) {
  console.error("Missing SLACK_USER_TOKEN or SLACK_CHANNEL_ID");
  process.exit(1);
}

try {
  await sendToSlack(token, channel, buildMessage(mode, new Date()));
  console.log(`Sent ${mode} message to channel ${channel}`);
} catch (err) {
  console.error((err as Error).message);
  process.exit(1);
}
