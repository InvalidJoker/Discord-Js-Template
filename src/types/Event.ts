import { ClientEvents, Events } from "discord.js";
import { BotClient } from "../classes/BotClient";

export default abstract class Event<K extends keyof ClientEvents> {
  public abstract name: K;

  constructor(protected client: BotClient) {}

  abstract execute(...args: ClientEvents[K]): Promise<void>;
}
