'use client'

import { useActionState } from 'react'
import { joinWaitlist } from '@/app/actions/waitlist'

const initialState = null

export default function WaitlistForm() {
  const [state, formAction, isPending] = useActionState(joinWaitlist, initialState)

  if (state?.success) {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/40 p-8 text-center">
        <p className="text-5xl font-black text-emerald-400 mb-2">
          #{state.position}
        </p>
        <p className="font-semibold text-white mb-1">
          {state.alreadySignedUp
            ? "You're already on the list!"
            : "You're on the list."}
        </p>
        <p className="text-slate-400 text-sm">
          Check your email for confirmation. Early access goes out in order.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-3 w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3
                     text-sm text-white placeholder:text-slate-600
                     focus:border-blue-500 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold
                     text-white transition-colors hover:bg-blue-500
                     disabled:opacity-50 whitespace-nowrap"
        >
          {isPending ? 'Joining...' : 'Get Early Access'}
        </button>
      </div>

      {state?.success === false && (
        <p className="text-center text-sm text-red-400">{state.error}</p>
      )}
    </form>
  )
}
