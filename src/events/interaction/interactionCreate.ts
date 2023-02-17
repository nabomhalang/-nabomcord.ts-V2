import { BaseInteraction, ChatInputCommandInteraction, Events } from "discord.js"
import type ApplicationCommand from "../../interfaces/ApplicationCommand.js"
import Event from "../../interfaces/Event.js"

export default new Event({
    name: Events.InteractionCreate,
    once: false,
    async execute(interactive: BaseInteraction): Promise<void> {
        if (!interactive.isChatInputCommand()) return

        if (!client.commands.has(interactive.commandName)) return

        try {
            const command: ApplicationCommand = (await client.commands.get(interactive.commandName)) as ApplicationCommand

            if (!command) return

            await command.execute(interactive as ChatInputCommandInteraction)
        } catch (err) {
            console.error(err as Error)

            await interactive.deferReply()
            await interactive.followUp({
                content: "There was an error while executing this command!",
                ephemeral: true
            })
        }
    }

})