import { prisma } from '~/server/utils/prisma'

import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional()
})

export default defineEventHandler(async (event) => {
  try {
    // Clear any existing session
    await clearUserSession(event)
    
    // Validate input
    const body = await readBody(event)
    const { email, password, name } = registerSchema.parse(body)
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'Validation error',
        data: [
          { name: 'email', message: 'Email already in use' }
        ]
      })
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password)
    
    // Generate verification token
    const emailVerifyToken = uuidv4()
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        emailVerifyToken
      }
    })
    
    // Send verification email
    const { sendMail } = useNodeMailer()
    const config = useRuntimeConfig()
    const verificationUrl = `${config.public.appUrl}/auth/verify-email?token=${emailVerifyToken}`
    
    await sendMail({
      to: email,
      subject: 'Verify your email address',
      html: `
        <h1>Email Verification</h1>
        <p>Hello ${name || 'there'},</p>
        <p>Please click the link below to verify your email address:</p>
        <p><a href="${verificationUrl}">Verify Email</a></p>
        <p>If you did not create an account, please ignore this email.</p>
      `
    })
    
    return {
      success: true,
      message: 'Registration successful. Please check your email to verify your account.'
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        message: 'Invalid input',
        data: error.errors
      })
    }

    if (error?.statusCode) {
      throw error
    }
    
    console.error('Registration error:', error)
    throw createError({
      statusCode: 500,
      message: 'An error occurred during registration'
    })
  }
})
