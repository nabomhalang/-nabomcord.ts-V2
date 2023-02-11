

import { ActionRowBuilder, ButtonBuilder } from "discord.js"

/**
 * Button
 */
export default class DiscordButton {
    data: ActionRowBuilder<ButtonBuilder>
    name: string
    execute?: (...args: any) => Promise<void> | void

    /**
     * 
     * @param {{
     *      data: ActionRowBuilder<ButtonBuilder>
     *      name: string
     *      execute: (...args: any) => Promise<void> | void
     * }} options 
     */
    constructor(options: {
        data: ActionRowBuilder<ButtonBuilder>
        name: string
        execute?: (...args: any) => Promise<void> | void
    }) {
        this.data = options.data
        this.name = options.name
        this.execute = options.execute ?? undefined
    }
}