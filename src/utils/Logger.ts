import { BotClient } from "../classes/BotClient";
import { getTimeString } from "./TimeUtils";
export class Logger {
  constructor(client: BotClient) {
    this.client = client;
  }
  client: BotClient;

  async debug(message: string): Promise<void> {
    if (process.env.LOG_LEVEL && Number(process.env.LOG_LEVEL) > 0) return;
    await log(message, "DEBUG".cyan.bold);
  }

  async info(message: string): Promise<void> {
    if (process.env.LOG_LEVEL && Number(process.env.LOG_LEVEL) > 1) return;
    await log(message, "INFO ".blue.bold);
  }

  async warn(message: string): Promise<void> {
    if (process.env.LOG_LEVEL && Number(process.env.LOG_LEVEL) > 2) return;
    await log(message, "WARN ".yellow.bold);
  }

  async error(error: Error | string): Promise<void> {
    if (process.env.LOG_LEVEL && Number(process.env.LOG_LEVEL) > 3) return;
    const msg = error instanceof Error ? error.message : error;
    await log(msg, "ERROR".red.bold);
    if (error instanceof Error) {
      console.error(error.stack);
    }
  }
}

export async function log(message: any, level: any): Promise<void> {
  console.log(
    `${("[" + getTimeString({ full: false }) + "]").white} ${level} ${"[::]".gray} ${message}`
  );
}
