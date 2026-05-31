import { useState, useEffect } from 'react'

const typeColors = { pdf: '#ef4444', xlsx: '#22c55e', txt: '#94a3b8', png: '#38bdf8', zip: '#fbbf24', json: '#a78bfa', docx: '#3b82f6' }
const typeIcons = { pdf: '📄', xlsx: '📊', txt: '📝', png: '🖼️', zip: '🗜️', json: '⚙️', docx: '📃' }

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024*1024) return (bytes/1024).toFixed(1) + ' KB'
  return (bytes/(1024*1024)).toFixed(1) + ' MB'
}

export default function FilesPage() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://reword-litmus-luxurious.ngrok-free.dev/api/files')
      .then(r => r.json())
      .then(data => { setFiles(data.files || []); setLoading(false) })
      .catch(e => { setError('Backend қосылмады'); setLoading(false) })
  }, [])

  const filtered = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

  const getExt = name => name.split('.').pop().toLowerCase()

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 32px 60px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 28, fontWeight: 700, marginBottom: 6 }}>◈ Файлдар</h2>
          <p style={{ fontSize: 14, color: '#aa88aa' }}>Серверде сақталған файлдар тізімі</p>
        </div>
        <div style={{ padding: '6px 16px', background: 'rgba(224,64,160,0.1)', border: '1px solid rgba(224,64,160,0.3)', borderRadius: 100, color: '#f472c8', fontSize: 13, fontWeight: 600 }}>
          {files.length} файл
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#180f1e', border: '1px solid #3a2040', borderRadius: 10, padding: '12px 16px', marginBottom: 24 }}>
        <span style={{ fontSize: 18, color: '#aa88aa' }}>⌕</span>
        <input type="text" placeholder="Файл іздеу..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, background: 'transparent', color: '#fff0f8', fontFamily: 'Inter, sans-serif', fontSize: 14, border: 'none', outline: 'none' }} />
      </div>

      {loading && <div style={{ textAlign: 'center', color: '#aa88aa', padding: 60 }}>Жүктелуде...</div>}
      {error && <div style={{ padding: 16, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, color: '#ef4444', marginBottom: 20 }}>⚠️ {error}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(f => {
          const ext = getExt(f.name)
          const color = typeColors[ext] || '#aa88aa'
          const icon = typeIcons[ext] || '📁'
          return (
            <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#180f1e', border: '1px solid #3a2040', borderRadius: 10, padding: '16px 20px', transition: 'transform 0.15s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>
              <span style={{ fontSize: 28 }}>{icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: '#fff0f8' }}>{f.name}</div>
                <div style={{ fontSize: 12, color: '#aa88aa', marginTop: 3 }}>{formatSize(f.size)} · {f.date}</div>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 6, background: `${color}20`, color }}>{ext.toUpperCase()}</span>
            </div>
          )
        })}
        {!loading && filtered.length === 0 && <div style={{ textAlign: 'center', color: '#aa88aa', padding: 60 }}>Файл табылмады</div>}
      </div>
    </div>
  )
}