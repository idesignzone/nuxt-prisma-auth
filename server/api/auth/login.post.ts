import { prisma } from '~/server/utils/prisma'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export default defineEventHandler(async (event) => {
  try {
    // Clear any existing session
    await clearUserSession(event)
    
    // Validate input
    const body = await readBody(event)
    const { email, password } = loginSchema.parse(body)
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    // Check if user exists and password is valid
    if (!user || !user.password) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }
    
    // Verify password
    const isPasswordValid = await verifyPassword(user.password, password)

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }
    
    // Check if email is verified
    if (!user.emailVerified) {
      throw createError({
        statusCode: 401,
        message: 'Email not verified. Please check your email for verification link.'
      })
    }
    
    // Set user session
    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      loggedInAt: new Date()
    })
    
    return {
      success: true,
      message: 'Login successful'
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        message: 'Invalid input',
        data: error.errors
      })
    }
    
    console.error('Login error:', error)
    
    // If error is already a Nuxt error, rethrow it
    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      message: 'An error occurred during login'
    })
  }
})

