// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  interface Schedule {
    id: string
    team_home: string
    team_away: string
    date: string
    hour: string
    location: string
    team_home_score: number
    team_away_score: number
    is_finished: boolean
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

  export interface Tables {
    schedule: Schedule
    team: Team
    player: Player
  }
}

