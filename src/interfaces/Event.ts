

/**
 * Event
 */
export default class Event {
    name: string
    once: boolean
    execute: (...args: any) => Promise<void> | void

    /**
     * @param {{
    *      name: string,
    *      once: boolean,
    *      execute: (...args: any) => Promise<void> | void
    *  }} options
    */
    constructor(options: {
        name: string
        once?: boolean
        execute: (...args: any) => Promise<void> | void
    }) {
        this.name = options.name
        this.once = options.once ?? false
        this.execute = options.execute
    }
}