import { bot } from "../index";
import type { CommandInteraction, ApplicationCommandOptionData } from 'discord.js';

type SlashCommandData = {
    name: string;
    description: string;
    guild?: string;
    options?: ApplicationCommandOptionData[];
};

export function createSlashCommand(name: string, description: string, options?: ApplicationCommandOptionData[], guild?: string, interactionHandler?: (interaction: CommandInteraction) => void) {
    let data: SlashCommandData = {
        name: name.toLowerCase(),
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
                interactionHandler(interaction);
            }
        });
    }
}