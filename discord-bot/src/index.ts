import { Client, IntentsBitField } from "discord.js";
import { initialModuleImport } from "./lib/modules";

export const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ],
});

export let loadedModules: string[] = [];

bot.on("ready", async () => {
  await initialModuleImport();
  console.log("Bot is ready");
  console.log("Loaded modules:", loadedModules);
});

bot.login(process.env.DISCORD_TOKEN);
