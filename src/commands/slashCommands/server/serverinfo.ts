

import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js"
import ApplicationCommand from "../../../interfaces/ApplicationCommand.js"
import moment from "moment"

export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Shows the status of the current server")
        .setDMPermission(false),

    async execute(interactive: ChatInputCommandInteraction): Promise<void> {
        if (!interactive.inCachedGuild()) return

        const roles = interactive.guild.roles.cache.sort((a, b) => b.position - a.position).map((role) => role.toString())
        const channels = interactive.guild.channels.cache.map(ch => ch.toString()).slice(2)

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`${interactive.guild.name}'s information`)
            .addFields(
                { name: "📛 name", value: `${interactive.guild.name}`, inline: true },
                { name: "🆔 ID", value: `${interactive.guild.id}`, inline: true },
                { name: "👑 Server Owner", value: `<@${interactive.guild.ownerId}>` },
                { name: "🎂 Server Creation Date", value: `${moment(interactive.guild.createdAt).locale("ko").format("LLLL")}`, inline: true },
                { name: "⚙️ User numbers", value: `${interactive.guild.memberCount}`, inline: true },
                { name: "📜 roles number", value: `${roles}` },
                { name: "📻 channels", value: `${channels}` },
            )
            .setTimestamp()
            .setAuthor({ name: `Requested by ${interactive.user.tag}`, iconURL: `${interactive.user.displayAvatarURL()}` })
            .setFooter({ text: `Made by 나봄하랑#7597` })

        if (interactive.guild.iconURL()) embed.setThumbnail(`${interactive.guild.iconURL()}`)

        await interactive.reply({ embeds: [embed] })
    }
})