

import { QueryType } from 'discord-player';
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import SubCommand from '../../../../interfaces/SubCommand.js';

export default new SubCommand({
    async execute(interactive: ChatInputCommandInteraction) {
        if (!interactive.inCachedGuild()) return;

        if (!interactive.member.voice.channel) return void interactive.reply({ content: "You are not in a Voice channel", ephemeral: true })

        if (interactive.guild.members.me.voice.channelId && interactive.member.voice.channelId !== interactive.guild.members.me.voice.channelId)
            return void await interactive.reply({ content: "You are not in a Voice channel", ephemeral: true });

        const url = interactive.options.getString("url")

        const queue = client.player?.createQueue(interactive.guild, {
            metadata: {
                ytdlOptions: {
                    filter: 'audioonly',
                    highWaterMark: 1 << 30,
                    dlChunkSize: 0,
                },
                channel: interactive.channel
            }
        })

        try {
            if (!queue.connection) await queue.connect(interactive.member.voice.channel);
        } catch {
            client.player?.deleteQueue(interactive.guildId)
            return void await interactive.reply({ content: "You are not in a Voice channel", ephemeral: true })
        }

        await interactive.deferReply()
        const track = await client.player?.search(url, {
            requestedBy: interactive.user,
            searchEngine: QueryType.AUTO
        }).then(x => x.tracks[0])

        queue.addTrack(track)

        if (!track) return void await interactive.followUp({ content: `❌ | Track **${url}** not found!` })

        if (!queue.playing) await queue.play();

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`⏱️ | Loading track ${track.title}`)
            .addFields({ name: "Author", value: `${track.author}`, inline: true })
            .addFields({ name: "Time", value: `${track.duration}`, inline: true })
            .addFields({ name: "Views", value: `${track.views}`, inline: true })
            .setImage(`${track.thumbnail}`)

        await interactive.editReply({ embeds: [embed] })
    },
})
