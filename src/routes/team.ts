import { FastifyInstance } from 'fastify'
import { createTeamBodySchema } from '../validations/team'
import { formatErrorResponse } from '../utils/format-error-response'
import { knex } from '../database'
import crypto from 'node:crypto'

export async function teamRoutes(app : FastifyInstance) {

  app.get('/', async() => {
    const team = await knex('team').select('*')
    return { team }
  })

  app.post('/', async(request, reply) => {
    try {
      const { name } = createTeamBodySchema.parse(request.body)

      await knex('team').insert({
        id: crypto.randomUUID(),
        name,
      })

      return reply.status(201).send()

    } catch (error) {
      console.log(error)
      formatErrorResponse(error, reply)
    }
  })

}
