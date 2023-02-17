

import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import ApplicationCommand from "../../../interfaces/ApplicationCommand.js"
import link from "../../../button/invite.js"

export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName(link.name as string)
        .setDescription("Generate a link to invite the Halnag discord bot.")
        .setDMPermission(false),

    async execute(interactive: ChatInputCommandInteraction): Promise<void> {
        if (!interactive.inCachedGuild()) return

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle("💌 Invite the Halnag Discord bot!")
            .setDescription(`Halnag BOT currently has ${client.users.cache.size} users on ${client.guilds.cache.size} servers.`)
            .setTimestamp()
            .setAuthor({ name: `Requested by ${interactive.user.tag}`, iconURL: `${interactive.user.displayAvatarURL()}` })
            .setFooter({ text: `Made by 나봄하랑#7597` })

        await interactive.reply({ embeds: [embed], components: [link.data], ephemeral: true })

    }
})