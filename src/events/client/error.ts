import chalk from "chalk"
import { Events } from "discord.js"
import Event from "../../interfaces/Event.js"

export default new Event({
    name: Events.Error,
    once: false,
    execute(error: Error): void {
        console.log(`${chalk.red.bold(`[-] ${error.stack}`)}`)
    }
})