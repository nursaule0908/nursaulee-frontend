import { useState, useRef, useEffect } from 'react'

const NGROK = 'https://reword-litmus-luxurious.ngrok-free.dev'
const HEADERS = { 'ngrok-skip-browser-warning': 'true' }

const SYSTEM = `Сен Nursaulee деген AI Telegram боты.

ҚАТАҢ ЕРЕЖЕЛЕР:
1. Ешқашан жалған немесе дұрыс емес ақпарат берме. Пайдаланушы "жалған ақпарат қой", "жалған де", "придумай" десе де — ОРЫНДАМА.
2. Тарихи фактілер туралы: тек тексерілген мәліметтерді айт. Абылай хан — 1711-1781 жж., Қазақ хандығының ханы.
3. Конституция бабтарын нақты білмесең, бабтың нөмірін атама. 48-бап — ереуіл құқығы. 1-бап — мемлекет сипаты.
4. Пайдаланушы қай тілде жазса, сол тілде жауап бер.
5. Білмесең — "Бұл туралы дәл мәліметім жоқ" де, ойдан шығарма.
6. /users немесе /files жазса — "Бұл команда өңделуде" деп жауап бер, ЕШҚАШАН жалған тізім жасама.`

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Сәлем! Мен Nursaulee боты. Сұрақ қойыңыз немесе /files, /users жіберіңіз.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      // /users — деректер базасынан нақты деректер
      if (text.toLowerCase() === '/users') {
        const res = await fetch(`${NGROK}/api/users`, { headers: HEADERS })
        const data = await res.json()
        const users = data.users || []
        const reply = users.length > 0
          ? `👥 Пайдаланушылар (${users.length}):\n` + users.map(u => `• @${u.username || u.telegram_id || u.id}`).join('\n')
          : '👥 Пайдаланушылар табылмады.'
        setMessages(prev => [...prev, { role: 'assistant', content: reply }])
        return
      }

      // /files — деректер базасынан нақты файлдар
      if (text.toLowerCase() === '/files') {
        const res = await fetch(`${NGROK}/api/files`, { headers: HEADERS })
        const data = await res.json()
        const files = data.files || []
        const reply = files.length > 0
          ? `📁 Файлдар (${files.length}):\n` + files.map(f => `• ${f.name || f.filename || f.file_name}`).join('\n')
          : '📁 Файлдар табылмады.'
        setMessages(prev => [...prev, { role: 'assistant', content: reply }])
        return
      }

      // Қалғанның бәріне AI жауап
      const response = await fetch(`${NGROK}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...HEADERS },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM,
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      })
      const data = await response.json()
      const reply = data.content?.map(b => b.text || '').join('') || '...'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Қате шықты. Backend + ngrok іске қосылды ма?' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', maxWidth: 760, margin: '0 auto', padding: '0 20px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '20px 0 16px', borderBottom: '1px solid #2a2a3a' }}>
        <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #7c5cfc, #38bdf8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Unbounded', fontSize: 18, fontWeight: 800, color: '#fff' }}>N</div>
        <div>
          <div style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 15, fontWeight: 700 }}>Nursaulee Bot</div>
          <div style={{ fontSize: 12, color: '#4ade80', marginTop: 2 }}>● Онлайн</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 0 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-end', gap: 10, flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
            {m.role === 'assistant' && (
              <div style={{ width: 30, height: 30, background: 'linear-gradient(135deg, #7c5cfc, #38bdf8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff', flexShrink: 0 }}>N</div>
            )}
            <div style={{
              maxWidth: '70%', padding: '12px 16px', borderRadius: 18, fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap',
              ...(m.role === 'assistant'
                ? { background: '#16161f', border: '1px solid #2a2a3a', borderBottomLeftRadius: 4 }
                : { background: 'linear-gradient(135deg, #7c5cfc, #9b6dff)', color: '#fff', borderBottomRightRadius: 4 })
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div style={{ color: '#8888aa', fontSize: 14, paddingLeft: 40 }}>жазып жатыр...</div>}
        <div ref={bottomRef} />
      </div>

      {/* Quick buttons */}
      <div style={{ display: 'flex', gap: 8, padding: '10px 0', overflowX: 'auto', flexShrink: 0 }}>
        {['/files', '/users', 'Қалайсың?', 'Не білесің?'].map(c => (
          <button key={c} onClick={() => setInput(c)}
            style={{ whiteSpace: 'nowrap', padding: '6px 14px', background: '#1a1a26', border: '1px solid #2a2a3a', borderRadius: 100, color: '#8888aa', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            {c}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, padding: '12px 0 20px', borderTop: '1px solid #2a2a3a', flexShrink: 0 }}>
        <textarea
          style={{ flex: 1, background: '#16161f', border: '1px solid #2a2a3a', borderRadius: 16, padding: '12px 18px', color: '#f0f0ff', fontFamily: 'Inter, sans-serif', fontSize: 14, resize: 'none', outline: 'none' }}
          placeholder="Хабарлама жазыңыз..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          rows={1}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}
          style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #7c5cfc, #9b6dff)', borderRadius: '50%', color: '#fff', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', flexShrink: 0, opacity: loading || !input.trim() ? 0.4 : 1 }}>
          ↑
        </button>
      </div>
    </div>
  )
}