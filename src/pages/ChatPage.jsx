import { useState, useRef, useEffect } from 'react'

const NGROK = 'https://reword-litmus-luxurious.ngrok-free.dev'
const HEADERS = { 'ngrok-skip-browser-warning': 'true' }

const SYSTEM = `Сен Nursaulee деген AI Telegram боты.

ҚАТАҢ ЕРЕЖЕЛЕР:
1. Ешқашан жалған немесе дұрыс емес ақпарат берме.
2. Тарихи фактілер туралы: тек тексерілген мәліметтерді айт.
3. Пайдаланушы қай тілде жазса, сол тілде жауап бер.
4. Білмесең — "Бұл туралы дәл мәліметім жоқ" де, ойдан шығарма.
5. Кесте сұрасаң — міндетті түрде markdown кесте жаса.
6. /users немесе /files жазса — "Бұл команда өңделуде" деп жауап бер.`

const renderContent = (content) => {
  const lines = content.split('\n')
  const hasTable = lines.some(l => l.includes('|') && l.trim().startsWith('|'))

  if (!hasTable) {
    return <span style={{ whiteSpace: 'pre-wrap' }}>{content}</span>
  }

  const result = []
  let tableRows = []
  let inTable = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const isTableRow = line.trim().startsWith('|') && line.includes('|')
    const isSeparator = /^\|[-\s|:]+\|$/.test(line.trim())

    if (isTableRow && !isSeparator) {
      inTable = true
      tableRows.push(line)
    } else if (isSeparator) {
      // skip separator
    } else {
      if (inTable && tableRows.length > 0) {
        result.push(
          <div key={i} style={{ overflowX: 'auto', marginTop: 8, marginBottom: 8 }}>
            <table style={{ borderCollapse: 'collapse', fontSize: 12, minWidth: '100%' }}>
              <tbody>
                {tableRows.map((row, ri) => (
                  <tr key={ri} style={{ background: ri === 0 ? '#2a2a3a' : ri % 2 === 0 ? '#1a1a26' : 'transparent' }}>
                    {row.split('|').filter((_, ci) => ci > 0 && ci < row.split('|').length - 1).map((cell, ci) => (
                      <td key={ci} style={{ border: '1px solid #3a3a4a', padding: '6px 10px', whiteSpace: 'nowrap', fontWeight: ri === 0 ? 700 : 400 }}>
                        {cell.trim()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
        tableRows = []
        inTable = false
      }
      if (line.trim()) {
        result.push(<div key={`t-${i}`} style={{ whiteSpace: 'pre-wrap', marginBottom: 4 }}>{line}</div>)
      }
    }
  }

  if (tableRows.length > 0) {
    result.push(
      <div key="last-table" style={{ overflowX: 'auto', marginTop: 8 }}>
        <table style={{ borderCollapse: 'collapse', fontSize: 12, minWidth: '100%' }}>
          <tbody>
            {tableRows.map((row, ri) => (
              <tr key={ri} style={{ background: ri === 0 ? '#2a2a3a' : ri % 2 === 0 ? '#1a1a26' : 'transparent' }}>
                {row.split('|').filter((_, ci) => ci > 0 && ci < row.split('|').length - 1).map((cell, ci) => (
                  <td key={ci} style={{ border: '1px solid #3a3a4a', padding: '6px 10px', whiteSpace: 'nowrap', fontWeight: ri === 0 ? 700 : 400 }}>
                    {cell.trim()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return <div>{result}</div>
}

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

      const response = await fetch(`${NGROK}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...HEADERS },
        body: JSON.stringify({
          system: SYSTEM,
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      })

      const data = await response.json()
      const reply = (data.content || [])
        .filter(b => b.type === 'text')
        .map(b => b.text)
        .join('') || '...'

      setMessages(prev => [...prev, { role: 'assistant', content: reply }])

    } catch (err) {
      console.error(err)
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Қате шықты. Backend + ngrok іске қосылды ма?' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', maxWidth: 760, margin: '0 auto', padding: '0 20px' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '20px 0 16px', borderBottom: '1px solid #2a2a3a' }}>
        <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #7c5cfc, #38bdf8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Unbounded', fontSize: 18, fontWeight: 800, color: '#fff' }}>N</div>
        <div>
          <div style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 15, fontWeight: 700 }}>Nursaulee Bot</div>
          <div style={{ fontSize: 12, color: '#4ade80', marginTop: 2 }}>● Онлайн</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 0 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-end', gap: 10, flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
            {m.role === 'assistant' && (
              <div style={{ width: 30, height: 30, background: 'linear-gradient(135deg, #7c5cfc, #38bdf8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff', flexShrink: 0 }}>N</div>
            )}
            <div style={{
              maxWidth: '70%', padding: '12px 16px', borderRadius: 18, fontSize: 14, lineHeight: 1.6,
              ...(m.role === 'assistant'
                ? { background: '#16161f', border: '1px solid #2a2a3a', borderBottomLeftRadius: 4 }
                : { background: 'linear-gradient(135deg, #7c5cfc, #9b6dff)', color: '#fff', borderBottomRightRadius: 4, whiteSpace: 'pre-wrap' })
            }}>
              {m.role === 'assistant' ? renderContent(m.content) : m.content}
            </div>
          </div>
        ))}
        {loading && <div style={{ color: '#8888aa', fontSize: 14, paddingLeft: 40 }}>жазып жатыр...</div>}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '10px 0', overflowX: 'auto', flexShrink: 0 }}>
        {['/files', '/users', 'Қалайсың?', 'Не білесің?'].map(c => (
          <button key={c} onClick={() => setInput(c)}
            style={{ whiteSpace: 'nowrap', padding: '6px 14px', background: '#1a1a26', border: '1px solid #2a2a3a', borderRadius: 100, color: '#8888aa', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            {c}
          </button>
        ))}
      </div>

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