import { FastifyInstance } from 'fastify'
import { createGroup, getAllGroups, getGroupById, getGroupWithoutTeams } from '../services/groupService'

export function groupsRoutes(app: FastifyInstance) {
  app.get('/', getAllGroups)

  app.get('/:id', getGroupWithoutTeams)

  app.get('/:id/teams', getGroupById)

  app.post('/', createGroup)
}
