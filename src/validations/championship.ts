import { z } from 'zod'

export const createChampionshipBodySchema = z.object({
  name: z.string().min(1, 'championship name is required.'),
  year: z.number(),
})
