import { Router } from 'express'
import { isDatabaseReady } from '../config/db.js'
import { createJoinRequest } from '../controllers/joinController.js'
import { joinRateLimit } from '../middleware/rateLimit.js'
import { validateJoinRequest } from '../middleware/validateJoin.js'

export const router = Router()

router.get('/test-email', async (req, res) => {
  try {
    const { notifyNewMember, sendApplicationReceivedEmail } = await import('../services/mailer.js')
    const testMember = {
      name: 'Aditya Test',
      email: 'theheroadityasingh498@gmail.com',
      age: 22,
      gender: 'Male',
      occupation: 'Developer',
      city: 'Delhi',
      curiosity: 'Testing automated email delivery on Render',
      building: 'Anveshana platform',
      createdAt: new Date(),
    }
    console.log('[test-email] Sending test emails...')
    const res1 = await notifyNewMember(testMember)
    const res2 = await sendApplicationReceivedEmail(testMember)
    res.json({ ok: true, message: 'Test emails triggered. Check server logs and inbox.', res1, res2 })
  } catch (err) {
    console.error('[test-email] Error:', err)
    res.status(500).json({ ok: false, error: err.message, stack: err.stack })
  }
})

router.get('/health', (req, res) => {
  res.json({
    ok: true,
    status: 'ok',
    db: isDatabaseReady() ? 'connected' : 'disconnected',
    uptime: Math.round(process.uptime()),
  })
})

router.post('/join', joinRateLimit, validateJoinRequest, createJoinRequest)
