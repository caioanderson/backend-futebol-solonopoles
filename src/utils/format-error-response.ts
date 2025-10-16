
import { FastifyReply } from 'fastify'
import { ZodError } from 'zod'

export function formatErrorResponse(errors: ZodError | unknown, reply: FastifyReply) {
  if (errors instanceof ZodError) {
    const errorsFormatted = errors.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }))

    return reply.status(422).send({
      message: 'Validation failed',
      errors: errorsFormatted,
    })
  }

  if (errors instanceof Error) {
    return reply.status(400).send({
      message: errors.message || 'Bad request',
    })
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
}
