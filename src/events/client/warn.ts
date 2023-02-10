

import chalk from "chalk"
import { Events } from "discord.js"
import Event from "../../interfaces/Event.js"

export default new Event({
    name: Events.Warn,
    once: false,
    execute(info: any): void {
        console.log(chalk.yellow.bold(`[@] ${info}`))
        console.warn()
    }
})