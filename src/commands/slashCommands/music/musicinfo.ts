

import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import ApplicationCommand from "../../../interfaces/ApplicationCommand.js"
import musicinfo from "../../../button/musicinfo.js"

export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName(musicinfo.name as string)
        .setDescription("It prints out music commands.")
        .setDMPermission(false),

    async execute(interactive: ChatInputCommandInteraction): Promise<void> {
        if (!interactive.inCachedGuild()) return

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle("🎶 Music Commands information")
            .setDescription(`Prints out about music commands.`)
            .setFields(
                {
                    name: "Commands",
                    value: `\`\`\`page 1/2
01. join - Join the voice channel
02. leave - Leave the voice channel
03. info - Displays info about the currently song
04. play - Loads song from youtube using URL, KEYWORD
05. queue - Page number of queue
06. quit - Stops the bot and clear queue
07. pause - Pausees the music
08. resume - Resumes the music
09. shuffle - Shuffles the queue
10. skip - Skips the current song\`\`\``
                }
            )
            .setTimestamp()
            .setAuthor({ name: `Requested by ${interactive.user.tag}`, iconURL: `${interactive.user.displayAvatarURL()}` })
            .setFooter({ text: `Made by 나봄하랑#7597` })

        await interactive.reply({ embeds: [embed], components: [musicinfo.data] })
    }
})