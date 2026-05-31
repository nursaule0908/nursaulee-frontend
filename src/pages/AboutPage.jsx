const stack = [
  { name: 'Python 3.12',    desc: 'Негізгі тіл',           color: '#3776ab' },
  { name: 'aiogram 3',      desc: 'Telegram Bot Framework', color: '#2ca5e0' },
  { name: 'Groq / LLaMA',   desc: 'AI жауаптар',           color: '#f97316' },
  { name: 'GitHub Actions', desc: 'CI/CD Pipeline',         color: '#6e5494' },
  { name: 'React + Vite',   desc: 'Фронтенд сайт',         color: '#61dafb' },
  { name: 'Vercel',         desc: 'Деплой платформасы',     color: '#ffffff' },
]

const timeline = [
  { step: '01', title: 'Бот құрылды',      desc: 'aiogram + Python негізінде Telegram боты жасалды' },
  { step: '02', title: 'AI қосылды',        desc: 'Groq API арқылы LLaMA моделі интеграцияланды' },
  { step: '03', title: 'CI/CD орнатылды',   desc: 'GitHub Actions арқылы автоматты тестілеу мен деплой' },
  { step: '04', title: 'Веб сайт жасалды', desc: 'React + Vite + Vercel — бот мүмкіндіктері онлайнда' },
]

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 32px 80px' }}>

      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg, #7c5cfc, #38bdf8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Unbounded', fontSize: 36, fontWeight: 800, color: '#fff', margin: '0 auto 24px', boxShadow: '0 0 60px rgba(124,92,252,0.4)' }}>N</div>
        <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 36, fontWeight: 800, marginBottom: 16 }}>Nursaulee Bot</h2>
        <p style={{ fontSize: 16, color: '#8888aa', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 28px' }}>
          Қазақша сөйлейтін AI көмекшіңіз. Python, aiogram және Groq технологияларымен жасалған.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
          <a href="https://t.me/nursaulee_bot" target="_blank" rel="noreferrer"
            style={{ padding: '10px 24px', borderRadius: 100, background: 'linear-gradient(135deg, #229ed9, #0088cc)', color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            🤖 Telegram
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer"
            style={{ padding: '10px 24px', borderRadius: 100, background: '#16161f', border: '1px solid #2a2a3a', color: '#f0f0ff', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            ⌥ GitHub
          </a>
        </div>
      </div>

      <div style={{ marginBottom: 56 }}>
        <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Технологиялар</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
          {stack.map(s => (
            <div key={s.name} style={{ background: '#16161f', border: '1px solid #2a2a3a', borderRadius: 10, padding: 20, transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: 10, height: 10, background: s.color, borderRadius: '50%', marginBottom: 12, boxShadow: `0 0 10px ${s.color}` }} />
              <div style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: '#8888aa' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 56 }}>
        <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Жобаның даму кезеңдері</h3>
        {timeline.map((t, i) => (
          <div key={t.step} style={{ display: 'flex', gap: 20, marginBottom: i < timeline.length - 1 ? 0 : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: 40, height: 40, background: 'rgba(124,92,252,0.15)', border: '2px solid #7c5cfc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Unbounded', fontSize: 12, fontWeight: 800, color: '#a78bfa' }}>{t.step}</div>
              {i < timeline.length - 1 && <div style={{ flex: 1, width: 2, background: '#2a2a3a', margin: '6px 0', minHeight: 30 }} />}
            </div>
            <div style={{ paddingBottom: 32 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{t.title}</div>
              <div style={{ fontSize: 14, color: '#8888aa', lineHeight: 1.6 }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: 'linear-gradient(135deg, rgba(124,92,252,0.1), rgba(56,189,248,0.1))', border: '1px solid rgba(124,92,252,0.3)', borderRadius: 16, padding: 48, textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontSize: 24, fontWeight: 700, marginBottom: 10 }}>Ботты қолданып көріңіз!</h3>
        <p style={{ fontSize: 15, color: '#8888aa', marginBottom: 28 }}>Telegram-да /start командасын жіберіңіз</p>
        <a href="https://t.me/nursaulee_bot" target="_blank" rel="noreferrer"
          style={{ display: 'inline-block', padding: '14px 32px', background: 'linear-gradient(135deg, #229ed9, #0088cc)', borderRadius: 100, color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
          Telegram-да ашу ↗
        </a>
      </div>
    </div>
  )
}