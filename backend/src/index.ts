import { Client } from "discord.js";
import { readdir } from "node:fs/promises";
import { createGlobalCommand } from "./api/botExtension";

export const bot = new Client({
  intents: ["Guilds", "GuildMessages", "GuildMembers", "MessageContent"],
});

bot.on("ready", async () => {
  console.log("Bot is ready");

  await importModules();
});

bot.login(process.env.DISCORD_TOKEN);

async function importModules() {
  const path = import.meta.dir + "/../../modules";
  const dirs = await readdir(path, { withFileTypes: true });
  const modules = dirs.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
  for (const module of modules) {
    const modulePath = path + "/" + module + "/index.ts";
    const moduleImport = await import(modulePath);
    if (typeof moduleImport.default === "function") {
      moduleImport.default(bot);
    }
  }
}