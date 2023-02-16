

import { ActionRowBuilder, ButtonStyle, ButtonBuilder, BaseInteraction, Embed, } from "discord.js"
import { readdirSync, readFileSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"
import DiscordButton from "../interfaces/DiscordButton.js"

export default new DiscordButton({
    name: "musicinfo",
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

        const __dirname: string = path.dirname(fileURLToPath(import.meta.url)).replace("dist", "src")
        const MusicCommandJSON: string[] = readdirSync(path.join(__dirname, "../information/music/")).filter(file => file.endsWith('.json'))

        const EditEmbed = (index: number): Embed => {
            const min: number = 1, max: number = MusicCommandJSON.length;

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

            const musicCommands = JSON.parse(readFileSync(path.join(__dirname, `../information/music/${MusicCommandJSON[index]}`), "utf-8"))

            var value: string = "";
            var keys = Object.keys(musicCommands);
            for (var i = 0; i < keys.length; i++) {
                value += (`${index * 10 + i + 1}. ${keys[i]} - ${musicCommands[keys[i]]} \n`)
            }

            const embed = interactive.message.embeds[0]
            embed.fields[0] = { name: `Commands`, value: `\`\`\`${index + 1}/${MusicCommandJSON.length} pages\n${value}\`\`\`` }
            return embed
        }

        if (interactive.customId === "track_previous") {
            await interactive.deferUpdate()

            var index = 0
            const embed = EditEmbed(index)

            await interactive.editReply({ embeds: [embed], components: [this.data] })

            this.data.components[0].setDisabled(true)
            this.data.components[1].setDisabled(true)
            this.data.components[2].setDisabled(false)
            this.data.components[3].setDisabled(false)
        }
        if (interactive.customId === "arrow_backward") {
            await interactive.deferUpdate()

            var index = (parseInt(interactive.message.embeds[0].data.fields[0].value.replace(/`|'|\\n|/g, '').split('\n')[0].split('/')[0], 10) - 1) - 1
            const embed = EditEmbed(index)

            await interactive.editReply({ embeds: [embed], components: [this.data] })

            this.data.components[0].setDisabled(true)
            this.data.components[1].setDisabled(true)
            this.data.components[2].setDisabled(false)
            this.data.components[3].setDisabled(false)
        }
        if (interactive.customId === "arrow_forward") {

            await interactive.deferUpdate()

            var index = (parseInt(interactive.message.embeds[0].data.fields[0].value.replace(/`|'|\\n|/g, '').split('\n')[0].split('/')[0], 10) - 1) + 1

            const embed = EditEmbed(index)

            await interactive.editReply({ embeds: [embed], components: [this.data] })

            this.data.components[0].setDisabled(true)
            this.data.components[1].setDisabled(true)
            this.data.components[2].setDisabled(false)
            this.data.components[3].setDisabled(false)
        }
        if (interactive.customId === "track_next") {
            await interactive.deferUpdate()

            var index = MusicCommandJSON.length - 1

            const embed = EditEmbed(index)

            await interactive.editReply({ embeds: [embed], components: [this.data] })

            this.data.components[0].setDisabled(true)
            this.data.components[1].setDisabled(true)
            this.data.components[2].setDisabled(false)
            this.data.components[3].setDisabled(false)
        }
        if (interactive.customId === "Cancel") {
            await interactive.deferUpdate()

            await interactive.editReply({ components: [] })
        }
    }
})