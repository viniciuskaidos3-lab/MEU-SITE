import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Instagram, MessageCircle, MessageCircleMore, X } from 'lucide-react'
import { copy, type Language } from '@/data/copy'

export function Concierge({ language }: { language: Language }) {
  const [expanded, setExpanded] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [slowLoading, setSlowLoading] = useState(false)
  const launcher = useRef<HTMLButtonElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const text = copy[language].chat

  function closeChat() {
    setChatOpen(false)
    launcher.current?.focus()
  }

  useEffect(() => {
    if (!chatOpen) return
    closeButton.current?.focus()
    const timeout = window.setTimeout(() => setSlowLoading(true), 12000)
    return () => window.clearTimeout(timeout)
  }, [chatOpen])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setChatOpen(false)
        setExpanded(false)
        if (chatOpen || expanded) launcher.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [chatOpen, expanded])

  return <aside className="concierge" aria-label={text.title}>
    {chatOpen && <section id="concierge-chat" className="chat-panel" aria-labelledby="chat-title">
      <div className="chat-header"><span className="chat-avatar"><MessageCircleMore size={23} /></span><div><h2 id="chat-title">{text.title}</h2><p>{text.subtitle}</p></div><button ref={closeButton} className="icon-button" onClick={closeChat} aria-label={text.close}><X size={21} /></button></div>
      <div className="chat-body">{!loaded && <div className="chat-loading" role="status"><span className="loading-dots"><i /><i /><i /></span><p>{slowLoading ? text.error : text.loading}</p>{slowLoading && <a href="https://wa.me/5513982092071" target="_blank" rel="noopener noreferrer">{text.whatsapp}<ArrowUpRight size={16} /></a>}</div>}<iframe src="https://typebot.co/ferreiraco" title={text.title} style={{ opacity: loaded ? 1 : 0, pointerEvents: loaded ? 'auto' : 'none' }} onLoad={() => setLoaded(true)} allow="clipboard-write" /></div>
      <a className="chat-fallback" href="https://typebot.co/ferreiraco" target="_blank" rel="noopener noreferrer">{text.fallback}<ArrowUpRight size={14} /></a>
    </section>}
    {expanded && !chatOpen && <div className="dial-options" id="contact-options"><button onClick={() => { setLoaded(false); setSlowLoading(false); setChatOpen(true); setExpanded(false) }}><span>{text.assistant}</span><span className="dial-icon"><MessageCircleMore size={20} /></span></button><a href="https://wa.me/5513982092071" target="_blank" rel="noopener noreferrer"><span>{text.whatsapp}</span><span className="dial-icon"><MessageCircle size={20} /></span></a><a href="https://www.instagram.com/ferreira_atemporal" target="_blank" rel="noopener noreferrer"><span>{text.instagram}</span><span className="dial-icon"><Instagram size={20} /></span></a></div>}
    <div className="launcher-row">{!expanded && !chatOpen && <div className="chat-hint"><span>{text.label}</span><p>{text.hint}</p></div>}<button ref={launcher} className={`chat-launcher ${expanded || chatOpen ? 'is-active' : ''}`} onClick={() => { if (chatOpen) closeChat(); else setExpanded(!expanded) }} aria-label={chatOpen ? text.close : expanded ? text.closeOptions : text.launcher} aria-expanded={expanded || chatOpen} aria-controls={chatOpen ? 'concierge-chat' : expanded ? 'contact-options' : undefined}>{expanded || chatOpen ? <X size={26} strokeWidth={1.6} /> : <MessageCircleMore size={27} strokeWidth={1.6} />}{!expanded && !chatOpen && <span className="launcher-dot" />}</button></div>
  </aside>
}
