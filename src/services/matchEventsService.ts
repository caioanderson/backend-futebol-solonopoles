import { knex } from '../database'

export async function getAllMatchEvents() {
  const matchEvents = await knex('match_events').select('*')
  return { matchEvents }
}
