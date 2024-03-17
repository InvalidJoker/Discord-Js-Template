import "colors";
import dotenv from "dotenv";

dotenv.config();
import { BotClient } from "./classes/BotClient";

let err = new Error("This is a test error.");

let client = new BotClient();
client.logger.info("This is a test.");

client.logger.warn("This is a test.");

client.logger.debug("This is a test.");

client.logger.error(err);

client.login(process.env.BOT_TOKEN);
