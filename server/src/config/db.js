import mongoose from 'mongoose'
import { env } from './env.js'

export function isDatabaseReady() {
  return mongoose.connection.readyState === 1
}

/**
 * Connects to MongoDB. In development a missing URI only warns, so the API and
 * client can still be run locally; in production it is a fatal error.
 */
export async function connectDatabase() {
  if (!env.mongoUri) {
    console.warn('[db] MONGODB_URI is not set. /api/join will answer 503 until it is.')
    return false
  }

  try {
    await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 8000 })
    console.log('[db] connected')
    return true
  } catch (error) {
    console.error(`[db] connection failed: ${error.message}`)
    if (env.isProduction) throw error
    return false
  }
}

export function disconnectDatabase() {
  return mongoose.disconnect()
}
