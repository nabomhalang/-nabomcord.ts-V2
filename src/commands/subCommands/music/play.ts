

import { PlayerSearchResult, QueryType } from 'discord-player'
import { ActionRowBuilder, ChatInputCommandInteraction, EmbedBuilder, StringSelectMenuBuilder } from 'discord.js'
import musicSelect from '../../../button/musicSelect.js'
import SubCommand from '../../../interfaces/SubCommand.js'


export default new SubCommand({
    async execute(interactive: ChatInputCommandInteraction) {
        if (!interactive.inCachedGuild()) return;

        if (!interactive.member.voice.channel) return void await interactive.reply({ content: "You are not in a Voice channel", ephemeral: true })
        if (interactive.guild.members.me.voice.channelId && interactive.member.voice.channelId !== interactive.guild.members.me.voice.channelId)
            return void await interactive.reply({ content: "You are not in a Voice channel", ephemeral: true });

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTimestamp()
            .setAuthor({ name: `Requested by ${interactive.user.tag}`, iconURL: `${interactive.user.displayAvatarURL()}` })
            .setFooter({ text: `Made by 나봄하랑#7597` })

        const url: string = interactive.options.getString("url")

        const selectMenuPlay = StringSelectMenuBuilder.from(musicSelect.data.components[0])
        const UrlRegex: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&=]*)/img
        const checkURL: boolean = UrlRegex.test(url)

        const queue = client.player?.createQueue(interactive.guildId, {
            metadata: {
                ytdlOptions: {
                    filter: 'audioonly',
                    highWaterMark: 1 << 30,
                    dlChunkSize: 0,
                },
                channel: interactive.channel
            }
        })

        if (!queue.connection) await queue.connect(interactive.member.voice.channel);

        const tracks: PlayerSearchResult = await client.player?.search(url, {
            requestedBy: interactive.user,
            searchEngine: QueryType.AUTO
        })

        if (!tracks.tracks.length) {
            await interactive.deferReply({ ephemeral: true })
            return void await interactive.followUp({ content: `❌ | Track **${url}** not found!`, ephemeral: true })
        }

        if (!checkURL) { // search
            const select = new EmbedBuilder()
                .setColor("Random")
                .setTitle(`🔍 | Searching **${url}**`)
                .setTimestamp()
                .setAuthor({ name: `Requested by ${interactive.user.tag}`, iconURL: `${interactive.user.displayAvatarURL()}` })
                .setFooter({ text: `Made by 나봄하랑#7597` })

            tracks.tracks.forEach((track, idx) => {
                select.addFields({ name: "** **", value: `${idx + 1}. **[${track.title}](${track.url})**` })
                selectMenuPlay.addOptions([
                    {
                        label: `${idx + 1}. ${track.title.length > 100 ? `${track.title.slice(90)}...` : track.title}`,
                        value: `${tracks.tracks[idx].url}`,
                    }
                ])
            })

            const embedSelectMenu = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenuPlay)

            await interactive.deferReply({ ephemeral: true })
            return void await interactive.followUp({ embeds: [select], components: [embedSelectMenu.toJSON()], ephemeral: true })
        }
        else if (tracks.tracks.length > 1) { // playlist
            const playlist = tracks.playlist
            queue.addTracks(tracks.tracks)

            embed
                .setTitle(`⏱️ | Loading playlist **${playlist.title}**`)
                .setDescription(`**${tracks.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
                .setImage(`${playlist.thumbnail}`)

        } else { // single music
            const track = tracks.tracks[0]
            queue.addTrack(track)

            embed
                .setTitle(`⏱️ | Loading track **${track.title}**`)
                .addFields(
                    { name: "Author", value: `${track.author}`, inline: true },
                    { name: "Time", value: `${track?.duration}`, inline: true },
                    { name: "Views", value: `${track.views}`, inline: true }
                )
                .setImage(`${track.thumbnail}`)
        }

        if (!queue.playing) await queue.play()

        await interactive.deferReply()
        return void await interactive.followUp({ embeds: [embed] })
    }
})
