

import { ChatInputCommandInteraction } from 'discord.js'
import SubCommand from '../../../interfaces/SubCommand.js';

export default new SubCommand({
    async execute(interactive: ChatInputCommandInteraction): Promise<void> {
        if (!interactive.inCachedGuild()) return

        const queue = client.player.getQueue(interactive.guildId)

        if (!queue) return void await interactive.editReply("There are no songs in the queue")

        const trackN = interactive.options.getNumber("track")
        if (trackN > queue.tracks.length) {
            await interactive.deferReply({ ephemeral: true })
            return void await interactive.editReply({ content: "Invalid track number!!" })
        }

        queue.skipTo(trackN - 1)

        await interactive.deferReply()
        return void await interactive.editReply(`I skipped ${trackN} tracks from the top of the queue.`)
    }
})