/// <reference types="@cloudflare/workers-types" />
import { buildMessage, sendToSlack } from "./message.js";

export interface Env {
  SLACK_USER_TOKEN: string;
  SLACK_CHANNEL_ID: string;
  ENABLED: string;
}

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
    const message = buildMessage(mode, new Date());
    ctx.waitUntil(
      sendToSlack(env.SLACK_USER_TOKEN, env.SLACK_CHANNEL_ID, message),
    );
  },
} satisfies ExportedHandler<Env>;
