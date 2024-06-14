import { Handler } from './worker'

export interface UpdateHandlerInput {
    date: string
}

export default class UpdateHandler implements Handler<UpdateHandlerInput> {
    async handle(input: UpdateHandlerInput): Promise<void> {
        // do anything
        await new Promise((resolve) => {
            setTimeout(() => {
                console.log(input)
                resolve({})
            }, 3000)
        })
    }
}
