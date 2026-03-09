'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type WaitlistResult =
  | { success: true; position: number; alreadySignedUp: boolean }
  | { success: false; error: string }

export async function joinWaitlist(
  prevState: unknown,
  formData: FormData
): Promise<WaitlistResult> {
  const email = formData.get('email')?.toString().trim().toLowerCase()
  const name  = formData.get('name')?.toString().trim() || null
  const role  = formData.get('role')?.toString() || null

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from('waitlist')
    .select('position')
    .eq('email', email)
    .single()

  if (existing) {
    return { success: true, position: existing.position, alreadySignedUp: true }
  }

  const { data, error } = await supabase
    .from('waitlist')
    .insert({ email, name, role })
    .select('position')
    .single()

  if (error || !data) {
    console.error('Waitlist insert error:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  try {
    await resend.emails.send({
      from:    'ApplySmart <onboarding@resend.dev>',
      to:      email,
      subject: `You're #${data.position} on the ApplySmart waitlist`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;padding:40px 24px;background:#0F1F3D;color:#fff;border-radius:12px;">
          <h1 style="font-size:26px;font-weight:800;margin:0 0 8px;">You're on the list.</h1>
          <p style="font-size:52px;font-weight:900;color:#2D7DD2;margin:16px 0;line-height:1;">#${data.position}</p>
          <p style="color:#94a3b8;font-size:15px;line-height:1.7;margin:0 0 24px;">
            Hey${name ? ` ${name}` : ''}, you're <strong style="color:#fff;">#${data.position}</strong> on the ApplySmart waitlist.
            I'm building this live and you'll get early access before anyone else.
          </p>
          <div style="background:#1a2f52;border-radius:8px;padding:20px;margin:0 0 24px;">
            <p style="margin:0 0 10px;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;font-weight:700;">What ApplySmart does</p>
            <ul style="margin:0;padding-left:20px;color:#94a3b8;font-size:14px;line-height:2.2;">
              <li>Fetches job listings scored against your resume</li>
              <li>Generates tailored cover letters in under 5 seconds</li>
              <li>Tracks every application in one dashboard</li>
            </ul>
          </div>
          <p style="font-size:13px;color:#334155;margin:0;border-top:1px solid #1e3a5f;padding-top:16px;">
            You signed up at applysmart.io — reply to this email anytime.
          </p>
        </div>
      `,
    })
  } catch (emailErr) {
    console.error('Email send failed (non-blocking):', emailErr)
  }

  return { success: true, position: data.position, alreadySignedUp: false }
}
