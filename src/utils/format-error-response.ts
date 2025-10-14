
import { FastifyReply } from 'fastify'
import { ZodError } from 'zod'
import { ZodIssue } from 'zod/v3'

export function formatErrorResponse(errors: ZodError | unknown, reply: FastifyReply) {
  if (errors instanceof ZodError) {
    const errorsMessage = JSON.parse(errors.message)
    const errorsFormatted = errorsMessage.map((err: ZodIssue) => {
      return { field: err.path[0], message: err.message }
    })

    return reply.status(422).send({
      message: 'Validation failed',
      errors: errorsFormatted,
    })
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
}
