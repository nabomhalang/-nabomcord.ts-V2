import { Player } from "discord-player"
import { Client, Collection, Collector, InteractionCollector } from "discord.js"
import { DisTube } from "distube"
import path from "path"
import { fileURLToPath } from "url"
import ApplicationCommand from "./interfaces/ApplicationCommand"
import DiscordButton from "./interfaces/DiscordButton"
import MessageCommand from "./interfaces/MessageCommand"


interface DiscordClient extends Client {
    commands?: Collection<string, ApplicationCommand>
    messageCommands?: Collection<string, MessageCommand>
    buttons?: Collection<string, DiscordButton>
    disTube?: DisTube
    player?: Player
}

declare global {
    var client: DiscordClient

    type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
}

export { }