import { Client, CommandInteraction } from "discord.js";
import { bot } from "../index";

export function createGlobalCommand(name: string, description: string, execute: (interaction: CommandInteraction) => void) {
    bot.application?.commands.create({
        name: name,
        description: description
    });

    bot.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand() || interaction.commandName !== name) return;
        execute(interaction);
    });
}