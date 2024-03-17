import "colors";
import dotenv from "dotenv";

import { BotClient } from "./classes/BotClient";

let client = new BotClient();

dotenv.config();

client.start().catch((e) => {
  client.logger.error(e);
  process.exit(1);
});
