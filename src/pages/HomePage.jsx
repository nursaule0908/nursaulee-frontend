export default function HomePage({ onNav }) {
  const features = [
    { icon: '✦', title: 'AI Көмекші', desc: 'Groq + LLaMA негізінде. Кез-келген сұраққа жылдам жауап береді.', color: '#7c5cfc' },
    { icon: '◈', title: 'Файл жүйесі', desc: '/files командасымен файлдар тізімін көре аласыз.', color: '#38bdf8' },
    { icon: '◉', title: 'Пайдаланушылар', desc: '/users арқылы дерекқордан мәлімет алыңыз.', color: '#4ade80' },
    { icon: '◎', title: 'Жылдам жауап', desc: 'Webhook арқылы секундтан аз уақытта өңдейді.', color: '#f472b6' },
  ]

  const commands = [
    { cmd: '/start', desc: 'Ботты іске қосу' },
    { cmd: '/files', desc: 'Файлдар тізімін қарау' },
    { cmd: '/users', desc: 'Дерекқордан мәлімет алу' },
    { cmd: 'Кез-келген мәтін', desc: 'AI-мен сөйлесу' },
  ]

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <div style={{ position: 'fixed', width: 600, height: 600, background: 'radial-gradient(circle, #7c5cfc, #38bdf8)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.12, top: -200, left: -200, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', width: 500, height: 500, background: 'radial-gradient(circle, #f472b6, #7c5cfc)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.1, bottom: 0, right: -150, pointerEvents: 'none', zIndex: 0 }} />

      <section style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '80px 32px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(124,92,252,0.15)', border: '1px solid rgba(124,92,252,0.4)', borderRadius: 100, color: '#a78bfa', fontSize: 13, marginBottom: 28 }}>
          🤖 Telegram AI Bot
        </div>
        <h1 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
          Nursaulee<br />
          <span style={{ background: 'linear-gradient(135deg, #7c5cfc, #38bdf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Bot</span>
        </h1>
        <p style={{ fontSize: 18, color: '#8888aa', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>
          Қазақша сөйлейтін AI көмекшіңіз. Сұрақ қойыңыз, файл алыңыз, деректерді зерттеңіз.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => onNav('chat')} style={{ padding: '14px 32px', background: 'linear-gradient(135deg, #7c5cfc, #9b6dff)', borderRadius: 100, color: '#fff', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 0 40px rgba(124,92,252,0.3)' }}>
            ✦ Чатты бастау
          </button>
          <a href="https://t.me/nursauleeebot" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 32px', background: '#16161f', border: '1px solid #2a2a3a', borderRadius: 100, color: '#f0f0ff', fontSize: 15, fontWeight: 600 }}>
            Telegram-да ашу ↗
          </a>
        </div>
      </section>

      <section style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '0 32px 80px' }}>
        <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Мүмкіндіктер</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {features.map(f => (
            <div key={f.title} style={{ background: '#16161f', border: '1px solid #2a2a3a', borderRadius: 16, padding: '28px 24px', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <span style={{ display: 'block', fontSize: 28, marginBottom: 16, color: f.color }}>{f.icon}</span>
              <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#8888aa', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '0 32px 80px' }}>
        <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Командалар</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {commands.map(c => (
            <div key={c.cmd} style={{ display: 'flex', alignItems: 'center', gap: 20, background: '#16161f', border: '1px solid #2a2a3a', borderRadius: 10, padding: '16px 20px' }}>
              <code style={{ fontFamily: 'monospace', fontSize: 14, color: '#a78bfa', background: 'rgba(124,92,252,0.1)', padding: '4px 12px', borderRadius: 6, whiteSpace: 'nowrap', minWidth: 180 }}>{c.cmd}</code>
              <span style={{ fontSize: 14, color: '#8888aa' }}>{c.desc}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}