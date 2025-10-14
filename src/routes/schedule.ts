import { FastifyInstance } from 'fastify'
import crypto from 'node:crypto'
import { knex } from '../database'

import { createScheduleBodySchema } from '../validations/schedule'
import { formatErrorResponse } from '../utils/format-error-response'

export async function scheduleRoutes(app: FastifyInstance) {

  app.get('/', async() => {
    const schedule = await knex('schedule').select('*')
    return { schedule }
  })

  app.post('/', async(request, reply) => {
    try {
      const { date, location, team_away, team_home, hour } = createScheduleBodySchema.parse(request.body)
      await knex('schedule').insert({
        id: crypto.randomUUID(),
        team_home,
        team_away,
        date,
        location,
        hour,
      })
      return reply.status(201).send()

    } catch (error) {
      formatErrorResponse(error, reply)
    }

  })
}
