import { Router } from 'express'
import { isDatabaseReady } from '../config/db.js'
import { createJoinRequest } from '../controllers/joinController.js'
import { joinRateLimit } from '../middleware/rateLimit.js'
import { validateJoinRequest } from '../middleware/validateJoin.js'

export const router = Router()

router.get('/health', (req, res) => {
  res.json({
    ok: true,
    status: 'ok',
    db: isDatabaseReady() ? 'connected' : 'disconnected',
    uptime: Math.round(process.uptime()),
  })
})

router.post('/join', joinRateLimit, validateJoinRequest, createJoinRequest)
