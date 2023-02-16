

import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import musicqueue from '../../../button/musicqueue.js';
import SubCommand from '../../../interfaces/SubCommand.js';

export default new SubCommand({
    async execute(interactive: ChatInputCommandInteraction): Promise<void> {

        await interactive.deferReply()

        const queue = client.player.getQueue(interactive.guildId)
        if (!queue || !queue.playing) {
            return void await interactive.editReply("There are no songs in the queue")
        }

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1
        const page = (interactive.options.getNumber("page") || 1) - 1

        if (page > totalPages)
            return void await interactive.editReply(`Invalid Page. There are only a total of ${totalPages} pages of songs`)

        const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
            return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} - <@${song.requestedBy.id}>`
        }).join("\n")

        const currentSong = queue.current

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setFields({
                name: `${page + 1}/${totalPages} Pages`, value: `**Currently Playing**\n` +
                    (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} - <@${currentSong.requestedBy.id}>` : "None") +
                    `\n\n**Queue**\n${queueString}`
            })
            .setTimestamp()
            .setAuthor({ name: `Requested by ${interactive.user.tag}`, iconURL: `${interactive.user.displayAvatarURL()}` })
            .setFooter({ text: `Made by 나봄하랑#7597` })

        await interactive.editReply({ embeds: [embed], components: [musicqueue.data] })
    }
})