import { Events } from "discord.js"
import Event from "../../interfaces/Event.js"

export default new Event({
    name: Events.ClientReady,
    once: true,
    execute(): void {
        console.log(`Loggedin as ${client.user?.tag as string}!`)
    }
})