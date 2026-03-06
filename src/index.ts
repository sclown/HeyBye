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

const day = new Date().getDay();
const isMonday = day === 1;
const isFriday = day === 5;

const morningEmojis = [
  ":sunrise:",
  ":sunrise_over_mountains:",
  ":city_sunrise:",
  ":sunny:"
];
const morningEmoji = morningEmojis[Math.floor(Math.random() * morningEmojis.length)];
const eveningEmojis = [
  ":city_sunset:",
  ":night_with_stars:",
  ":bridge_at_night:",
  ":cityscape:",
  ":milky_way:"
];
const eveningEmoji = eveningEmojis[Math.floor(Math.random() * eveningEmojis.length)];

let message: string;
if (mode === "morning" && isMonday) {
  message = `Good morning! Have a great start of the week! ${morningEmoji}`;
} else if (mode === "evening" && isFriday) {
  message = `Have a nice weekend! ${eveningEmoji}`;
} else {
  message = mode === "morning" ? `Good morning! ${morningEmoji}` : `Have a nice evening! ${eveningEmoji}`;
}

const response = await fetch("https://slack.com/api/chat.postMessage", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    channel,
    text: message,
  }),
});

const data = await response.json();

if (!data.ok) {
  console.error("Slack API error:", data.error);
  process.exit(1);
}

console.log(`Sent ${mode} message to channel ${channel}`);

export {};