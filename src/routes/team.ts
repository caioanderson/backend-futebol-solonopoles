import { FastifyInstance } from 'fastify'
import { createTeam, getAllTeams } from '../services/teamService'

export async function teamRoutes(app : FastifyInstance) {
  app.get('/', getAllTeams)

  app.post('/', createTeam)
}
