import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('matches', (table) => {
    table.timestamp('updated_at').nullable()
  })

  await knex('matches').update({ updated_at: knex.fn.now() })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('matches', (table) => {
    table.dropColumn('updated_at')
  })
}
