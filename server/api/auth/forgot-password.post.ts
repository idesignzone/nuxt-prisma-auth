import { prisma } from '~/server/utils/prisma'
import { z } from 'zod'
import { randomBytes } from 'crypto'
import { useRuntimeConfig } from '#imports'

const forgotPasswordSchema = z.object({
  email: z.string().email()
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { email } = forgotPasswordSchema.parse(body)

  const user = await prisma.user.findUnique({
    where: { email }
  })

  // Always respond success to avoid revealing which emails are registered
  if (!user) {
    return { success: true }
  }

  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 1000 * 60 * 60) // 1 hour

  // Delete existing reset token if exists
  await prisma.passwordResetToken.deleteMany({
    where: { userId: user.id }
  })

  // Create new reset token
  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expires
    }
  })

  const { sendMail } = useNodeMailer()
  const resetLink = `${config.public.appUrl}/auth/reset-password?token=${token}`

  await sendMail({
    to: email,
    subject: 'Reset your password',
    html: `
      <h1>Password Reset Request</h1>
      <p>Hello ${user.name || 'there'},</p>
      <p>You recently requested to reset your password. Click the link below to set a new one:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>If you didn't request this, you can ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    `
  })

  return { success: true }
})
