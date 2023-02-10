import type { ChatInputCommandInteraction } from 'discord.js'

/**
 * SubCommand
 */
export default class SubCommand {
    execute: (interactive: ChatInputCommandInteraction) => Promise<void> | void

    /**
     * 
     * @param {{
     *      execute: Function
     * }} options
     */
    constructor(options: {
        execute: (interactive: ChatInputCommandInteraction) => Promise<void> | void
    }) {
        this.execute = options.execute
    }

    /**
     * 
     * @param {(
     *      interactive: ChatInputCommandInteraction
     * ) => Promise<void> | void} executeFunction 
     */
    setExecute(
        executeFunction: (
            interactive: ChatInputCommandInteraction
        ) => Promise<void> | void
    ): void {
        this.execute = executeFunction
    }

}