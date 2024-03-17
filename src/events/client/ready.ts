import Event from "../../types/Event";
import { Client, ClientEvents, Events } from "discord.js";
import type { BotClient } from "../../classes/BotClient";

export default class ReadyEvent extends Event<Events.ClientReady> {
  public readonly name = Events.ClientReady;

  public async execute(): Promise<void> {
    this.client.logger.info("Bot is ready");
  }
}
