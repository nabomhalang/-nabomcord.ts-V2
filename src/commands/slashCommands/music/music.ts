

import { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } from "discord.js"
import ApplicationCommand from "../../../interfaces/ApplicationCommand.js"

export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName("music")
        .setDescription("commands for music")
        .addSubcommandGroup(
            new SlashCommandSubcommandGroupBuilder()
                .setName("play")
                .setDescription("load songs from youtube")
                .addSubcommand(
                    new SlashCommandSubcommandBuilder()
                        .setName("song")
                        .setDescription("Loads a single song from a url")
                        .addStringOption((option) => option.setName("url").setDescription("the song's url").setRequired(true))
                )
                .addSubcommand(
                    new SlashCommandSubcommandBuilder()
                        .setName("playlist")
                        .setDescription("Loads a playlist of songs from a url")
                        .addStringOption((option) => option.setName("url").setDescription("the playlist's url").setRequired(true))
                )
                .addSubcommand(
                    new SlashCommandSubcommandBuilder()
                        .setName("search")
                        .setDescription("Searches for sogn based on provided keywords")
                        .addStringOption((option) => option.setName("searchwords").setDescription("the search keywords").setRequired(true))
                )
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("info")
                .setDescription("It prints out music commands.")
        ),
    hasSubCommands: true
})
