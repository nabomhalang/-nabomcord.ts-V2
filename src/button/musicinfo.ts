

import { ActionRowBuilder, ButtonStyle, ButtonBuilder, BaseInteraction } from "discord.js"
import DiscordButton from "../interfaces/Button.js"

export default new DiscordButton({
    name: "musicinfo",
    data: new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('track_previous')
                .setEmoji("⏮️")
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
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

        if (interactive.customId === "Cancel") {
            await interactive.message.delete()

            await interactive.deferReply()

            await interactive.editReply("The Music Information embed Deleted...").then(() => {
                setTimeout(async () => {
                    await interactive.deleteReply()
                }, 10000);
            })
        }
        else if (interactive.customId === "track_previous") {
            console.log("track_previous")
        }
        else if (interactive.customId === "arrow_backward") {
            console.log("arrow_backward")
        }
        else if (interactive.customId === "track_next") {
            console.log("track_next")
        }
    }

})