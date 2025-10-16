import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'
import { createMatchBodySchema, getMatchParamSchema, updateMatchWithEventsSchema } from '../validations/match'
import { MatchEvent } from 'knex/types/tables'
import { updateStandings } from '../utils/updateStandings'
import { formatErrorResponse } from '../utils/format-error-response'
import crypto from 'node:crypto'

export async function getAllMatches() {
  const matches = await knex('matches').select('*')
  return { matches }
}

export async function createMatch(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { location, match_date, stage, team_a_id, team_b_id } = createMatchBodySchema.parse(request.body)
    const [teamA, teamB] = await Promise.all([
      knex('teams').select('group_id').where('id', team_a_id).first(),
      knex('teams').select('group_id').where('id', team_b_id).first(),
    ])
    if (!teamA || !teamB) {
      return reply.status(400).send({ message: 'One or both teams do not exist.' })
    }
    if (stage === 'group' && teamA.group_id !== teamB.group_id) {
      return reply.status(400).send({
        message: 'In the group stage, both teams must belong to the same group',
      })
    }
    const group_id = stage === 'group' ? teamA.group_id : null
    await knex('matches').insert({
      id: crypto.randomUUID(),
      group_id,
      team_a_id,
      team_b_id,
      match_date,
      location,
      stage,
    })
    return reply.status(201).send()
  } catch (error) {
    formatErrorResponse(error, reply)
  }
}

export async function createMatchEvent(
  request: FastifyRequest,
  reply: FastifyReply,
  type: MatchEvent['type'],
) {
  try {
    const { id: matchId } = getMatchParamSchema.parse(request.params)
    const { team_a_events = [], team_b_events = [], score_a, score_b } =
      updateMatchWithEventsSchema.parse(request.body)

    const match = await knex('matches').where('id', matchId).first()
    if (!match) {
      return reply.status(404).send({ message: 'Match not found.' })
    }

    await knex('match_events').where({ match_id: matchId, type }).delete()

    if (type === 'goal' && score_a != null && score_b != null) {
      await knex('matches')
        .where({ id: matchId })
        .update({
          team_a_score: score_a,
          team_b_score: score_b,
          updated_at: knex.fn.now(),
        })
    }

    const events = [
      ...team_a_events.map((e) => ({
        id: crypto.randomUUID(),
        match_id: matchId,
        player_id: e.player_id,
        team_id: match.team_a_id,
        type,
      })),
      ...team_b_events.map((e) => ({
        id: crypto.randomUUID(),
        match_id: matchId,
        player_id: e.player_id,
        team_id: match.team_b_id,
        type,
      })),
    ]

    if (events.length) {
      await knex('match_events').insert(events)
    }

    if (type === 'goal' && match.group_id) {
      await updateStandings(match.group_id)
    }

    return reply.status(200).send({ message: `${type} events updated successfully.` })
  } catch (error) {
    formatErrorResponse(error, reply)
  }
}
