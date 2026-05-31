import { useState } from 'react'
import HomePage from './pages/HomePage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import FilesPage from './pages/FilesPage.jsx'
import UsersPage from './pages/UsersPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import './App.css'

const tabs = [
  { id: 'home',  label: 'Басты',          icon: '⌂' },
  { id: 'chat',  label: 'Чат',            icon: '✦' },
  { id: 'files', label: 'Файлдар',        icon: '◈' },
  { id: 'users', label: 'Пайдаланушылар', icon: '◉' },
  { id: 'about', label: 'Туралы',         icon: '◎' },
]

export default function App() {
  const [active, setActive] = useState('home')

  const renderPage = () => {
    switch (active) {
      case 'home':  return <HomePage  onNav={setActive} />
      case 'chat':  return <ChatPage  />
      case 'files': return <FilesPage />
      case 'users': return <UsersPage />
      case 'about': return <AboutPage />
      default:      return <HomePage  onNav={setActive} />
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-logo">
          <span className="logo-mark">N</span>
          <span className="logo-text">ursaulee</span>
        </div>
        <nav className="topbar-nav">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`nav-btn ${active === t.id ? 'active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              <span className="nav-icon">{t.icon}</span>
              <span className="nav-label">{t.label}</span>
            </button>
          ))}
        </nav>
        <a href="https://t.me/nursaulee_bot" target="_blank" rel="noreferrer" className="tg-btn">
          Telegram ↗
        </a>
      </header>
      <main className="page-wrap">{renderPage()}</main>
      <nav className="bottom-nav">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`bottom-btn ${active === t.id ? 'active' : ''}`}
            onClick={() => setActive(t.id)}
          >
            <span className="bottom-icon">{t.icon}</span>
            <span className="bottom-label">{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}