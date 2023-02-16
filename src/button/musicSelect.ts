

import { QueryType } from "discord-player"
import { ActionRowBuilder, BaseInteraction, EmbedBuilder, StringSelectMenuBuilder } from "discord.js"
import DiscordButton from "../interfaces/DiscordButton.js"

export default new DiscordButton({
    name: "musicSelect",
    data: new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Nothing selected')
        ),

    async execute(interactive: BaseInteraction): Promise<any> {
        if (!interactive.isAnySelectMenu()) return

        const queue = client.player.getQueue(interactive.guildId)

        const track = await client.player?.search(interactive.values[0], {
            requestedBy: interactive.user,
            searchEngine: QueryType.AUTO
        }).then(x => x.tracks[0])

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`⏱️ | Loading track **${track.title}**`)
            .addFields(
                { name: "Author", value: `${track.author}`, inline: true },
                { name: "Time", value: `${track?.duration}`, inline: true },
                { name: "Views", value: `${track.views}`, inline: true }
            )
            .setImage(`${track.thumbnail}`)
            .setTimestamp()
            .setAuthor({ name: `Requested by ${interactive.user.tag}`, iconURL: `${interactive.user.displayAvatarURL()}` })
            .setFooter({ text: `Made by 나봄하랑#7597` })

        queue.addTrack(track)
        if (!queue.playing) await queue.play();

        await interactive.deferReply()
        await interactive.editReply({ embeds: [embed] })
    }
})