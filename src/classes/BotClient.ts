import { Client, GatewayIntentBits } from "discord.js";
import { Logger } from "../utils/Logger";

export class BotClient extends Client {
  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });
  }
  public logger = new Logger(this);
}
