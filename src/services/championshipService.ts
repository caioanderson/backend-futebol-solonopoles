import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'
import { formatErrorResponse } from '../utils/format-error-response'
import { createChampionshipBodySchema, updateChampionshipBodySchema, updateChampionshipParamSchema } from '../validations/championship'
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

export async function updateStageChampionship(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id: championshipId } = updateChampionshipParamSchema.parse(request.params)
    const { stage } = updateChampionshipBodySchema.parse(request.body)

    const championship = await knex('championship').select('*').where('id', championshipId)

    if (!championship) {
      return reply.status(404).send({ message: 'Championship not found.' })
    }

    await knex('championship').select('id', championship).update('current_stage', stage)

    return reply.status(200).send()

  } catch (error) {
    formatErrorResponse(error, reply)
  }
}
