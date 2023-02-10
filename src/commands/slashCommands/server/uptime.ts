

import ApplicationCommand from "../../../interfaces/ApplicationCommand.js"
import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js"

export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName("uptime")
        .setDescription("Shows the server operating time.")
        .setDMPermission(false),

    async execute(interactive: ChatInputCommandInteraction): Promise<void> {
        let days = Math.floor(client.uptime / 86400000)
        let hours = Math.floor(client.uptime / 3600000) % 24
        let minutes = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`Uptime`)
            .setThumbnail(`https://play-lh.googleusercontent.com/OLkkt0y609LAuCyGnp5pPxEvZkbQ92U5BJXoR-VSexBrCFxGhxXF-R2pv8byLi2Frg=w480-h960`)
            .setFields(
                { name: "⏱️ Time", value: `${days}d ${hours}h ${minutes}m ${seconds}s` }
            )
            .setTimestamp()
            .setAuthor({ name: `Requested by ${interactive.user.tag}`, iconURL: `${interactive.user.displayAvatarURL()}` })
            .setFooter({ text: `Made by 나봄하랑#7597` })
        await interactive.reply({ embeds: [embed], ephemeral: true })
    }
})
