import { z } from 'zod'

export const createMatchBodySchema = z.object({
  team_a_id: z.string().min(1, 'Team A name is required'),
  team_b_id: z.string().min(1, 'Team B name is required'),
  match_date: z.string().regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/,
    'A data deve estar no formato ISO 8601 (ex: 2025-10-20T19:00:00Z)',
  )
    .transform((value) => new Date(value)),
  location: z.string().min(1, 'Team A name is required'),
  stage: z.enum(['group', 'quarterfinal', 'semifinal', 'final']).default('group'),
})

export const getMatchParamSchema = z.object({
  id: z.string().min(1, 'MatchId is required'),
})

const teamEventsSchema = z.array(z.object({
  player_id: z.uuid(),
})).optional()

export const updateMatchWithEventsSchema = z.object({
  score_a: z.number().int().min(0).optional(),
  score_b: z.number().int().min(0).optional(),
  team_a_events: teamEventsSchema,
  team_b_events: teamEventsSchema,
})

