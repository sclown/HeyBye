const mode = process.argv[2] as "morning" | "evening" | undefined;

if (mode !== "morning" && mode !== "evening") {
  console.error('Usage: npx tsx src/index.ts <morning|evening>');
  process.exit(1);
}

const token = process.env.SLACK_USER_TOKEN;
const channel = process.env.SLACK_CHANNEL_ID;

if (!token || !channel) {
  console.error("Missing SLACK_USER_TOKEN or SLACK_CHANNEL_ID");
  process.exit(1);
}

const messages = {
  morning: "Good morning! :wave:",
  evening: "Have a nice evening! :wave:",
};

const response = await fetch("https://slack.com/api/chat.postMessage", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    channel,
    text: messages[mode],
  }),
});

const data = await response.json();

if (!data.ok) {
  console.error("Slack API error:", data.error);
  process.exit(1);
}

console.log(`Sent ${mode} message to channel ${channel}`);
