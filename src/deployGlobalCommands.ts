

import { REST } from '@discordjs/rest'
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js'
import { Dirent, readdirSync } from 'fs'
import type ApplicationCommand from './interfaces/ApplicationCommand'
import path from 'path'
import { fileURLToPath } from 'node:url'


export default async function deployGlobalCommands() {
    const __dirname: string = path.dirname(fileURLToPath(import.meta.url))


    const commands: RESTPostAPIApplicationCommandsJSONBody[] = new Array()
    const commandsDir: Dirent[] = readdirSync(path.join(__dirname, "./commands/slashCommands"), { withFileTypes: true }).filter(dir => dir.isDirectory())
    for (const Category of commandsDir) {
        const commandsFile: string[] = readdirSync(path.join(__dirname, `./commands/slashCommands/${Category.name}`)).filter(file => file.endsWith('js'))
        for (const file of commandsFile) {
            const command: ApplicationCommand = (await import(path.join(__dirname, `./commands/slashCommands/${Category.name}/${file}`))).default as ApplicationCommand
            commands.push(command.data.toJSON())
        }
    }

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN as string)

    try {
        console.log('Started refreshing application (/) commands.')

        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID as string), {
            body: commands,
        })

        console.log('Successfully reloaded application (/) commands.')
    } catch (err) {
        console.error(err)
    }

}