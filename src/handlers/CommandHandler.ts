import path from "path";
import { readdir, lstat } from "fs/promises";
import { Handler } from "./Handler";

export class CommandHandler extends Handler {
  async loadCommands() {
    const files = await this.loadCommandDirectory();

    this.client.logger.info(`Loaded ${files} commands`);
  }

  // load every command (file) from the commands directory and the index.ts file from every subdirectory
  async loadCommandDirectory() {
    const root = path.resolve(__dirname, "../commands");
    const fs = await readdir(root);
    const files: string[] = [];

    for (const file of fs) {
      const fp = path.resolve(root, file);
      const stat = await lstat(fp);

      if (stat.isDirectory()) {
        const subFiles = await this.loadDirectory({
          root: fp,
          fileNames: ["index.ts"],
        });
        files.push(...subFiles);
      } else {
        files.push(fp);
      }
    }

    return files;
  }
}
