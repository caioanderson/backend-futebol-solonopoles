import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('match_events', (table) => {
    table.uuid('id').primary()
    table.uuid('match_id').references('id').inTable('matches').onDelete('CASCADE').notNullable()
    table.uuid('player_id').references('id').inTable('players').onDelete('CASCADE').notNullable()
    table.uuid('team_id').references('id').inTable('teams').onDelete('CASCADE').notNullable()
    table.enu('type', ['goal', 'assist', 'yellow_card', 'red_card'], {
      useNative: true,
      enumName: 'event_type',
    }).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('match_events')
  await knex.schema.raw('DROP TYPE IF EXISTS event_type')
}

