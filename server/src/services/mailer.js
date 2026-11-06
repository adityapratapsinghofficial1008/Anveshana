import nodemailer from 'nodemailer'
import { env } from '../config/env.js'

/**
 * Sends an email via Brevo's HTTPS REST API.
 * Uses port 443 (standard HTTPS), which is NEVER blocked by Render or other cloud hosts.
 */
async function sendViaBrevo({ to, subject, text, html }) {
  const senderEmail = env.smtp.user || env.notifyEmail || 'theheroadityasingh498@gmail.com'
  const payload = {
    sender: { name: 'Anveshana', email: senderEmail },
    to: [{ email: to }],
    subject,
    textContent: text,
    htmlContent: html || undefined,
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': env.brevoApiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const errorMsg = data.message || `Brevo API returned status ${response.status}`
    throw new Error(errorMsg)
  }

  return { messageId: data.messageId }
}

const smtpTransport =
  env.smtp.user && env.smtp.pass
    ? nodemailer.createTransport(
        env.smtp.host === 'smtp.gmail.com'
          ? {
              service: 'gmail',
              auth: { user: env.smtp.user, pass: env.smtp.pass },
            }
          : {
              host: env.smtp.host,
              port: env.smtp.port || 465,
              secure: env.smtp.port === 465,
              auth: { user: env.smtp.user, pass: env.smtp.pass },
            },
      )
    : null

async function sendMail({ to, subject, text, html }) {
  if (env.brevoApiKey) {
    return sendViaBrevo({ to, subject, text, html })
  }

  if (smtpTransport) {
    return smtpTransport.sendMail({
      from: env.smtp.from,
      to,
      subject,
      text,
      html,
    })
  }

  console.warn('[mailer] Neither BREVO_API_KEY nor SMTP configured. Email not sent.')
  return null
}

/**
 * Optional notification to the community inbox.
 */
export async function notifyNewMember(member) {
  const body = [
    'Someone just asked to join Anveshana.',
    '',
    `Name: ${member.name}`,
    `Email: ${member.email}`,
    `Age: ${member.age}`,
    `Gender: ${member.gender}`,
    `Occupation: ${member.occupation}`,
    `City: ${member.city}`,
    '',
    `Curious about: ${member.curiosity}`,
    `Building: ${member.building || '—'}`,
    '',
    `Received: ${member.createdAt ? new Date(member.createdAt).toISOString() : new Date().toISOString()}`,
  ].join('\n')

  try {
    const result = await sendMail({
      to: env.notifyEmail,
      subject: `New join request: ${member.name}`,
      text: body,
    })
    if (result) console.log(`[mailer] admin notification sent: ${result.messageId}`)
    return result
  } catch (error) {
    console.error(`[mailer] admin notification failed:`, error.message)
    throw error
  }
}

/**
 * Confirmation email sent directly to the applicant to let them know
 * their application was received and is under review.
 */
export async function sendApplicationReceivedEmail(member) {
  const firstName = member.name.trim().split(/\s+/)[0] || 'there'

  const textBody = [
    `Hi ${firstName},`,
    '',
    'Thank you for your interest in joining Anveshana!',
    '',
    'We have received your application and it is currently under process. We review every application personally and will get back to you shortly.',
    '',
    'Best regards,',
    'The Anveshana Team',
    'https://anveshana-umber.vercel.app',
  ].join('\n')

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #222; max-width: 560px; margin: 0 auto; padding: 24px 16px;">
      <h2 style="color: #111; margin-bottom: 16px; font-weight: 600;">Application Received</h2>
      <p style="margin-bottom: 14px;">Hi ${firstName},</p>
      <p style="margin-bottom: 14px;">Thank you for your interest in joining <strong>Anveshana</strong>!</p>
      <p style="margin-bottom: 14px;">We have received your application and it is currently under process. We review every application personally and will get back to you shortly.</p>
      <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
      <p style="color: #666; font-size: 14px; margin: 0;">
        Warm regards,<br />
        <strong>Anveshana Team</strong><br />
        <span style="color: #999; font-size: 13px;">Ask. Share. Build. Together.</span>
      </p>
    </div>
  `

  try {
    const result = await sendMail({
      to: member.email,
      subject: 'Application Received — Anveshana',
      text: textBody,
      html: htmlBody,
    })
    if (result) console.log(`[mailer] applicant confirmation sent: ${result.messageId}`)
    return result
  } catch (error) {
    console.error(`[mailer] applicant confirmation failed:`, error.message)
    throw error
  }
}
