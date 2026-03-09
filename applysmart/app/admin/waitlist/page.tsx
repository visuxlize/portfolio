import { createAdminClient } from '@/lib/supabase/admin'

// Simple protection — replace with your actual auth check from the starter kit
async function checkIsAdmin() {
  // TODO: replace with real session check once auth is wired up
  // For now this page is only accessible if you know the URL
  return true
}

export default async function WaitlistAdminPage() {
  await checkIsAdmin()

  const supabase = createAdminClient()
  const { data: signups, error } = await supabase
    .from('waitlist')
    .select('*')
    .order('position', { ascending: true })

  if (error) {
    return <div className="p-8 text-red-500">Error loading waitlist: {error.message}</div>
  }

  const total     = signups?.length ?? 0
  const confirmed = signups?.filter(s => s.confirmed).length ?? 0
  const invited   = signups?.filter(s => s.invited).length ?? 0

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-slate-900">Waitlist</h1>
          <p className="text-slate-500 text-sm mt-1">{total} total signups</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            ['Total Signups', total, 'bg-blue-50 text-blue-700'],
            ['Confirmed', confirmed, 'bg-green-50 text-green-700'],
            ['Invited', invited, 'bg-purple-50 text-purple-700'],
          ].map(([label, count, cls]) => (
            <div key={String(label)} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <p className={`text-3xl font-black ${(cls as string).split(' ')[1]}`}>{count}</p>
              <p className="text-sm text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['#', 'Email', 'Name', 'Role', 'Signed Up', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {signups?.map((s, i) => (
                <tr key={s.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  <td className="px-4 py-3 font-mono text-slate-400 text-xs">{s.position}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{s.email}</td>
                  <td className="px-4 py-3 text-slate-500">{s.name || '—'}</td>
                  <td className="px-4 py-3 text-slate-500">{s.role || '—'}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">
                    {new Date(s.created_at).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      s.invited   ? 'bg-green-100 text-green-800' :
                      s.confirmed ? 'bg-blue-100 text-blue-800'  :
                                    'bg-slate-100 text-slate-600'
                    }`}>
                      {s.invited ? 'Invited' : s.confirmed ? 'Confirmed' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {total === 0 && (
            <div className="text-center py-16 text-slate-400">
              No signups yet. Share the waitlist page to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
