

import ApplicationCommand from "../../../interfaces/ApplicationCommand.js"
import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, version } from "discord.js"
import os from 'node:os'
import moment from "moment"

export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Displays information about the user.")
        .addUserOption(option => option
            .setName("user")
            .setDescription("Please select a user who wants to view information.")
            .setRequired(true)
        )
        .setDMPermission(false),

    execute: async function (interactive: ChatInputCommandInteraction): Promise<void> {
        if (!interactive.inCachedGuild()) return

        const infoUser = interactive.options.getUser("user", true)
        const infoMember = interactive.options.getMember("user")
        const embed = new EmbedBuilder()

        if (infoUser.id == "1072119068242489424") {
            embed
                .addFields(
                    { name: "🖥️ OS", value: `${os.type()} ${os.release()}`, inline: true },
                    { name: "💾 메모리 상태", value: `${Math.round(os.freemem() / 1000000)} MB/${Math.round(os.totalmem() / 1000000)} MB`, inline: true },
                    { name: "📂 node.js 버전", value: `${process.version}`, inline: true },
                    { name: "📂 discord.js 버전", value: `${version}` },
                )
        } else {
            embed
                .addFields(
                    { name: `📛 name`, value: `<@${infoUser.id}>`, inline: true },
                    { name: `🎂 User Creation Date`, value: `${moment(infoUser?.createdAt).locale("ko").format("LLLL")}`, inline: true },
                    { name: `🧁 Server Join Date`, value: `${moment(infoMember?.joinedAt).locale("ko").format("LLLL")}` }
                )
            if (infoUser.bot) embed.addFields({ name: `🤖 Bot`, value: `${infoUser.bot}`, inline: true })
        }
        embed
            .setColor("Random")
            .setTitle(`${infoUser.username}'s information`)
            .setThumbnail(`${infoUser.displayAvatarURL()}`)
            .setTimestamp()
            .setAuthor({ name: `Requested by ${interactive.user.tag}`, iconURL: `${interactive.user.displayAvatarURL()}` })
            .setFooter({ text: `Made by 나봄하랑#7597` })

        await interactive.reply({ embeds: [embed] })
    }
})
