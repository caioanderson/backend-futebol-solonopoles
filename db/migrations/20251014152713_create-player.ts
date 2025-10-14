import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('player', (table) => {
    table.uuid('id').primary()
    table.text('name').notNullable()
    table.uuid('team_id').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()

    table.foreign('team_id').references('id').inTable('team')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('player')
}

