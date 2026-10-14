import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Boxes, Check, ChefHat, ClipboardList, GraduationCap, Instagram, Mail, Menu, Moon, MoveUpRight, Sparkles, Store, Sun, Workflow, X } from 'lucide-react'
import { copy, type Language } from '@/data/copy'
import { Concierge } from '@/components/Concierge'

export const Route = createFileRoute('/')({ component: Home })

const whatsapp = 'https://wa.me/5513982092071'
const instagram = 'https://www.instagram.com/ferreira_atemporal'
const serviceIcons = [Store, Boxes, Workflow, GraduationCap]

export function Brand({ light = false }: { light?: boolean }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="#top" aria-label="Ferreira Atemporal">
    <span className="brand-symbol" aria-hidden="true"><ChefHat strokeWidth={1.25} /><span>f.</span></span>
    <span className="brand-words">ferreira<span>ATEMPORAL</span></span>
  </a>
}

function detectSystemLanguage(): Language {
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const tag of preferred) {
    const base = tag.toLowerCase().split('-')[0]
    if (base === 'pt') return 'pt'
    if (base === 'en') return 'en'
  }
  return 'pt'
}

function Home() {
  const [systemLanguage, setSystemLanguage] = useState<Language>('pt')
  const [languageOverride, setLanguageOverride] = useState<Language | null>(null)
  const language = languageOverride === null ? systemLanguage : languageOverride
  const setLanguage = setLanguageOverride
  const [menuOpen, setMenuOpen] = useState(false)
  const [systemDarkMode, setSystemDarkMode] = useState(false)
  const [themeOverride, setThemeOverride] = useState<'light' | 'dark' | null>(null)
  const darkMode = themeOverride === null ? systemDarkMode : themeOverride === 'dark'
  const content = copy[language]

  useEffect(() => {
    const syncSystemLanguage = () => setSystemLanguage(detectSystemLanguage())
    syncSystemLanguage()
    window.addEventListener('languagechange', syncSystemLanguage)
    return () => window.removeEventListener('languagechange', syncSystemLanguage)
  }, [])

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
    const syncSystemTheme = () => setSystemDarkMode(systemTheme.matches)
    syncSystemTheme()
    systemTheme.addEventListener('change', syncSystemTheme)
    return () => systemTheme.removeEventListener('change', syncSystemTheme)
  }, [])

  useEffect(() => {
    if (themeOverride === null) {
      delete document.documentElement.dataset.theme
    } else {
      document.documentElement.dataset.theme = themeOverride
    }
    return () => { delete document.documentElement.dataset.theme }
  }, [themeOverride])

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
    document.title = content.pageTitle
  }, [language, content.pageTitle])

  return <div id="top" data-language={language}>
    <a className="skip-link" href="#main">{content.skip}</a>
    <header className="topbar container">
      <Brand />
      <nav className={`navigation ${menuOpen ? 'is-open' : ''}`} aria-label={content.navigation}>
        {content.nav.map((item, index) => <a key={item} href={['#about', '#expertise', '#approach'][index]} onClick={() => setMenuOpen(false)}>{item}</a>)}
      </nav>
      <div className="header-actions">
        <div className="language-switch" aria-label={content.language} role="group">
          <button onClick={() => setLanguage('en')} aria-pressed={language === 'en'} lang="en">EN</button>
          <span aria-hidden="true">/</span>
          <button onClick={() => setLanguage('pt')} aria-pressed={language === 'pt'} lang="pt-BR">PT-BR</button>
        </div>
        <button className="theme-toggle icon-button" type="button" role="switch" aria-checked={darkMode} aria-label={content.darkMode} title={darkMode ? content.switchToLight : content.switchToDark} onClick={() => setThemeOverride(darkMode ? 'light' : 'dark')}>
          {darkMode ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
        </button>
        <a className="header-contact" href={whatsapp} target="_blank" rel="noopener noreferrer">{content.talk}<ArrowUpRight size={15} /></a>
        <button className="mobile-menu icon-button" aria-label={menuOpen ? content.closeMenu : content.openMenu} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main id="main">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="tiny-dot" />{content.eyebrow}</p>
          <h1 id="hero-title">{content.heroFirst}<br /><em>{content.heroSecond}</em></h1>
          <p className="hero-mantra">{content.mantra}</p>
          <p className="hero-description">{content.heroDescription}</p>
          <div className="hero-actions">
            <a className="button button-yellow" href={whatsapp} target="_blank" rel="noopener noreferrer">{content.heroCta}<ArrowUpRight size={20} /></a>
            <a className="text-link" href="#about">{content.meet}<ArrowDown size={16} /></a>
          </div>
          <div className="hero-note"><span className="availability-dot" />{content.availability}</div>
        </div>
        <div className="hero-visual">
          <div className="portrait-backdrop" />
          <div className="portrait-frame">
            <img src="/.netlify/images?url=/img/chef-ferreira.png&w=850&fm=webp&q=85" srcSet="/.netlify/images?url=/img/chef-ferreira.png&w=450&fm=webp&q=85 450w, /.netlify/images?url=/img/chef-ferreira.png&w=850&fm=webp&q=85 850w" sizes="(max-width: 700px) 85vw, 420px" alt={content.portraitAlt} width="632" height="873" fetchPriority="high" />
          </div>
          <div className="chef-stamp" aria-label={content.stamp}>
            <svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="stamp-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs><text><textPath href="#stamp-circle" textLength="273">{content.stamp} • {content.stamp} • </textPath></text></svg>
            <Sparkles size={35} strokeWidth={1.2} />
          </div>
          <div className="portrait-caption"><span>{content.signature}</span><svg width="62" height="39" viewBox="0 0 62 39" aria-hidden="true"><path d="M3 6c25-10 38 0 36 19M28 19l11 12 10-14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
          <span className="photo-label">FERREIRA, {content.chefLabel}</span>
        </div>
        <div className="hero-bottom"><p>{content.heroBottom}</p><a href="#expertise" aria-label={content.expertiseTitle}><ArrowDown size={18} /></a></div>
      </section>

      <div className="ticker" aria-hidden="true"><div>{[...content.ticker, ...content.ticker].map((item, index) => <span key={`${item}-${index}`}>{item}<span className="ticker-star">✳</span></span>)}</div></div>

      <section id="expertise" className="expertise container section-padding">
        <div className="section-heading"><p className="eyebrow">01 / {content.expertiseLabel}</p><div><h2>{content.expertiseTitle}<br /><em>{content.expertiseItalic}</em></h2><p className="section-intro">{content.expertiseIntro}</p></div></div>
        <div className="service-grid">
          <article className="service service-featured">
            <div className="service-featured-head">
              <div className="service-top"><ClipboardList size={34} strokeWidth={1.3} /><span className="service-badge">{content.starter.badge}</span></div>
              <h3>{content.starter.title}</h3>
              <a className="button button-yellow" href={whatsapp} target="_blank" rel="noopener noreferrer">{content.starter.link}<ArrowUpRight size={18} /></a>
            </div>
            <div className="service-featured-body">
              <p>{content.starter.description}</p>
              <ul className="service-deliverables">{content.starter.deliverables.map(item => <li key={item}><Check size={16} strokeWidth={2} aria-hidden="true" />{item}</li>)}</ul>
            </div>
          </article>
          {content.services.map((service, index) => {
            const ServiceIcon = serviceIcons[index]
            return <article className="service" key={service.title}><div className="service-top"><ServiceIcon size={31} strokeWidth={1.3} /><span>0{index + 2}</span></div><h3>{service.title}</h3><p>{service.description}</p><a href={whatsapp} target="_blank" rel="noopener noreferrer">{service.link}<ArrowUpRight size={18} /></a></article>
          })}
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="about-inner container">
          <div className="about-photos"><img className="about-main-photo" src="/.netlify/images?url=/img/chef-in-action.png&w=700&fm=webp" alt={content.actionAlt} width="629" height="874" loading="lazy" /><div className="about-photo-note"><Sparkles size={22} /><span>{content.aboutPhotoNote}</span></div></div>
          <div className="about-copy"><p className="eyebrow">02 / {content.aboutLabel}</p><h2>{content.aboutTitle}<br /><em>{content.aboutItalic}</em></h2><p className="about-lead">{content.aboutLead}</p><p>{content.aboutBody}</p><blockquote>“{content.quote}”</blockquote><span className="signature">Ferreira Atemporal</span><a className="text-link light-link" href={instagram} target="_blank" rel="noopener noreferrer">{content.follow}<Instagram size={17} /></a></div>
        </div>
      </section>

      <section id="approach" className="approach container section-padding">
        <div className="section-heading"><p className="eyebrow">03 / {content.approachLabel}</p><div><h2>{content.approachTitle}<br /><em>{content.approachItalic}</em></h2><p className="section-intro">{content.approachIntro}</p></div></div>
        <div className="steps">{content.steps.map((step, index) => <article key={step.title}><div className="step-number">0{index + 1}<ArrowRight size={24} /></div><h3>{step.title}</h3><p>{step.description}</p></article>)}</div>
        <div className="kitchen-journal"><div className="journal-heading"><span className="eyebrow">{content.journalLabel}</span><span className="handwritten">{content.journalNote}</span></div><div className="journal-grid"><figure><img src="/.netlify/images?url=/img/kitchen-team.png&w=700&fm=webp" alt={content.teamAlt} width="591" height="845" loading="lazy" /><figcaption>{content.journalCaptions[0]}<span>01</span></figcaption></figure><figure><img src="/.netlify/images?url=/img/kitchen-collaboration.png&w=700&fm=webp" alt={content.collaborationAlt} width="595" height="854" loading="lazy" /><figcaption>{content.journalCaptions[1]}<span>02</span></figcaption></figure><div className="journal-message"><Sparkles size={40} strokeWidth={1} /><p>{content.journalMessage}</p><span>— Ferreira</span></div></div></div>
      </section>

      <section className="faq container"><div><p className="eyebrow">{content.faqLabel}</p><h2>{content.faqTitle}</h2></div><div className="faq-list">{content.faq.map(item => <details key={item.question}><summary>{item.question}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>

      <section id="contact" className="contact-section"><div className="container contact-inner"><div><p className="eyebrow">{content.contactLabel}</p><h2>{content.contactTitle}<br /><em>{content.contactItalic}</em></h2><p>{content.contactBody}</p><div className="contact-actions"><a className="button button-brown" href={whatsapp} target="_blank" rel="noopener noreferrer">{content.contactCta}<ArrowUpRight size={21} /></a><a className="button button-brown" href="mailto:viniciuskaidos3@gmail.com">{content.contactEmail}<Mail size={21} aria-hidden="true" /></a></div></div><a className="contact-arrow" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label={content.contactCta}><MoveUpRight strokeWidth={0.7} /></a><div className="contact-links"><a href={instagram} target="_blank" rel="noopener noreferrer"><Instagram size={18} />@ferreira_atemporal<ArrowUpRight size={16} /></a><a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp<span>+55 (13) 98209-2071</span><ArrowUpRight size={16} /></a></div></div></section>
    </main>

    <footer className="footer"><div className="container footer-inner"><Brand light /><p className="footer-details"><span>{content.footerNote}</span><span>{content.footerLocation}</span><span>{content.footerCnpj}</span></p><span>© {new Date().getFullYear()} Ferreira Atemporal</span><a href="#top">{content.backToTop}<ArrowUpRight size={15} /></a></div></footer>
    <Concierge language={language} />
  </div>
}
