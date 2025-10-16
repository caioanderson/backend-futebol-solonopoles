import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'
import { createGroupsBodySchema, getGroupParamSchema } from '../validations/groups'
import { formatErrorResponse } from '../utils/format-error-response'
import crypto from 'node:crypto'

export async function getAllGroups() {
  const groups = await knex('groups').select('*')
  return { groups }
}

export async function getGroupWithoutTeams(request: FastifyRequest) {
  const { id } = getGroupParamSchema.parse(request.params)
  const group = await knex('groups').where('id', id).select('*').first()
  return { group }
}

export async function getGroupById(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id: groupId } = getGroupParamSchema.parse(request.params)
    const group = await knex('groups').select('name').where('id', groupId).first()
    if (!group) {
      return reply.status(404).send({ message: 'Group not found.' })
    }
    const teamsWithStandings = await knex('standings')
      .join('teams', 'standings.team_id', '=', 'teams.id')
      .select(
        'teams.id',
        'teams.name',
        'teams.group_id',
        'standings.points',
        'standings.wins',
        'standings.draws',
        'standings.losses',
        'standings.goals_for',
        'standings.goals_against',
        'standings.goal_difference',
      )
      .where('standings.group_id', groupId)
      .orderBy([
        { column: 'standings.points', order: 'desc' },
        { column: 'standings.goal_difference', order: 'desc' },
        { column: 'standings.goals_for', order: 'desc' },
      ])
    return {
      groupName: group.name,
      teams: teamsWithStandings,
    }
  } catch (error) {
    formatErrorResponse(error, reply)
  }
}

export async function createGroup(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, championship_id } = createGroupsBodySchema.parse(request.body)
    await knex('groups').insert({
      id: crypto.randomUUID(),
      name,
      championship_id,
    })
    reply.status(201).send()
  } catch (error) {
    formatErrorResponse(error, reply)
  }
}

