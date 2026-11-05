import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const read = (key, fallback = '') => (process.env[key] ?? fallback).trim()

function readNumber(key, fallback) {
  const value = Number(read(key, String(fallback)))
  return Number.isFinite(value) && value > 0 ? value : fallback
}

const nodeEnv = read('NODE_ENV', 'development')

export const env = {
  nodeEnv,
  isProduction: nodeEnv === 'production',
  port: readNumber('PORT', 5000),
  mongoUri: read('MONGODB_URI'),
  clientOrigins: read('CLIENT_ORIGIN', 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  rateLimit: {
    windowMs: readNumber('RATE_LIMIT_WINDOW_MS', 60 * 60 * 1000),
    max: readNumber('RATE_LIMIT_MAX', 5),
  },
  smtp: {
    host: read('SMTP_HOST'),
    port: readNumber('SMTP_PORT', 587),
    user: read('SMTP_USER'),
    pass: read('SMTP_PASS'),
    from: read('SMTP_FROM', `Anveshana <${read('SMTP_USER')}>`),
  },
  notifyEmail: read('NOTIFY_EMAIL', 'theheroadityasingh498@gmail.com'),
}

export function assertProductionEnv() {
  if (!env.isProduction) return

  if (!env.mongoUri) {
    console.error('[env] MONGODB_URI is required in production.')
    process.exit(1)
  }

  if (env.clientOrigins.includes('*')) {
    console.error('[env] CLIENT_ORIGIN cannot be "*" in production.')
    process.exit(1)
  }
}
