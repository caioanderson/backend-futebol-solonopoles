import { FastifyInstance } from 'fastify'
import { getAllMatchEvents } from '../services/matchEventsService'

export function matchEventRoutes(app: FastifyInstance) {
  app.get('/', getAllMatchEvents)
}
