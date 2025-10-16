import { FastifyInstance } from 'fastify'
import { getAllChampionships, getChampionshipById } from '../services/championshipService'

export function championshipRoutes(app: FastifyInstance) {
  app.get('/', getAllChampionships)

  app.post('/', getChampionshipById)
}
