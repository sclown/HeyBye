# HeyBye

Automated Slack greeting messages sent **as yourself** (not a bot) via GitHub Actions.

- **9:00 AM Berlin** — "Good morning! :wave:"
- **6:00 PM Berlin** — "Have a nice evening! :wave:"

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

The cron schedules use UTC. During CET (winter), 8:00 UTC = 9:00 AM Berlin. During CEST (summer), 9:00 AM Berlin = 7:00 UTC. Adjust the cron values in the workflow files when the clocks change, or accept the ~1 hour offset.
