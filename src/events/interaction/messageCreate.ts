import type MessageCommand from "../../interfaces/MessageCommand.js"
import Event from "../../interfaces/Event.js"
import { Events, Message } from "discord.js"
const prefix = process.env.PREFIX

export default new Event({
    name: Events.MessageCreate,
    once: false,
    async execute(message: Message): Promise<void> {
        if (!message.content.startsWith(prefix) || message.author.bot) return
        if (!client.application?.owner) await client.application?.fetch()

        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = (<string>args.shift()).toLowerCase()

        const command: MessageCommand =
            (client.messageCommands.get(commandName) as MessageCommand) ||
            (client.messageCommands.find(
                (cmd: MessageCommand): boolean => cmd.aliases && cmd.aliases.includes(commandName)
            ) as MessageCommand)

        if (!command) return

        try {
            await command.execute(message, args)
        } catch (err) {
            console.error(err)
        }
    }
})