import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ token: string }>(event)
    const token = body.token

    if (!token) {
      throw createError({
        statusCode: 400,
        message: 'Verification token is required'
      })
    }

    const user = await prisma.user.findFirst({
      where: { emailVerifyToken: token }
    })

    if (!user) {
      throw createError({
        statusCode: 400,
        message: 'Invalid verification token'
      })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerifyToken: null
      }
    })

    return { success: true }
  } catch (error) {
    console.error('Email verification error:', error)
    return { success: false, error: (error as Error).message }
  }
})
