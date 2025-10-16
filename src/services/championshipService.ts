import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'
import { formatErrorResponse } from '../utils/format-error-response'
import { createChampionshipBodySchema } from '../validations/championship'
import crypto from 'node:crypto'

export async function getAllChampionships() {
  const championship = await knex('championship').select('*')
  return { championship }
}

export async function getChampionshipById(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, year } = createChampionshipBodySchema.parse(request.body)
    await knex('championship').insert({
      id: crypto.randomUUID(),
      name,
      year,
    })
    reply.status(201).send()
  } catch (error) {
    formatErrorResponse(error, reply)
  }
}
