// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  interface Championship {
    id: string,
    name: string,
    year: number
    created_at: string
  }

  interface Groups {
    id: string,
    name: string,
    championship_id: string,
    created_at: string
  }

  interface Team {
    id: string
    name: string
    created_at: string
  }

  interface Player {
    id: string
    name: string
    team_id: string
    created_at: string
  }

  interface Match {
    id: string
    group_id: string
    team_a_id: string
    team_b_id: string
    team_a_score: number
    team_b_score: number
    match_date: string
    location: string
    stage: string
    created_at: string
  }

  interface MatchEvent {
    id: string
    match_id: string
    player_id: string
    team_id: string
    type: 'goal'| 'assist'| 'yellow_card'| 'red_card'
  }

  interface Standings {
    id: string
    group_id: string
    team_id: team.id
    points: number
    wins: number
    draws: number
    losses: number
    goals_for: number
    goals_against: number
    goal_difference: number
  }

  export interface Tables {
    championship: Championship
    groups: Groups
    team: Team
    player: Player
    match: Match
    match_event: MatchEvent,
    standings: Standings
  }
}

