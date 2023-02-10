

import { Dirent, readdirSync } from "fs"
import { REST } from "@discordjs/rest"
import { fileURLToPath } from "url"
import { Message, RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord.js"
import type ApplicationCommand from "../../../interfaces/ApplicationCommand.js"
import MessageCommand from "../../../interfaces/MessageCommand.js"
import path from "path"
const prefix = process.env.PREFIX


export default new MessageCommand({
    name: 'deploy',
    description: 'Desploys the slash Commands',
    async execute(message: Message, args: string[]): Promise<void> {
        if (message.author.id !== client.application?.owner?.id) return
        const __dirname: string = path.dirname(fileURLToPath(import.meta.url))

        if (!args[0]) {
            await message.reply(
                `Incorrect number of arguments! The correct format is \`${prefix}undeploy <guild/global>\``
            )
            return
        }

        if (args[0].toLowerCase() === "global") {

            const commands: RESTPostAPIApplicationCommandsJSONBody[] = new Array()
            const commandsDir: Dirent[] = readdirSync(path.join(__dirname, "/../../slashCommands/"), { withFileTypes: true }).filter(dir => dir.isDirectory())
            for (const Category of commandsDir) {
                const commandsFile: string[] = readdirSync(path.join(__dirname, `/../../slashCommands/${Category.name}`)).filter(file => file.endsWith('js'))
                for (const file of commandsFile) {
                    const command: ApplicationCommand = (await import(path.join(__dirname, `/../../slashCommands/${Category.name}/${file}`))).default as ApplicationCommand
                    commands.push(command.data.toJSON())
                }
            }

            const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

            try {
                console.log('Started refreshing application (/) commands.')

                await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
                    body: commands
                })

                console.log('Successfully reloaded application (/) commands.')
            } catch (err) {
                console.error(err)
            }

            await message.reply("Deploying!")
        } else if (args[0].toLowerCase() === 'guild') {
            const commands: RESTPostAPIApplicationCommandsJSONBody[] = new Array()
            const commandsDir: Dirent[] = readdirSync(path.join(__dirname, "/../../slashCommands/"), { withFileTypes: true }).filter(dir => dir.isDirectory())
            for (const Category of commandsDir) {
                const commandsFile: string[] = readdirSync(path.join(__dirname, `/../../slashCommands/${Category.name}`)).filter(file => file.endsWith('js'))
                for (const file of commandsFile) {
                    const command: ApplicationCommand = (await import(path.join(__dirname, `/../../slashCommands/${Category.name}/${file}`))).default as ApplicationCommand
                    commands.push(command.data.toJSON())
                }
            }

            const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

            try {
                console.log('Started refreshing application (/) commands.')

                await rest.put(Routes.applicationGuildCommands(
                    process.env.CLIENT_ID,
                    message.guild?.id as string
                ), {
                    body: commands
                })

                console.log('Successfully reloaded application (/) commands.')
            } catch (err) {
                console.error(err)
            }

            await message.reply("Deploying!")
        }
    }
})