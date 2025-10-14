import { z } from 'zod'

export const createScheduleBodySchema = z.object({
  team_home: z.string(),
  team_away: z.string(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format. Use YYYY-MM-DD.',
  }),
  location: z.string(),
  hour: z.string().refine((time) => {
    const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/
    return timeRegex.test(time)
  }, {
    message: 'Invalid time format. Use HH:MM in 24-hour format.',
  }),
})
