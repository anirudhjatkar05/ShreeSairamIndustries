import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Unsplash image helper ───────────────────────────────────────────────────
const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

// ─── Scroll reveal hook ──────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCounter(target: number, duration = 2000, trigger: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = 0
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [trigger, target, duration])
  return count
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const IconShield = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const IconDroplet = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
  </svg>
)
const IconRuler = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3h18v4H3z"/><path d="M21 7v14H3V7"/><path d="M7 7v4m4-4v2m4-2v4"/>
  </svg>
)
const IconStar = ({ filled = true }: { filled?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#C8A97E' : 'none'} stroke="#C8A97E" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const IconTruck = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
)
const IconSparkle = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"/>
  </svg>
)
const IconClock = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)
const IconMapPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16z"/>
  </svg>
)
const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
)
const IconWhatsApp = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
)
const IconChevronUp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
)
const IconDownload = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)
const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)
const IconX = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const IconPDF = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
)

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = ['home', 'products', 'gallery', 'catalog', 'about', 'contact']
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s)
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(s); break }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'catalog', label: 'Catalog' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]

  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(250,250,248,0.88)' : 'rgba(250,250,248,0.95)',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.35s ease',
      boxShadow: scrolled ? '0 2px 32px rgba(110,75,42,0.06)' : 'none',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        {/* Logo */}
        <button onClick={() => scroll('home')} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <div style={{ width: 38, height: 38, background: 'var(--primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16 }}>S</span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--text)', lineHeight: 1.2 }}>Shree Sairam</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--muted)', fontWeight: 500, letterSpacing: '0.04em' }}>INDUSTRIES</div>
          </div>
        </button>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: 4, listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }} className="nav-desktop">
          {navLinks.map(l => (
            <li key={l.id}>
              <button onClick={() => scroll(l.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14,
                color: active === l.id ? 'var(--primary)' : 'var(--muted)',
                padding: '8px 14px', borderRadius: 8,
                transition: 'color 0.2s, background 0.2s',
                position: 'relative',
              }}
                onMouseEnter={e => { (e.target as HTMLElement).style.background = 'rgba(110,75,42,0.06)'; (e.target as HTMLElement).style.color = 'var(--primary)' }}
                onMouseLeave={e => { (e.target as HTMLElement).style.background = 'none'; (e.target as HTMLElement).style.color = active === l.id ? 'var(--primary)' : 'var(--muted)' }}
              >{l.label}</button>
            </li>
          ))}
        </ul>

        {/* CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => scroll('contact')} className="btn-ripple" style={{
            background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13,
            padding: '10px 22px', borderRadius: 100,
            transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
            boxShadow: '0 4px 16px rgba(110,75,42,0.25)',
          }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = 'var(--primary-light)'; (e.target as HTMLElement).style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = 'var(--primary)'; (e.target as HTMLElement).style.transform = 'none' }}
          >Get Quote</button>
          <button onClick={() => setMenuOpen(o => !o)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', padding: 4 }} className="nav-hamburger">
            {menuOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'rgba(250,250,248,0.98)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--border)', padding: '16px 24px 24px' }}>
          {navLinks.map(l => (
            <button key={l.id} onClick={() => scroll(l.id)} style={{
              display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 16,
              color: active === l.id ? 'var(--primary)' : 'var(--text)',
              padding: '14px 8px', borderBottom: '1px solid var(--border)',
            }}>{l.label}</button>
          ))}
          <button onClick={() => scroll('contact')} style={{
            marginTop: 16, width: '100%', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15,
            padding: '14px', borderRadius: 12,
          }}>Get Quote</button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) { .nav-desktop { display: none !important; } .nav-hamburger { display: flex !important; } }
      `}</style>
    </nav>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--bg)', paddingTop: 72 }}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src={img('1759262151001-b9cfec26a9d5', 1600, 1000)}
          alt="Premium wooden door in a luxury home"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(26,18,8,0.82) 0%, rgba(26,18,8,0.55) 55%, rgba(26,18,8,0.15) 100%)' }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1440, margin: '0 auto', padding: '80px 40px', width: '100%' }}>
        <div style={{ maxWidth: 620 }}>
          <span style={{
            display: 'inline-block', background: 'rgba(200,169,126,0.2)', border: '1px solid rgba(200,169,126,0.4)',
            color: 'var(--accent)', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13,
            padding: '6px 16px', borderRadius: 100, marginBottom: 28, letterSpacing: '0.06em',
            backdropFilter: 'blur(8px)',
          }}>Trusted Since 2015 · Arag, Sangli</span>

          <h1 style={{
            fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(36px, 5.5vw, 72px)',
            color: 'white', lineHeight: 1.1, margin: '0 0 24px', letterSpacing: '-0.02em',
          }}>
            Crafting Premium Doors<br />
            <span style={{ color: 'var(--accent)' }}>with Timeless Quality</span>
          </h1>

          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 1.8vw, 18px)',
            color: 'rgba(255,255,255,0.78)', lineHeight: 1.75, margin: '0 0 40px', maxWidth: 500, fontWeight: 400,
          }}>
            Shree Sairam Industries manufactures high-quality Lamination, Laminate, PVC, and Sagwan Doors with superior craftsmanship and lasting durability.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={() => scroll('products')} className="btn-ripple" style={{
              background: 'var(--accent)', color: 'var(--dark)', border: 'none', cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15,
              padding: '15px 32px', borderRadius: 100,
              boxShadow: '0 8px 32px rgba(200,169,126,0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(200,169,126,0.5)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(200,169,126,0.4)' }}
            >Explore Products <IconArrowRight /></button>

            <button onClick={() => scroll('contact')} style={{
              background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.3)',
              cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15,
              padding: '15px 32px', borderRadius: 100, backdropFilter: 'blur(8px)',
              transition: 'background 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
            >Contact Us</button>
          </div>
        </div>

        {/* Floating experience cards */}
        <div style={{
          position: 'absolute', bottom: 48, right: 40,
          display: 'flex', flexDirection: 'column', gap: 12,
        }} className="hero-cards">
          {[
            { value: '10+', label: 'Years Experience' },
            { value: '5000+', label: 'Happy Customers' },
            { value: 'Premium', label: 'Manufacturing' },
          ].map(card => (
            <div key={card.label} style={{
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: 14,
              padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 14,
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateX(-4px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'none'}
            >
              <div style={{ width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%', flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, color: 'white', lineHeight: 1 }}>{card.value}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 3 }}>{card.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 1,
        animation: 'bounce 2s infinite',
      }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }} />
      </div>

      <style>{`
        @keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-8px); } }
        @media (max-width: 768px) { .hero-cards { display: none !important; } }
      `}</style>
    </section>
  )
}

// ─── Features / Why Choose Us ────────────────────────────────────────────────
function Features() {
  const features = [
    { icon: <IconSparkle />, title: 'Premium Materials', desc: 'We source the finest raw materials to ensure every door meets the highest standards of quality and longevity.' },
    { icon: <IconDroplet />, title: 'Water Resistant', desc: 'Our doors are engineered with moisture-resistant finishes, making them ideal for humid environments.' },
    { icon: <IconRuler />, title: 'Custom Sizes', desc: 'Every space is unique. We offer tailor-made sizing to perfectly fit your architectural requirements.' },
    { icon: <IconSparkle />, title: 'Modern Designs', desc: 'Contemporary aesthetics that complement any interior style, from minimal to ornate.' },
    { icon: <IconShield />, title: 'Long Life', desc: 'Built with precision engineering and durable materials for decades of reliable performance.' },
    { icon: <IconTruck />, title: 'Fast Delivery', desc: 'Timely dispatch and reliable delivery across Maharashtra, ensuring your project stays on schedule.' },
  ]

  return (
    <section style={{ background: 'var(--bg)', padding: '120px 40px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Why Choose Us</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 44px)', color: 'var(--text)', margin: '12px 0 16px', letterSpacing: '-0.02em' }}>
            Craftsmanship That Speaks
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: 'var(--muted)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Every door we make is a statement of quality, precision, and design.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {features.map((f, i) => (
            <div key={f.title} className={`reveal reveal-delay-${i + 1}`} style={{
              background: 'var(--card)', borderRadius: 'var(--radius)', padding: '36px 32px',
              border: '1px solid var(--border)', transition: 'transform 0.25s, box-shadow 0.25s',
              cursor: 'default',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(110,75,42,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              <div style={{
                width: 56, height: 56, background: 'var(--accent-light)',
                borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--primary)', marginBottom: 24,
              }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 18, color: 'var(--text)', margin: '0 0 10px' }}>{f.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Products ────────────────────────────────────────────────────────────────
function Products() {
  const products = [
    {
      id: '1634822930432-0594057fdff2',
      badge: 'Bestseller',
      category: 'Lamination',
      name: 'Lamination Doors',
      desc: 'Premium quality wooden doors with an elegant, water-resistant lamination finish. Long-lasting and visually rich.',
    },
    {
      id: '1537199322506-85bfd51c0601',
      badge: 'Popular',
      category: 'Laminate',
      name: 'Laminate Doors',
      desc: 'Strong, secure laminate doors with a refined surface that blends style with durability for modern interiors.',
    },
    {
      id: '1603673298820-40d77252226d',
      badge: 'Waterproof',
      category: 'PVC',
      name: 'PVC Doors',
      desc: 'Completely waterproof and low-maintenance PVC doors — ideal for bathrooms, kitchens, and humid spaces.',
    },
    {
      id: '1776482128072-5fd43852163b',
      badge: 'Natural',
      category: 'Sagwan',
      name: 'Sagwan Doors',
      desc: 'Crafted from authentic Sagwan (Teak) timber, these doors offer a rich natural grain and timeless elegance.',
    },
  ]

  return (
    <section id="products" style={{ background: '#F4F0EB', padding: '120px 40px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Our Collection</span>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 44px)', color: 'var(--text)', margin: '12px 0 0', letterSpacing: '-0.02em' }}>
              Premium Door Range
            </h2>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: 'var(--muted)', maxWidth: 360, lineHeight: 1.7, margin: 0 }}>
            Four distinct collections, each engineered for a different lifestyle and architectural context.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 24 }}>
          {products.map((p, i) => (
            <article key={p.name} className={`reveal reveal-delay-${i + 1}`} style={{
              background: 'var(--card)', borderRadius: 'var(--radius)', overflow: 'hidden',
              border: '1px solid var(--border)',
              transition: 'transform 0.28s, box-shadow 0.28s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 64px rgba(110,75,42,0.12)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              <div style={{ position: 'relative', overflow: 'hidden', background: '#D4C5B0', aspectRatio: '4/3' }}>
                <img
                  src={img(p.id, 600, 450)}
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.07)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'none'}
                />
                <span style={{
                  position: 'absolute', top: 16, left: 16,
                  background: 'var(--primary)', color: 'white',
                  fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11,
                  padding: '5px 12px', borderRadius: 100, letterSpacing: '0.05em',
                }}>{p.badge}</span>
                <span style={{
                  position: 'absolute', bottom: 16, right: 16,
                  background: 'rgba(255,255,255,0.9)', color: 'var(--secondary)',
                  fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11,
                  padding: '5px 12px', borderRadius: 100, backdropFilter: 'blur(8px)',
                }}>{p.category}</span>
              </div>
              <div style={{ padding: '28px 28px 32px' }}>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 20, color: 'var(--text)', margin: '0 0 10px' }}>{p.name}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 24px' }}>{p.desc}</p>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'none', border: '1.5px solid var(--primary)', color: 'var(--primary)',
                    fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13,
                    padding: '10px 20px', borderRadius: 100, cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--primary)'; (e.currentTarget as HTMLElement).style.color = 'white' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = 'var(--primary)' }}
                >Learn More <IconArrowRight /></button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
function Gallery() {
  const images = [
    { id: '1780245997131-1af7a8de9538', alt: 'Elegant hallway with grand staircase and arched doorway', span: 2 },
    { id: '1634822930432-0594057fdff2', alt: 'Wooden door in a beautifully lit room', span: 1 },
    { id: '1758448511533-e1502259fff6', alt: 'Modern hotel lobby with wood accents', span: 1 },
    { id: '1537199322506-85bfd51c0601', alt: 'Open wooden door — elegant and warm', span: 1 },
    { id: '1771354959667-96360bf59eab', alt: 'Cozy entryway with wooden stairs and glass door', span: 2 },
    { id: '1603673298820-40d77252226d', alt: 'Brown wooden door beside a white wall', span: 1 },
  ]

  return (
    <section id="gallery" style={{ background: 'var(--bg)', padding: '120px 40px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Design Gallery</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 44px)', color: 'var(--text)', margin: '12px 0 16px', letterSpacing: '-0.02em' }}>
            Where Doors Meet Art
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: 'var(--muted)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            A curated look at our doors installed in premium residences and commercial spaces.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '280px', gap: 16 }}>
          {images.map((img_item, i) => (
            <div key={img_item.id} className={`reveal reveal-delay-${(i % 3) + 1}`} style={{
              gridColumn: `span ${img_item.span}`,
              position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius)',
              background: '#D4C5B0',
            }}>
              <img
                src={img(img_item.id, img_item.span === 2 ? 900 : 500, 560)}
                alt={img_item.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(26,18,8,0.55) 0%, transparent 60%)',
                opacity: 0, transition: 'opacity 0.35s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget.previousElementSibling as HTMLElement).style.transform = 'scale(1.06)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0'; (e.currentTarget.previousElementSibling as HTMLElement).style.transform = 'none' }}
              >
                <div style={{ position: 'absolute', bottom: 20, left: 20, color: 'white', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500 }}>
                  {img_item.alt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { #gallery .gallery-grid-inner { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

// ─── Catalog ─────────────────────────────────────────────────────────────────
function Catalog() {
  const catalogs = [
    {
      title: 'Lamination Door Catalog',
      desc: 'Explore our full range of lamination door designs, finishes, and specifications.',
      href: 'assests/l5.pdf',
      download: true,
    },
    {
      title: 'Laminate Door Catalog',
      desc: 'Browse premium laminate door collections. Contact us via WhatsApp for the full catalog.',
      href: 'https://wa.me/919307603624?text=Please%20send%20me%20the%20Laminate%20Door%20Catalog',
      download: false,
      whatsapp: true,
    },
    {
      title: 'Sagwan Door Catalog',
      desc: 'Discover our authentic Sagwan timber door collection with complete specifications.',
      href: 'assests/sagwan.pdf',
      download: true,
    },
  ]

  return (
    <section id="catalog" style={{ background: '#F4F0EB', padding: '120px 40px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Downloads</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 44px)', color: 'var(--text)', margin: '12px 0 16px', letterSpacing: '-0.02em' }}>
            Product Catalogs
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: 'var(--muted)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            Download detailed catalogs with full specifications, design options, and pricing guides.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {catalogs.map((c, i) => (
            <div key={c.title} className={`reveal reveal-delay-${i + 1}`} style={{
              background: 'var(--card)', borderRadius: 'var(--radius)', padding: '40px 36px',
              border: '1px solid var(--border)', display: 'flex', flexDirection: 'column',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(110,75,42,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              <div style={{
                width: 60, height: 60, background: 'var(--accent-light)', borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--primary)', marginBottom: 28,
              }}><IconPDF /></div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 19, color: 'var(--text)', margin: '0 0 10px' }}>{c.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 32px', flexGrow: 1 }}>{c.desc}</p>
              <a href={c.href} target="_blank" rel="noopener noreferrer" download={c.download || undefined} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--primary)', color: 'white',
                fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14,
                padding: '13px 24px', borderRadius: 100, textDecoration: 'none',
                transition: 'background 0.2s, transform 0.2s',
                justifyContent: 'center',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--primary-light)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--primary)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
              >
                <IconDownload />
                {c.whatsapp ? 'Request via WhatsApp' : 'Download Catalog'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────────────────────
function About() {
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const years = useCounter(10, 1800, statsVisible)
  const customers = useCounter(5000, 2200, statsVisible)
  const designs = useCounter(100, 1600, statsVisible)
  const satisfaction = useCounter(98, 1800, statsVisible)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStatsVisible(true) }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const timeline = [
    { year: '2015', event: 'Company founded in Arag, Miraj with a vision for premium door manufacturing.' },
    { year: '2020', event: 'Expanded manufacturing capacity and introduced new product lines across Maharashtra.' },
    { year: 'Today', event: 'Trusted partner for builders, contractors, and homeowners across the region.' },
  ]

  const stats = [
    { value: years, suffix: '+', label: 'Years Experience' },
    { value: customers, suffix: '+', label: 'Satisfied Customers' },
    { value: designs, suffix: '+', label: 'Door Designs' },
    { value: satisfaction, suffix: '%', label: 'Customer Satisfaction' },
  ]

  return (
    <section id="about" style={{ background: 'var(--bg)', padding: '120px 40px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        {/* Split layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', marginBottom: 100 }} className="about-grid">
          <div className="reveal">
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Our Story</span>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 42px)', color: 'var(--text)', margin: '12px 0 24px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Building Trust Through<br />Exceptional Craftsmanship
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>
              Located in the heart of Arag, Taluka Miraj, District Sangli, Shree Sairam Industries is a trusted name in door manufacturing. Our commitment to craftsmanship ensures every door we produce meets the highest standards.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 40 }}>
              We pride ourselves on using strong raw materials and precise finishing techniques that guarantee long-lasting durability. Customer satisfaction and timely delivery remain our top priorities — serving builders, contractors, and individual homeowners alike.
            </p>

            {/* Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {timeline.map((t, i) => (
                <div key={t.year} style={{ display: 'flex', gap: 20, paddingBottom: i < timeline.length - 1 ? 28 : 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 36, height: 36, background: 'var(--accent-light)', border: '2px solid var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 8, height: 8, background: 'var(--primary)', borderRadius: '50%' }} />
                    </div>
                    {i < timeline.length - 1 && <div style={{ width: 1, flexGrow: 1, background: 'var(--border)', marginTop: 4 }} />}
                  </div>
                  <div style={{ paddingTop: 6, paddingBottom: i < timeline.length - 1 ? 0 : 0 }}>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--primary)', marginBottom: 4 }}>{t.year}</div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2" style={{ position: 'relative' }}>
            <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', background: '#D4C5B0', aspectRatio: '4/5' }}>
              <img
                src={img('1547609434-b732edfee020', 700, 880)}
                alt="Shree Sairam Industries manufacturing facility — skilled craftsmen at work"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{
              position: 'absolute', bottom: -28, left: -28,
              background: 'var(--primary)', borderRadius: 'var(--radius)', padding: '24px 32px',
              boxShadow: '0 16px 48px rgba(110,75,42,0.3)',
            }}>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 36, color: 'white', lineHeight: 1 }}>10+</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>Years of Excellence</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, background: 'var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }} className="stats-grid">
          {stats.map((s, i) => (
            <div key={s.label} className={`reveal reveal-delay-${i + 1}`} style={{
              background: i % 2 === 0 ? 'var(--card)' : '#FAFAF8',
              padding: '48px 32px', textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 3.5vw, 48px)', color: 'var(--primary)', lineHeight: 1 }}>
                {s.value}{s.suffix}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'var(--muted)', marginTop: 10, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  )
}

// ─── Testimonials ────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    { name: 'Rajesh Patil', role: 'Home Builder, Sangli', review: 'Shree Sairam Industries delivered exceptional quality lamination doors for my entire housing project. The finish is immaculate and my clients are absolutely thrilled.', avatar: 'RP' },
    { name: 'Suresh Kulkarni', role: 'Interior Contractor, Miraj', review: "I've been sourcing Sagwan doors from them for three years. Unmatched quality, perfect sizing, and always on-time delivery. My go-to manufacturer.", avatar: 'SK' },
    { name: 'Priya Deshmukh', role: 'Homeowner, Kolhapur', review: "Ordered PVC doors for our bathrooms — completely waterproof and beautifully finished. The team was professional and delivery was quicker than expected!", avatar: 'PD' },
    { name: 'Amit Sharma', role: 'Architect, Pune', review: 'Their laminate door range gives my projects a premium feel that clients love. The custom sizing option is a game-changer for unique spaces.', avatar: 'AS' },
  ]

  return (
    <section style={{ background: '#F4F0EB', padding: '120px 40px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Testimonials</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 44px)', color: 'var(--text)', margin: '12px 0 16px', letterSpacing: '-0.02em' }}>
            Trusted by Thousands
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: 'var(--muted)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            Real experiences from builders, contractors, and homeowners across Maharashtra.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 24 }}>
          {testimonials.map((t, i) => (
            <div key={t.name} className={`reveal reveal-delay-${i + 1}`} style={{
              background: 'var(--card)', borderRadius: 'var(--radius)', padding: '36px 32px',
              border: '1px solid var(--border)',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(110,75,42,0.09)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                {[1,2,3,4,5].map(n => <IconStar key={n} />)}
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'var(--text)', lineHeight: 1.75, margin: '0 0 28px', fontStyle: 'italic' }}>
                "{t.review}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44, height: 44, background: 'var(--accent-light)', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, color: 'var(--primary)',
                }}>{t.avatar}</div>
                <div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15, color: 'var(--text)' }}>{t.name}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--muted)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await fetch('https://formsubmit.co/ajax/shree050607@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: 'New Website Enquiry - Sairam Doors',
          name: form.name, phone: form.phone,
          email: form.email || 'No email provided', message: form.message,
        }),
      })
      const msg = `*New Website Enquiry*\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email || 'N/A'}\n*Message:* ${form.message}`
      window.open(`https://wa.me/919422516087?text=${encodeURIComponent(msg)}`, '_blank')
      setStatus('sent')
      setForm({ name: '', phone: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }, [form])

  const inputStyle = {
    width: '100%', fontFamily: 'Inter, sans-serif', fontSize: 15,
    color: 'var(--text)', background: 'var(--bg)',
    border: '1.5px solid var(--border)', borderRadius: 12, padding: '14px 16px',
    outline: 'none', transition: 'border-color 0.2s',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = { fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: 8 }

  return (
    <section id="contact" style={{ background: 'var(--bg)', padding: '120px 40px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Get In Touch</span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 44px)', color: 'var(--text)', margin: '12px 0 16px', letterSpacing: '-0.02em' }}>
            Start Your Project Today
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: 'var(--muted)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            Ready to upgrade your space? Reach out for inquiries, quotes, or custom orders.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48, marginBottom: 48 }} className="contact-grid">
          {/* Contact info */}
          <div className="reveal">
            <div style={{ background: 'var(--primary)', borderRadius: 'var(--radius)', padding: '48px 40px', height: '100%', display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, color: 'white', margin: '0 0 12px' }}>Contact Information</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: 0 }}>
                  Visit our facility or reach out through any of the channels below.
                </p>
              </div>

              {[
                { icon: <IconMapPin />, label: 'Address', value: 'Arag, Taluka Miraj, District Sangli, Maharashtra, India' },
                { icon: <IconPhone />, label: 'Phone', value: '+91 94225 16087' },
                { icon: <IconMail />, label: 'WhatsApp', value: '+91 93076 03624' },
                { icon: <IconClock />, label: 'Business Hours', value: 'Mon – Sat: 9:00 AM – 7:00 PM' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.12)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'white', lineHeight: 1.5 }}>{item.value}</div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>Connect with us</div>
                <a href="https://wa.me/919307603624" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#25D366', color: 'white',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13,
                  padding: '10px 20px', borderRadius: 100, textDecoration: 'none',
                }}>
                  <IconWhatsApp /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="reveal reveal-delay-2">
            <div style={{ background: 'var(--card)', borderRadius: 'var(--radius)', padding: '48px 40px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 22, color: 'var(--text)', margin: '0 0 32px' }}>Send an Enquiry</h3>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input style={inputStyle} type="text" placeholder="Your full name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--accent)'}
                    onBlur={e => (e.target as HTMLElement).style.borderColor = 'var(--border)'}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                  <div>
                    <label style={labelStyle}>Phone Number *</label>
                    <input style={inputStyle} type="tel" placeholder="+91 00000 00000" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--accent)'}
                      onBlur={e => (e.target as HTMLElement).style.borderColor = 'var(--border)'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input style={inputStyle} type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--accent)'}
                      onBlur={e => (e.target as HTMLElement).style.borderColor = 'var(--border)'}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }} placeholder="How can we help you? Describe your door requirements..." required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--accent)'}
                    onBlur={e => (e.target as HTMLElement).style.borderColor = 'var(--border)'}
                  />
                </div>
                <button type="submit" disabled={status === 'sending'} className="btn-ripple" style={{
                  background: status === 'sent' ? '#25D366' : status === 'error' ? '#e53e3e' : 'var(--primary)',
                  color: 'white', border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15,
                  padding: '16px 32px', borderRadius: 100,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'background 0.3s, transform 0.2s',
                  opacity: status === 'sending' ? 0.75 : 1,
                }}
                  onMouseEnter={e => { if (status === 'idle') (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'none'}
                >
                  {status === 'idle' && <><IconArrowRight /> Send Enquiry</>}
                  {status === 'sending' && 'Sending...'}
                  {status === 'sent' && '✓ Message Sent Successfully!'}
                  {status === 'error' && 'Error — Try WhatsApp Instead'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="reveal" style={{ borderRadius: 'var(--radius)', overflow: 'hidden', height: 380, border: '1px solid var(--border)' }}>
          <iframe
            src="https://www.google.com/maps?q=Arag%20Miraj%20Sangli&output=embed"
            width="100%" height="100%" style={{ border: 0, display: 'block' }}
            allowFullScreen loading="lazy" title="Shree Sairam Industries Location"
          />
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{ background: 'var(--dark)', color: 'white', padding: '80px 40px 32px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, background: 'var(--accent)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, color: 'var(--dark)' }}>S</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, color: 'white' }}>Shree Sairam Industries</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>PREMIUM DOOR MANUFACTURER</div>
              </div>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: '0 0 28px', maxWidth: 280 }}>
              Crafting premium doors with timeless quality since 2015. Trusted across Maharashtra by builders, contractors, and homeowners.
            </p>
            <a href="https://wa.me/919307603624" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#25D366', color: 'white',
              fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13,
              padding: '10px 18px', borderRadius: 100, textDecoration: 'none',
            }}>
              <IconWhatsApp /> WhatsApp Us
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: 'white', margin: '0 0 20px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Navigation</h4>
            {['home', 'products', 'gallery', 'catalog', 'about', 'contact'].map(l => (
              <button key={l} onClick={() => scroll(l)} style={{
                display: 'block', background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.5)',
                padding: '5px 0', textTransform: 'capitalize', textAlign: 'left',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--accent)'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
              >{l.charAt(0).toUpperCase() + l.slice(1)}</button>
            ))}
          </div>

          {/* Products */}
          <div>
            <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: 'white', margin: '0 0 20px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Products</h4>
            {['Lamination Doors', 'Laminate Doors', 'PVC Doors', 'Sagwan Doors'].map(p => (
              <button key={p} onClick={() => scroll('products')} style={{
                display: 'block', background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.5)',
                padding: '5px 0', textAlign: 'left', transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--accent)'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
              >{p}</button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: 'white', margin: '0 0 20px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: <IconMapPin />, text: 'Arag, Tal. Miraj, Dist. Sangli, Maharashtra' },
                { icon: <IconPhone />, text: '+91 94225 16087' },
                { icon: <IconMail />, text: '+91 93076 03624 (WhatsApp)' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            © 2015–2026 Shree Sairam Industries. All rights reserved.
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            Arag · Taluka Miraj · District Sangli · Maharashtra · India
          </p>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </footer>
  )
}

// ─── Floating Buttons ─────────────────────────────────────────────────────────
function FloatingButtons() {
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const handle = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  return (
    <>
      {/* WhatsApp */}
      <a href="https://wa.me/919307603624" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" style={{
        position: 'fixed', bottom: 28, left: 28, zIndex: 900,
        width: 56, height: 56, background: '#25D366', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(37,211,102,0.35)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        textDecoration: 'none',
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(37,211,102,0.5)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(37,211,102,0.35)' }}
      >
        <IconWhatsApp />
      </a>

      {/* Back to top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 900,
        width: 48, height: 48, background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer',
        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(110,75,42,0.3)',
        opacity: showTop ? 1 : 0, transform: showTop ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.3s, transform 0.3s',
        pointerEvents: showTop ? 'auto' : 'none',
      }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--primary-light)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--primary)'}
      >
        <IconChevronUp />
      </button>
    </>
  )
}

// ─── Loading Screen ───────────────────────────────────────────────────────────
function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1400)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 9999,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <div style={{ width: 40, height: 40, background: 'var(--primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, color: 'white' }}>S</span>
        </div>
        <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, color: 'var(--text)' }}>Shree Sairam Industries</div>
      </div>
      <div style={{ width: 48, height: 48, border: '3px solid var(--accent-light)', borderTop: '3px solid var(--primary)', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false)
  useReveal()

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease 0.2s' }}>
        <Navbar />
        <Hero />
        <Features />
        <Products />
        <Gallery />
        <Catalog />
        <About />
        <Contact />
        <Footer />
        <FloatingButtons />
      </div>
    </>
  )
}
