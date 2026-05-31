import { useState, useEffect } from 'react'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
   fetch('https://reword-litmus-luxurious.ngrok-free.dev/api/users', {
     headers: { 'ngrok-skip-browser-warning': 'true' }
   })
      .then(r => r.json())
      .then(data => { setUsers(data.users || []); setLoading(false) })
      .catch(() => { setError('Backend қосылмады'); setLoading(false) })
  }, [])

  const filtered = users.filter(u =>
    (u.username || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.text || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 32px 60px' }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 28, fontWeight: 700, marginBottom: 6 }}>◉ Пайдаланушылар</h2>
        <p style={{ fontSize: 14, color: '#aa88aa' }}>PostgreSQL дерекқорынан алынған соңғы хабарламалар</p>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { label: 'Барлығы', value: users.length, color: '#fff0f8' },
          { label: 'Белсенді', value: users.length, color: '#f472c8' },
          { label: 'Хабарламалар', value: users.reduce((s) => s + 1, 0), color: '#c084fc' },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, minWidth: 140, background: '#180f1e', border: '1px solid #3a2040', borderRadius: 16, padding: '20px 24px' }}>
            <div style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 32, fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#aa88aa' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {error && <div style={{ padding: 16, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, color: '#ef4444', marginBottom: 20 }}>⚠️ {error}</div>}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#180f1e', border: '1px solid #3a2040', borderRadius: 10, padding: '12px 16px', marginBottom: 20 }}>
        <span style={{ fontSize: 18, color: '#aa88aa' }}>⌕</span>
        <input type="text" placeholder="Пайдаланушы іздеу..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, background: 'transparent', color: '#fff0f8', fontFamily: 'Inter, sans-serif', fontSize: 14, border: 'none', outline: 'none' }} />
      </div>

      <div style={{ background: '#180f1e', border: '1px solid #3a2040', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr', gap: 16, padding: '14px 20px', background: '#1e1525', borderBottom: '1px solid #3a2040', fontSize: 12, fontWeight: 600, color: '#aa88aa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          <span>Пайдаланушы</span><span>Соңғы хабарлама</span><span>Күні</span>
        </div>

        {loading && <div style={{ padding: 48, textAlign: 'center', color: '#aa88aa' }}>Жүктелуде...</div>}

        {filtered.map((u, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr', gap: 16, padding: '16px 20px', alignItems: 'center', borderBottom: '1px solid #3a2040', transition: 'background 0.15s', cursor: 'default' }}
            onMouseEnter={e => e.currentTarget.style.background = '#1e1525'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #e040a0, #c084fc)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Unbounded', fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
                {(u.username || '?')[0].toUpperCase()}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#fff0f8' }}>@{u.username}</div>
            </div>
            <div style={{ fontSize: 13, color: '#aa88aa', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.text || '—'}</div>
            <div style={{ fontSize: 12, color: '#aa88aa' }}>{u.date ? u.date.slice(0, 10) : '—'}</div>
          </div>
        ))}

        {!loading && filtered.length === 0 && <div style={{ padding: 48, textAlign: 'center', color: '#aa88aa' }}>Табылмады</div>}
      </div>
    </div>
  )
}