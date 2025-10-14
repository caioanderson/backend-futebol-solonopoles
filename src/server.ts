import fastify from 'fastify'
import { env } from './env'
import { scheduleRoutes } from './routes/schedule'
import { knex } from './database'
import { teamRoutes } from './routes/team'
import { playerRoutes } from './routes/player'

const app = fastify()
app.register(teamRoutes, { prefix: 'team' })
app.register(playerRoutes, { prefix: 'player' })
app.register(scheduleRoutes, { prefix: 'schedule' })

app.get('/teste', async() => {
  const teste = await knex('sqlite_schema').select('*')
  return teste
})

app.listen({ port: env.PORT }).then(() => {
  console.log('Server is running on http://localhost:3000')
})
