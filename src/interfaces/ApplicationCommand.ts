

import type { ChatInputCommandInteraction, ContextMenuCommandBuilder, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js'
import { fileURLToPath } from 'node:url'
import path from 'path'
import type SubCommand from './SubCommand.js'

/**
 * ApplicationCommand
 */
export default class ApplicationCommand {
    data:
        | SlashCommandBuilder
        | ContextMenuCommandBuilder
        | SlashCommandSubcommandsOnlyBuilder
    hasSubCommands: boolean
    execute: (interactive: ChatInputCommandInteraction) => Promise<void> | void

    /**
     * @param {{
     *      data: SlashCommandBuilder | ContextMenuCommandBuilder | SlashCommandSubcommandsOnlyBuilder
     *      hasSubCommands?: boolean
     *      execute?: (interactive: ChatInputCommandinteractive) => Promise<void> | void
     *  }} options 
     */
    constructor(options: {
        data:
        | SlashCommandBuilder
        | ContextMenuCommandBuilder
        | SlashCommandSubcommandsOnlyBuilder
        hasSubCommands?: boolean
        execute?: (
            interactive: ChatInputCommandInteraction
        ) => Promise<void> | void
    }) {
        if (options.hasSubCommands) {
            this.execute = async (interactive: ChatInputCommandInteraction) => {
                const __dirname: string = path.dirname(fileURLToPath(import.meta.url))

                const subCommandGroup = interactive.options.getSubcommandGroup()
                const commandName = interactive.options.getSubcommand()

                if (!commandName) {
                    await interactive.reply({
                        content: "I couldn't understand that command...:sad:",
                        ephemeral: true
                    })
                } else {
                    try {
                        const command = (
                            await import(path.join(__dirname, `../commands/subCommands/${this.data.name}/${subCommandGroup ? `${subCommandGroup}/` : ''}${commandName}.js`))
                        ).default as SubCommand

                        await command.execute(interactive)
                    } catch (err) {
                        console.error(err)
                        await interactive.reply({
                            content: 'An error occured when attempting to execute that command...:thinking:',
                            ephemeral: true,
                        })
                    }
                }
            }
        } else if (options.execute) {
            this.execute = options.execute
        } else {
            throw new Error("No execute function provided")
        }

        this.data = options.data
        this.hasSubCommands = options.hasSubCommands ?? false
    }
}