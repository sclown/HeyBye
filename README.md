# HeyBye

Automated Slack greeting messages sent **as yourself** (not a bot) via a Cloudflare Worker on cron triggers.

- **9:00 AM Berlin** — "Good morning!" with a daily emoji
  - Monday: "Good morning! Have a great start of the week!"
- **6:00 PM Berlin** — "Have a nice evening!" with a daily emoji
  - Friday: "Have a nice weekend!"

Weekdays only.

## Setup

### 1. Create a Slack User Token

1. Go to [api.slack.com/apps](https://api.slack.com/apps) and create a new app
2. Under **OAuth & Permissions**, add the `chat:write` user token scope
3. Install the app to your workspace
4. Copy the **User OAuth Token** (`xoxp-...`)

### 2. Find Your Channel ID

Open Slack, right-click the channel name → "View channel details" → copy the Channel ID at the bottom.

### 3. Deploy the Worker

```bash
npm install
npx wrangler login
npx wrangler secret put SLACK_USER_TOKEN   # paste your xoxp-... token
npx wrangler secret put SLACK_CHANNEL_ID   # paste your C... channel ID
npm run deploy
```

The worker will fire at the cron times in `wrangler.jsonc`.

## Local Testing

CLI (sends a real message):

```bash
SLACK_USER_TOKEN=xoxp-... SLACK_CHANNEL_ID=C... npm run send:morning
```

Worker dev (simulates cron locally):

```bash
npm run dev
# in another terminal:
curl "http://localhost:8787/__scheduled?cron=0+7+*+*+1-5"   # morning
curl "http://localhost:8787/__scheduled?cron=0+16+*+*+1-5"  # evening
```

For local dev, secrets come from a `.dev.vars` file (gitignored):

```
SLACK_USER_TOKEN=xoxp-...
SLACK_CHANNEL_ID=C...
```

## DST Note

Worker cron is in UTC. Defaults (`0 7` and `0 16`) target 09:00 and 18:00 Berlin during **CEST** (summer). During **CET** (winter), bump both hours by +1 in `wrangler.jsonc` and redeploy.
