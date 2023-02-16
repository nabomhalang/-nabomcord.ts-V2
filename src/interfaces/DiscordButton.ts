

import { ActionRowBuilder } from "discord.js"

/**
 * Button
 */
export default class DiscordButton {
    data: ActionRowBuilder<any>
    name: string
    execute?: (...args: any) => Promise<void>

    /**
     * 
     * @param {{
     *      data: ActionRowBuilder<any>
     *      name: string
     *      execute: (...args: any) => Promise<void>
     * }} options 
     */
    constructor(options: {
        data: ActionRowBuilder<any>
        name: string
        execute?: (...args: any) => Promise<void>
    }) {
        this.data = options.data
        this.name = options.name
        this.execute = options.execute ?? undefined
    }
}