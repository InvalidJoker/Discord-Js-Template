import { BotClient } from "../classes/BotClient";

import { readdir, lstat } from "node:fs/promises";
import path from "node:path";

interface LoadDirectoryOptions {
  root: string;
  maxDeep?: number;
  fileNames?: string[];
  currentDeep?: number;
}

export class Handler {
  constructor(client: BotClient) {
    this.client = client;
  }
  public client: BotClient;

  async loadDirectory({
    root,
    maxDeep,
    fileNames,
    currentDeep,
  }: LoadDirectoryOptions): Promise<string[]> {
    const fs = await readdir(root);
    const files: string[] = [];

    for (const file of fs) {
      const fp = path.resolve(root, file);
      const stat = await lstat(fp);

      if (stat.isDirectory()) {
        if (maxDeep && currentDeep && currentDeep >= maxDeep) {
          continue;
        }
        const subFiles = await this.loadDirectory({
          root: fp,
          maxDeep,
          fileNames,
          currentDeep: currentDeep ? currentDeep + 1 : 1,
        });

        files.push(...subFiles);
      } else {
        if (fileNames && !fileNames.includes(file)) {
          continue;
        }
        files.push(fp);
      }
    }

    return files;
  }
}
