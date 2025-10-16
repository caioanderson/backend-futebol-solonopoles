import { FastifyInstance } from 'fastify'
import { createPlayer, getAllPlayers } from '../services/playerService'

export function playerRoutes(app : FastifyInstance) {
  app.get('/', getAllPlayers)

  app.post('/', createPlayer)
}
