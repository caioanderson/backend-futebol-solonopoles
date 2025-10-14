import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('schedule', (table) => {
    table.uuid('id').primary()
    table.text('team_home').notNullable()
    table.text('team_away').notNullable()
    table.text('date').notNullable()
    table.text('hour').notNullable()
    table.text('location').notNullable()
    table.integer('team_home_score').defaultTo(0).notNullable()
    table.integer('team_away_score').defaultTo(0).notNullable()
    table.boolean('is_finished').defaultTo(false).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()

    // table.foreign('team_home').references('id').inTable('teams')
    // table.foreign('team_away').references('id').inTable('teams')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('schedule')
}

