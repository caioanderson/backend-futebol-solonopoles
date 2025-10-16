import { z } from 'zod'

export const createChampionshipBodySchema = z.object({
  name: z.string().min(1, 'championship name is required.'),
  year: z.number(),
})

export const updateChampionshipParamSchema = z.object({
  id: z.uuid(),
})

export const updateChampionshipBodySchema = z.object({
  stage: z.enum(['group', 'round_of_16', 'quarterfinal', 'semifinal', 'final', 'finished']),
})
