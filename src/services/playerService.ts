import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'
import { formatErrorResponse } from '../utils/format-error-response'
import { createPlayerBodySchema } from '../validations/player'
import crypto from 'node:crypto'

export async function getAllPlayers() {
  const player = await knex('player').select('*')
  return { player }
}

export async function createPlayer(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, teamName } = createPlayerBodySchema.parse(request.body)
    const team = await knex('teams').where({ name: teamName }).first()
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
}
