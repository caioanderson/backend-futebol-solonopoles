import { FastifyInstance } from 'fastify'
import { createPlayerBodySchema } from '../validations/player'
import { formatErrorResponse } from '../utils/format-error-response'
import { knex } from '../database'

export function playerRoutes(app : FastifyInstance) {

  app.get('/', async() => {
    const player = await knex('player').select('*')
    return { player }
  })

  app.post('/', async(request, reply) => {
    try {
      const { name, teamName } = createPlayerBodySchema.parse(request.body)

      const team = await knex('team').where({ name: teamName }).first()

      if (!team) {
        return reply.status(400).send({ message: 'Team not found' })
      }

      await knex('player').insert({
        id: crypto.randomUUID(),
        name,
        team_id: team.id,
      })

      reply.status(201).send()

    } catch (error) {
      formatErrorResponse(error, reply)
    }
  })
}
