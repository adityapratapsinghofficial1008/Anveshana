import nodemailer from 'nodemailer'
import { env } from '../config/env.js'

const transport =
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

/**
 * Optional notification to the community inbox. When SMTP is not configured
 * this resolves quietly, so signups never depend on email delivery.
 */
export function notifyNewMember(member) {
  if (!transport) return Promise.resolve()

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
    `Received: ${member.createdAt.toISOString()}`,
  ].join('\n')

  return transport
    .sendMail({
      from: env.smtp.from,
      to: env.notifyEmail,
      subject: `New join request: ${member.name}`,
      text: body,
    })
    .catch((error) => console.warn(`[mailer] notification failed: ${error.message}`))
}

/**
 * Confirmation email sent directly to the applicant to let them know
 * their application was received and is under review.
 */
export function sendApplicationReceivedEmail(member) {
  if (!transport) return Promise.resolve()

  const firstName = member.name.trim().split(/\s+/)[0] || 'there'

  const textBody = [
    `Hi ${firstName},`,
    '',
    'Thank you for your interest in joining Anveshana!',
    '',
    'We have received your application and it is currently under process. We review every note personally and will get back to you shortly.',
    '',
    'Best regards,',
    'The Anveshana Team',
    'https://anveshana.tech',
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

  return transport
    .sendMail({
      from: env.smtp.from,
      to: member.email,
      subject: 'Application Received — Anveshana',
      text: textBody,
      html: htmlBody,
    })
    .catch((error) => console.warn(`[mailer] applicant confirmation failed: ${error.message}`))
}
