# HeyBye

Automated Slack greeting messages sent **as yourself** (not a bot) via GitHub Actions.

- **~9:00 AM Berlin** — "Good morning!" with random sunrise emoji
  - Monday: "Good morning! Have a great start of the week!"
- **~6:00 PM Berlin** — "Have a nice evening!" with random evening emoji
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

### 3. Add GitHub Secrets

In your repo → Settings → Secrets and variables → Actions, add:

| Secret             | Value                        |
| ------------------ | ---------------------------- |
| `SLACK_USER_TOKEN` | Your `xoxp-...` user token   |
| `SLACK_CHANNEL_ID` | Target channel ID (`C...`)   |

### 4. Push & Go

The workflows run automatically on weekdays. You can also trigger them manually from the Actions tab (`workflow_dispatch`).

## Local Testing

```bash
npm install
SLACK_USER_TOKEN=xoxp-... SLACK_CHANNEL_ID=C... npm run send:morning
```

## DST Note

The cron schedules use UTC and are set to 6:40 UTC (morning) and 15:40 UTC (evening) to account for ~20 minute GitHub Actions delay. During CEST (summer), this targets ~9:00 AM and ~6:00 PM Berlin. During CET (winter), adjust the cron values by +1 hour, or accept the ~1 hour offset.
