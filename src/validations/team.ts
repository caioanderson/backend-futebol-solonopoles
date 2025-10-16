import { z } from 'zod'

export const createTeamBodySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  group_id: z.uuid('Team not found').min(1, 'Group id is required'),
})
