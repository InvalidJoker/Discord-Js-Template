import { Client, GatewayIntentBits } from "discord.js";
import { Logger } from "../utils/Logger";
import path from "node:path";
import { CommandHandler } from "../handlers/CommandHandler";
import { EventHandler } from "../handlers/EventHandler";

export class BotClient extends Client {
  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });
  }
  public logger = new Logger(this);
  public commandHandler = new CommandHandler(this);
  public eventHandler = new EventHandler(this);

  async start(): Promise<void> {
    this.logger.info("Bot is starting...");

    await this.eventHandler.loadEvents();

    this.login(process.env.BOT_TOKEN);
  }
}
