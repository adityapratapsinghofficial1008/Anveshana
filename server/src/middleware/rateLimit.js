import rateLimit from 'express-rate-limit'
import { env } from '../config/env.js'

export const joinRateLimit = rateLimit({
  windowMs: env.rateLimit.windowMs,
  limit: env.rateLimit.max,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, message: 'Too many requests. Please try again later.' },
})
