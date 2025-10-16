import { FastifyInstance } from 'fastify'
import { createMatchEvent, getAllMatches } from '../services/matchService'

export function matchRoutes(app: FastifyInstance) {
  app.get('/', getAllMatches)

  app.put('/:id/score', (request, reply) => createMatchEvent(request, reply, 'goal'))

  app.put('/:id/yellow-card', (request, reply) => createMatchEvent(request, reply, 'yellow_card'))

  app.put('/:id/red-card', (request, reply) => createMatchEvent(request, reply, 'red_card'))

  app.put('/:id/assistence', (request, reply) => createMatchEvent(request, reply, 'assist'))
}
