

import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import ApplicationCommand from '../../../interfaces/ApplicationCommand.js';

export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!")
        .setDMPermission(false),

    async execute(interactive: ChatInputCommandInteraction): Promise<void> {
        if (!interactive.inCachedGuild()) return;

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle("Pong!!")
            .setDescription(`ws : ${client.ws.ping}ws`)
            .setTimestamp()
            .setAuthor({ name: `Requested by ${interactive.user.tag}`, iconURL: `${interactive.user.displayAvatarURL()}` })
            .setFooter({ text: `Made by 나봄하랑#7597` })

        await interactive.reply({ embeds: [embed], ephemeral: true });
    },
})