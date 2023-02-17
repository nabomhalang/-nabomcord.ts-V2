

import { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } from "discord.js"
import ApplicationCommand from "../../../interfaces/ApplicationCommand.js"

export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName("music")
        .setDescription("commands for music")
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("play")
                .setDescription("load songs from youtube, Spotify, SoundCloud")
                .addStringOption((option) => option.setName("url").setDescription("the song's URL, playlist URL, or Search word").setRequired(true))
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("info")
                .setDescription("It prints out music commands.")
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("quit")
                .setDescription("Stops the bot and clears the queue")
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("queue")
                .setDescription("displays the current song queue")
                .addNumberOption((option) => option.setName("page").setDescription("Page number of the queue").setMinValue(1)),
        ),

    hasSubCommands: true
})
