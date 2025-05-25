import { prisma } from '~/server/utils/prisma'
import { z } from 'zod'

const resetSchema = z.object({
  token: z.string(),
  password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { token, password } = resetSchema.parse(body)

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true }
  })

  if (!resetToken || resetToken.expires < new Date()) {
    throw createError({
      statusCode: 400,
      message: 'Invalid or expired reset token'
    })
  }

  // Update password and delete token
  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: {
        password: await hashPassword(password)
      }
    }),
    prisma.passwordResetToken.delete({
      where: { token }
    })
  ])

  return { success: true, message: 'Password has been reset successfully' }
})
