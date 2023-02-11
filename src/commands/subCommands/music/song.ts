

import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import SubCommand from '../../../interfaces/SubCommand.js';

export default new SubCommand({
    async execute(interactive: ChatInputCommandInteraction): Promise<void> {
        if (!interactive.inCachedGuild()) return;

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle("Song!!")
            .setDescription(`ws : ${client.ws.ping}ws`)
            .setTimestamp()
            .setAuthor({ name: `Requested by ${interactive.user.tag}`, iconURL: `${interactive.user.displayAvatarURL()}` })
            .setFooter({ text: `Made by 나봄하랑#7597` })

        await interactive.reply({ embeds: [embed], ephemeral: true });
    },
})