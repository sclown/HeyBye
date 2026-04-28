/// <reference types="@cloudflare/workers-types" />
import { buildMessage, sendToSlack } from "./message.js";

export interface Env {
  SLACK_USER_TOKEN: string;
  SLACK_CHANNEL_ID: string;
}

export default {
  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    const mode = controller.cron.startsWith("0 7") ? "morning" : "evening";
    const message = buildMessage(mode, new Date());
    ctx.waitUntil(
      sendToSlack(env.SLACK_USER_TOKEN, env.SLACK_CHANNEL_ID, message),
    );
  },
} satisfies ExportedHandler<Env>;
