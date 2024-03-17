import {
  CacheType,
  ChatInputCommandInteraction,
  Message,
  PermissionResolvable,
} from "discord.js";
import { BotClient } from "../classes/BotClient";

type ArgumentType = string | number | boolean | undefined;

// COmmandArgument
export interface CommandOption {
  name: string;
  description: string;
  required: boolean;
  type: ArgumentType; // for boolean, we write an converter function
}

export interface CommandContext {
  args: Record<string, ArgumentType>;
}

export type CommandExecutionFunction = (
  client: BotClient,
  message: ChatInputCommandInteraction<CacheType> | Message<boolean>,
  context: CommandContext
) => Promise<void>;

export default abstract class Command {
  public readonly name: string = "";
  public readonly description: string = "";
  public readonly group: string = "";

  public readonly aliases: string[] = [];

  public supportsSlashCommands: boolean = true;
  public supportsMessages: boolean = true;

  public subCommands: Command[] = [];

  public readonly options: CommandOption[] = [];

  public readonly permissions: PermissionResolvable[] = [];

  abstract execute: CommandExecutionFunction;

  protected constructor(protected client: BotClient) {}

  public async buildSlashCommand(): Promise<void> {
    throw new Error("Not implemented");
  }
}

// command will be created like this: /<group> <name> <options>
