import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('teams', (table) => {
    table.uuid('id').primary()
    table.text('name').notNullable()
    table.uuid('group_id').references('id').inTable('groups').onDelete('SET NULL')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('teams')
}

