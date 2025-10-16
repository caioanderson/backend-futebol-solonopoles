import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('player', (table) => {
    table.uuid('id').primary()
    table.text('name').notNullable()
    table.uuid('team_id').notNullable().references('id').inTable('teams').onDelete('CASCADE')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('player')
}

