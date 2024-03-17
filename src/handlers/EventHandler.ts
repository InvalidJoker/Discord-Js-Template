import { Handler } from "./Handler";
import path from "node:path";

export class EventHandler extends Handler {
  async loadEvents(): Promise<void> {
    const files = await this.loadDirectory(
      path.resolve(__dirname, "../events")
    );

    for (const file of files) {
      const { default: Event } = await import(file);
      const instance = new Event(this.client);

      this.client.on(instance.name, instance.execute.bind(instance));
    }

    this.client.logger.info(`Loaded ${files.length} events`);
  }
}
