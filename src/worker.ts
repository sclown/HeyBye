/// <reference types="@cloudflare/workers-types" />
import { buildMessage, sendToSlack } from "./message.js";

export interface Env {
  SLACK_USER_TOKEN: string;
  SLACK_CHANNEL_ID: string;
  ENABLED: string;
}

const MAX_JITTER_MINUTES = 5;

export default {
  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    if (env.ENABLED !== "true") {
      console.log(`Skipped: ENABLED=${env.ENABLED}`);
      return;
    }
    const mode = controller.cron.startsWith("0 7") ? "morning" : "evening";
    const delaySeconds =
      1 + Math.floor(Math.random() * MAX_JITTER_MINUTES * 60);
    const postAt = Math.floor(Date.now() / 1000) + delaySeconds;
    ctx.waitUntil(
      sendToSlack(
        env.SLACK_USER_TOKEN,
        env.SLACK_CHANNEL_ID,
        buildMessage(mode, new Date()),
        postAt,
      ),
    );
  },
} satisfies ExportedHandler<Env>;
