export type Mode = "morning" | "evening";

const morningEmojis = [
  ":city_sunrise:",
  ":sunrise:",
  ":coffee:",
  ":sunrise_over_mountains:",
  ":sunny:",
];

const eveningEmojis = [
  ":city_sunset:",
  ":night_with_stars:",
  ":bridge_at_night:",
  ":cityscape:",
  ":sparkles:",
];

export function buildMessage(mode: Mode, date: Date): string {
  const day = date.getDay();
  const morningEmoji = morningEmojis[day - 1];
  const eveningEmoji = eveningEmojis[day - 1];

  if (mode === "morning" && day === 1) {
    return `Good morning! Have a great start of the week! ${morningEmoji}`;
  }
  if (mode === "evening" && day === 5) {
    return `Have a nice weekend! ${eveningEmoji}`;
  }
  return mode === "morning"
    ? `Good morning! ${morningEmoji}`
    : `Have a nice evening! ${eveningEmoji}`;
}

export async function sendToSlack(
  token: string,
  channel: string,
  text: string,
): Promise<void> {
  const response = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ channel, text }),
  });

  const data = (await response.json()) as { ok: boolean; error?: string };
  if (!data.ok) {
    throw new Error(`Slack API error: ${data.error}`);
  }
}
