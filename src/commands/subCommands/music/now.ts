


import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import SubCommand from '../../../interfaces/SubCommand.js';

export default new SubCommand({
    async execute(interactive: ChatInputCommandInteraction): Promise<void> {
        if (!interactive.inCachedGuild()) return
        await interactive.deferReply()

        const queue = client.player.getQueue(interactive.guildId)

        if (!queue) return void await interactive.editReply("There are no songs in the queue")

        var bar = queue.createProgressBar({
            queue: true,
            timecodes: true,
        })

        const song = queue.current

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setThumbnail(song.thumbnail)
            .setDescription(`**Currently Playing**\n [${song.title}](${song.url})\n\n` + bar)
            .setTimestamp()
            .setAuthor({ name: `Requested by ${interactive.user.tag}`, iconURL: `${interactive.user.displayAvatarURL()}` })
            .setFooter({ text: `Made by 나봄하랑#7597` })

        return void await interactive.editReply({ embeds: [embed] })
    }
})