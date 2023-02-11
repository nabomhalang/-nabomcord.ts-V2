

import { ActionRowBuilder, ButtonStyle, ButtonBuilder } from "discord.js"
import DiscordButton from "../interfaces/DiscordButton.js"

export default new DiscordButton({
    name: "invite",
    data: new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setLabel("invite")
                .setEmoji("✉️")
                .setStyle(ButtonStyle.Link)
                .setURL("https://discord.com/api/oauth2/authorize?client_id=1072119068242489424&permissions=1085824953584&scope=bot%20applications.commands")
        )
})