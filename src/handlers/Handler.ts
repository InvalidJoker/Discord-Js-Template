import { BotClient } from "../classes/BotClient";

import { readdir, lstat } from "node:fs/promises";
import path from "node:path";

export class Handler {
  constructor(client: BotClient) {
    this.client = client;
  }
  public client: BotClient;

  async loadDirectory(root: string): Promise<string[]> {
    const fs = await readdir(root);
    const files: string[] = [];

    for (const file of fs) {
      const fp = path.resolve(root, file);
      const stat = await lstat(fp);

      if (stat.isDirectory()) {
        const subFiles = await this.loadDirectory(fp);
        files.push(...subFiles);
      } else {
        files.push(fp);
      }
    }

    return files;
  }
}
