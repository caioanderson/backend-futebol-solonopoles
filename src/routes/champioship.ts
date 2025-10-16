import { FastifyInstance } from 'fastify'
import { getAllChampionships, getChampionshipById, updateStageChampionship } from '../services/championshipService'

export function championshipRoutes(app: FastifyInstance) {
  app.get('/', getAllChampionships)

  app.post('/', getChampionshipById)

  app.put('/:id', updateStageChampionship)
}
