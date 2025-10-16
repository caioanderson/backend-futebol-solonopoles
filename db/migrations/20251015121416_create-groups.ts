import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('groups', (table) => {
    table.uuid('id').primary()
    table.text('name').notNullable()
    table.uuid('championship_id').notNullable().references('id').inTable('championship').onDelete('CASCADE')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('groups')
}

