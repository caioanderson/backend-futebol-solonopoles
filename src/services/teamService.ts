import { FastifyReply, FastifyRequest } from 'fastify'
import { INITIAL_STANDINGS } from '../constants'
import { knex } from '../database'
import { formatErrorResponse } from '../utils/format-error-response'
import { createTeamBodySchema } from '../validations/team'
import crypto from 'node:crypto'

export async function getAllTeams() {
  const teams = await knex('teams').select('*')
  return { teams }
}

export async function createTeam(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, group_id } = createTeamBodySchema.parse(request.body)
    const teamId = crypto.randomUUID()
    await knex('teams').insert({
      id: teamId,
      name,
      group_id,
    })
    await knex('standings').insert({
      id: crypto.randomUUID(),
      team_id: teamId,
      group_id,
      ...INITIAL_STANDINGS,
    })
    return reply.status(201).send()
  } catch (error) {
    console.log(error)
    formatErrorResponse(error, reply)
  }
}
