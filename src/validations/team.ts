import { z } from 'zod'

export const createTeamBodySchema = z.object({
  name: z.string().min(1, 'Name is required'),
})
