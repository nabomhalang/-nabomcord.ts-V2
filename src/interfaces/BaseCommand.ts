

/**
 * Base class commands
 * @abstract
 */
export default abstract class BaseCommand {
    name: string
    description: string
    execute: (...args: any) => Promise<void> | void

    /**
     * 
     * @param {{
     *      name: string
     *      description: string
     *      execute: (...args: any) => Promise<void> | void
     * }} options 
     */
    constructor(options: {
        name: string
        description: string,
        execute: (...args: any) => Promise<void> | void
    }) {
        this.name = options.name
        this.description = options.description
        this.execute = options.execute
    }

    /**
     *  
     * @param {string} name 
     */
    setName(name: string): void {
        this.name = name
    }

    /**
     * 
     * @param {string} description 
     */
    setDescription(description: string): void {
        this.description = description
    }

    /**
     * 
     * @param {(...args: any) => Promise<void> | void} executeFunction 
     */
    setExecute(executeFunction: (...args: any) => Promise<void> | void): void {
        this.execute = executeFunction
    }
}

