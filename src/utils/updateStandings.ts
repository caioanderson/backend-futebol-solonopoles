import { Standings } from 'knex/types/tables'
import { knex } from '../database'
import crypto from 'node:crypto'

export async function updateStandings(group_id: string) {
  const teams = await knex('teams').where({ group_id })
  if (!teams.length) return

  const matches = await knex('matches').where({ group_id })

  const standings: Record<string, Standings> = {}

  for (const team of teams) {
    standings[team.id] = {
      id: crypto.randomUUID(),
      group_id,
      team_id: team.id,
      points: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goals_for: 0,
      goals_against: 0,
      goal_difference: 0,
    }
  }

  for (const match of matches) {
    const { team_a_id, team_b_id, team_a_score, team_b_score } = match

    if (team_a_score == null || team_b_score == null) continue

    const teamA = standings[team_a_id]
    const teamB = standings[team_b_id]

    if (!teamA || !teamB) continue

    teamA.goals_for += team_a_score
    teamA.goals_against += team_b_score
    teamB.goals_for += team_b_score
    teamB.goals_against += team_a_score

    teamA.goal_difference = teamA.goals_for - teamA.goals_against
    teamB.goal_difference = teamB.goals_for - teamB.goals_against

    if (team_a_score > team_b_score) {
      teamA.wins++
      teamA.points = teamA.points + 3
      teamB.losses++
    } else if (team_a_score < team_b_score) {
      teamB.wins++
      teamB.points = teamB.points + 3
      teamA.losses++
    } else {
      teamA.draws++
      teamB.draws++
      teamA.points++
      teamB.points++
    }
  }

  await knex('standings').where({ group_id }).delete()
  await knex('standings').insert(Object.values(standings))
}
