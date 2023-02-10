import { Message } from 'discord.js'
import MessageCommand from '../../../interfaces/MessageCommand.js'
const prefix = process.env.PREFIX

export default new MessageCommand({
    name: 'undeploy',
    description: 'Undeploys the slash commands',
    async execute(message: Message, args: string[]): Promise<void> {
        if (message.author.id !== client.application?.owner?.id) return

        if (!args[0]) {
            await message.reply(
                `Incorrect number of arguments! The correct format is \`${prefix}undeploy <guild/global>\``
            )
            return
        }

        if (args[0].toLowerCase() === 'global') {
            await client.application?.commands.set([])

            await message.reply('Undeploying!')
        } else if (args[0].toLowerCase() === 'guild') {

            await message.guild?.commands.set([])

            await message.reply('Undeploying!')
        }
    },
})
