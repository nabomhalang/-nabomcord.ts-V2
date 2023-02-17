

import { ActionRowBuilder, ButtonStyle, ButtonBuilder, BaseInteraction, Embed, } from "discord.js"
import DiscordButton from "../interfaces/DiscordButton.js"

export default new DiscordButton({
    name: "musicqueue",
    data: new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setDisabled(true)
                .setCustomId('track_previous')
                .setEmoji("⏮️")
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setDisabled(true)
                .setCustomId("arrow_backward")
                .setEmoji('◀️')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId("arrow_forward")
                .setEmoji("▶️")
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId("track_next")
                .setEmoji("⏭️")
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId("Cancel")
                .setEmoji("✖️")
                .setStyle(ButtonStyle.Danger),
        ),

    async execute(interactive: BaseInteraction): Promise<void> {
        if (!interactive.isButton()) return

        const queue = client.player.getQueue(interactive.guildId)

        const totalPages = Math.ceil(queue.tracks.length / 10) || 1

        const EditEmbed = (index: number): Embed => {
            const min: number = 1, max: number = totalPages;

            if (index + 1 <= min) {
                this.data.components[0].setDisabled(true)
                this.data.components[1].setDisabled(true)
                this.data.components[2].setDisabled(false)
                this.data.components[3].setDisabled(false)
            }
            else if (index + 1 >= max) {
                this.data.components[0].setDisabled(false)
                this.data.components[1].setDisabled(false)
                this.data.components[2].setDisabled(true)
                this.data.components[3].setDisabled(true)
            }
            else {
                this.data.components[0].setDisabled(false)
                this.data.components[1].setDisabled(false)
                this.data.components[2].setDisabled(false)
                this.data.components[3].setDisabled(false)
            }

            const queueString = queue.tracks.slice(index * 10, index * 10 + 10).map((song, i) => {
                return `**${index * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} - <@${song.requestedBy.id}>`
            }).join("\n")

            const currentSong = queue.current

            const embed = interactive.message.embeds[0]
            embed.fields[0] = {
                name: `${index + 1}/${totalPages} Pages`, value: `**Currently Playing**\n` +
                    (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} - <@${currentSong.requestedBy.id}>` : "None") +
                    `\n\n**Queue**\n${queueString}`
            }

            return embed
        }

        if (interactive.customId === "track_previous") {
            await interactive.deferUpdate({ fetchReply: true })

            var index = 0
            const embed = EditEmbed(index)

            await interactive.editReply({ embeds: [embed], components: [this.data] })

            this.data.components[0].setDisabled(true)
            this.data.components[1].setDisabled(true)
            this.data.components[2].setDisabled(false)
            this.data.components[3].setDisabled(false)
        }
        if (interactive.customId === "arrow_backward") {
            await interactive.deferUpdate({ fetchReply: true })

            var index = (parseInt(interactive.message.embeds[0].data.fields[0].name.split('/')[0]) - 1) - 1
            const embed = EditEmbed(index)

            await interactive.editReply({ embeds: [embed], components: [this.data] })

            this.data.components[0].setDisabled(true)
            this.data.components[1].setDisabled(true)
            this.data.components[2].setDisabled(false)
            this.data.components[3].setDisabled(false)
        }
        if (interactive.customId === "arrow_forward") {
            await interactive.deferUpdate({ fetchReply: true })

            var index = (parseInt(interactive.message.embeds[0].data.fields[0].name.split('/')[0]) - 1) + 1

            const embed = EditEmbed(index)

            await interactive.editReply({ embeds: [embed], components: [this.data] })

            this.data.components[0].setDisabled(true)
            this.data.components[1].setDisabled(true)
            this.data.components[2].setDisabled(false)
            this.data.components[3].setDisabled(false)
        }
        if (interactive.customId === "track_next") {
            await interactive.deferUpdate({ fetchReply: true })

            var index = totalPages - 1

            const embed = EditEmbed(index)

            await interactive.editReply({ embeds: [embed], components: [this.data] })

            this.data.components[0].setDisabled(true)
            this.data.components[1].setDisabled(true)
            this.data.components[2].setDisabled(false)
            this.data.components[3].setDisabled(false)
        }
        if (interactive.customId === "Cancel") {
            await interactive.deferUpdate({ fetchReply: true })

            await interactive.editReply({ components: [] })
        }
    }
})