import { Client, IntentsBitField } from "discord.js";
import { readdir } from "node:fs/promises";
import appRoot from "app-root-path";

export const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ],
});

bot.on("ready", async () => {
  console.log("Bot is ready");

  const loadedModules = await importModules();
  console.log("Loaded modules:", loadedModules);
});

bot.login(process.env.DISCORD_TOKEN);

async function importModules() {
  const path = appRoot + "/modules";
  const dirs = await readdir(path, { withFileTypes: true });

  const modules = dirs.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
  let loadedModules = [];
  for (const module of modules) {
    const modulePath = path + "/" + module + "/index.ts";
    const moduleImport = await import(modulePath);
    if (typeof moduleImport.default === "function") {
      moduleImport.default();
      loadedModules.push(module);
    }
  }
  
  return loadedModules;
}