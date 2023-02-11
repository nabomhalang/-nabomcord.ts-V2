

import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import ApplicationCommand from "../../../interfaces/ApplicationCommand.js"
import music from "../../../button/musicinfo.js"
import path from "path"
import { fileURLToPath } from "url"
import { readdirSync, readFileSync } from "fs"

export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName(music.name as string)
        .setDescription("It prints out music commands.")
        .setDMPermission(false),

    async execute(interactive: ChatInputCommandInteraction): Promise<void> {
        if (!interactive.inCachedGuild()) return
        const __dirname: string = path.dirname(fileURLToPath(import.meta.url)).replace("dist", "src")

        const MusicCommandJSON: string[] = readdirSync(path.join(__dirname, "../../../information/music")).filter(file => file.endsWith('.json'))

        var index = 0
        const musicCommands = JSON.parse(readFileSync(path.join(__dirname, `../../../information/music/${MusicCommandJSON[index]}`), "utf-8"))

        var value: string = "";
        var keys = Object.keys(musicCommands);
        for (var i = 0; i < keys.length; i++) {
            value += (`${index * 10 + i + 1}. ${keys[i]} - ${musicCommands[keys[i]]} \n`)
        }

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle("🎶 Music Commands information")
            .setDescription(`Prints out about music commands.`)
            .setFields(
                {
                    name: `Commands`,
                    value: `\`\`\`${index + 1}/${MusicCommandJSON.length} pages\n${value}\`\`\``
                }
            )
            .setTimestamp()
            .setAuthor({ name: `Requested by ${interactive.user.tag}`, iconURL: `${interactive.user.displayAvatarURL()}` })
            .setFooter({ text: `Made by 나봄하랑#7597` })

        await interactive.reply({ embeds: [embed], components: [music.data] })
    }
})