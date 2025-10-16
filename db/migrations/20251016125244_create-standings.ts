import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('standings', (table) => {
    table.uuid('id').primary()
    table.uuid('group_id').references('id').inTable('groups').onDelete('CASCADE').notNullable()
    table.uuid('team_id').references('id').inTable('teams').onDelete('CASCADE').notNullable()
    table.integer('points').defaultTo(0)
    table.integer('wins').defaultTo(0)
    table.integer('draws').defaultTo(0)
    table.integer('losses').defaultTo(0)
    table.integer('goals_for').defaultTo(0)
    table.integer('goals_against').defaultTo(0)
    table.integer('goal_difference').defaultTo(0)
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.unique(['group_id', 'team_id'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('standings')
}
