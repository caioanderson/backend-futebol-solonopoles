import { z } from 'zod'

export const createGroupsBodySchema = z.object({
  name: z.string().min(1, 'Group name is required'),
  championship_id: z.uuid('Group not found').min(1, 'Championship is required'),
})

export const getGroupParamSchema = z.object({
  id: z.uuid('Group not found').min(1, 'Group id is required'),
})
