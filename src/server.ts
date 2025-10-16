import fastify from 'fastify'
import { env } from './env'

import { teamRoutes } from './routes/team'
import { playerRoutes } from './routes/player'
import { championshipRoutes } from './routes/champioship'
import { groupsRoutes } from './routes/groups'
import { matchRoutes } from './routes/match'
import { matchEventRoutes } from './routes/match-events'

const app = fastify()

app.register(championshipRoutes, { prefix: 'championship' })
app.register(groupsRoutes, { prefix: 'groups' })
app.register(teamRoutes, { prefix: 'teams' })
app.register(playerRoutes, { prefix: 'player' })
app.register(matchRoutes, { prefix: 'match' })
app.register(matchEventRoutes, { prefix: 'match-events' })

app.listen({ port: env.PORT }).then(() => {
  console.log('Server is running on http://localhost:3333')
})
