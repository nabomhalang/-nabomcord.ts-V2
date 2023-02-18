

import { ChatInputCommandInteraction } from 'discord.js'
import SubCommand from '../../../interfaces/SubCommand.js';

export default new SubCommand({
    async execute(interactive: ChatInputCommandInteraction): Promise<void> {
        if (!interactive.inCachedGuild()) return
        await interactive.deferReply()

        const queue = client.player.getQueue(interactive.guildId)

        if (!queue) return void await interactive.editReply("There are no songs in the queue")
        queue.shuffle()

        return void await interactive.editReply("Shuffle the music queue!!")
    }
})