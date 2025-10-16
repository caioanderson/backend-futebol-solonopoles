import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('championship', (table) => {
    table
      .enu('current_stage', [
        'group',
        'round_of_16',
        'quarterfinal',
        'semifinal',
        'final',
        'finished',
      ])
      .defaultTo('group')
      .notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('championship', (table) => {
    table.dropColumn('current_stage')
  })
}
