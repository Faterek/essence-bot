import { bot } from "../index";
import type { CommandInteraction, ApplicationCommandOptionData } from 'discord.js';

export function createSlashCommand(name: string, description: string, options?: any[], guild?: string, interactionHandler?: (interaction: CommandInteraction) => void) {
    let data: { name: string; description: string; guild?: string; options?: ApplicationCommandOptionData[] } = {
        name,
        description,
    };
    if (options) {
        data.options = options;
    }
    if (guild) {
        data.guild = guild;
    }
    bot.application?.commands.create(data);

    if (interactionHandler) {
        bot.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand()) return;
            if (interaction.commandName === name) {
                await interactionHandler(interaction);
            }
        });
    }
}