import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('matches', (table) => {
    table.uuid('id').primary()
    table.uuid('group_id').references('id').inTable('groups').onDelete('SET NULL')
    table.uuid('team_a_id').references('id').inTable('teams').onDelete('CASCADE').notNullable()
    table.uuid('team_b_id').references('id').inTable('teams').onDelete('CASCADE').notNullable()
    table.integer('team_a_score').defaultTo(0).notNullable()
    table.integer('team_b_score').defaultTo(0).notNullable()
    table.timestamp('match_date').notNullable()
    table.text('location').notNullable()
    table.text('stage').defaultTo('group').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('matches')
}

