import fastify from 'fastify'
import { knex } from './database'
import { randomUUID } from 'crypto'
import { env } from './env'

const app = fastify()

app.get('/hello', async () => {
    const transaction = await knex('transactions')
        .insert({
            id: randomUUID(),
            title: 'Transação de teste',
            amount: '1000',
        })
        .returning('*')

    return transaction
})

app.listen({
    port: env.PATH,
}).then(() => {
    console.log(`Server is running`)
})
