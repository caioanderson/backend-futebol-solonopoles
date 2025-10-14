import { z } from 'zod'

export const createPlayerBodySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  teamName: z.string().min(1, 'Team name is required'),
})
