import { isDatabaseReady } from '../config/db.js'
import { Member } from '../models/Member.js'
import { notifyNewMember, sendApplicationReceivedEmail } from '../services/mailer.js'
import { AppError } from '../utils/AppError.js'

export async function createJoinRequest(req, res) {
  const data = req.joinRequest

  // Honeypot: bots that fill the hidden field get a success response and no record.
  if (data.website) return res.status(201).json({ ok: true })

  if (!isDatabaseReady()) {
    throw new AppError(
      503,
      'We are not connected to the database yet. Please try again shortly, or email us directly.',
    )
  }

  try {
    const member = await Member.create({
      name: data.name,
      email: data.email,
      age: data.age,
      gender: data.gender,
      occupation: data.occupation,
      city: data.city,
      curiosity: data.curiosity,
      building: data.building,
      consent: data.consent,
      source: 'website',
    })

    notifyNewMember(member)
    sendApplicationReceivedEmail(member)

    return res.status(201).json({ ok: true })
  } catch (error) {
    if (error?.code === 11000) {
      const message = 'This email is already on the list.'
      throw new AppError(409, message, { email: message })
    }

    throw error
  }
}
