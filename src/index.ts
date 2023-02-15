

import 'dotenv/config'

import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js'
import { Dirent, readdirSync } from 'fs'
import { join } from 'path'
import path from 'path'

import type ApplicationCommand from './interfaces/ApplicationCommand.js'
import type MessageCommand from './interfaces/MessageCommand.js'
import type Event from './interfaces/Event.js'
import { fileURLToPath } from 'node:url'
import DiscordButton from './interfaces/DiscordButton.js'
import { Player } from 'discord-player'
import deployGlobalCommands from './deployGlobalCommands.js'
import "discord-player/smoothVolume"

(async () => {
    const __dirname: string = path.dirname(fileURLToPath(import.meta.url))

    await deployGlobalCommands()

    global.client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates,
        ],
        partials: [
            Partials.User,
            Partials.Channel,
            Partials.GuildMember,
            Partials.Message,
            Partials.Reaction,
            Partials.GuildScheduledEvent,
            Partials.ThreadMember
        ],
    })

    client.commands = new Collection<string, ApplicationCommand>()
    client.messageCommands = new Collection<string, MessageCommand>()
    client.buttons = new Collection<string, DiscordButton>()

    client.player = new Player(client, {
        ytdlOptions: {
            quality: "highestaudio",
            highWaterMark: 1 << 25
        }
    })

    const SlashCommandsDirs: Dirent[] = readdirSync(path.join(__dirname, "./commands/slashCommands"), { withFileTypes: true }).filter(dir => dir.isDirectory()) as Dirent[]
    for (const Category of SlashCommandsDirs) {
        const commandsFile: string[] = readdirSync(path.join(__dirname, `./commands/slashCommands/${Category.name}`)).filter(file => file.endsWith('js')) as string[]
        for (const file of commandsFile) {
            const command: ApplicationCommand = (await import(path.join(__dirname, `./commands/slashCommands/${Category.name}/${file}`))).default as ApplicationCommand
            client.commands.set(command.data.name, command)
        }
    }

    const messageCommandDirs: Dirent[] = readdirSync(path.join(__dirname, `./commands/messageCommands/`), { withFileTypes: true }).filter(dir => dir.isDirectory()) as Dirent[]
    for (const Category of messageCommandDirs) {
        const messageCommandFiles: string[] = readdirSync(path.join(__dirname, `./commands/messageCommands/${Category.name}`)).filter(file => file.endsWith(".js")) as string[]
        for (const file of messageCommandFiles) {
            const command: MessageCommand = (await import(join(__dirname, `./commands/messageCommands/${Category.name}/${file}`))).default as MessageCommand
            client.messageCommands.set(command.name, command)
        }
    }

    const buttonFiles: string[] = readdirSync(path.join(__dirname, `./button/`)).filter(file => file.endsWith(".js")) as string[]
    for (const file of buttonFiles) {
        const button: DiscordButton = (await import(join(__dirname, `./button/${file}`))).default as DiscordButton
        client.buttons.set(button.name, button)
    }

    const eventDirs: Dirent[] = readdirSync(path.join(__dirname, "./events/"), { withFileTypes: true }).filter(dir => dir.isDirectory()) as Dirent[]
    for (const Category of eventDirs) {
        const eventFiles: string[] = readdirSync(path.join(__dirname, `./events/${Category.name}`)).filter(file => file.endsWith('.js')) as string[]
        for (const file of eventFiles) {
            const event: Event = (await import(join(__dirname, `./events/${Category.name}/${file}`))).default as Event

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args))
            } else {
                client.on(event.name, (...args) => event.execute(...args))
            }
        }
    }

    await client.login(process.env.TOKEN as string)
})()

