import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, ArrowUpRight, Github, Linkedin, Sparkles, Rocket, ChevronDown } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { portfolioData } from '../mock';
import axios from 'axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useResponsive from '../hooks/use-responsive';
import makeSectionAccent from '../utils/makeSectionAccent';

gsap.registerPlugin(ScrollTrigger);

const NEON_PURPLE = '#bf00ff';
const VIOLET = '#a855f7';
const PURPLE_RGB = '191, 0, 255';
const VIOLET_RGB = '168, 85, 247';
const sectionAccentStyle = makeSectionAccent(191, 0, 255);

const BACKEND_URL = 'https://backend-noah.zeabur.app';
const API = `${BACKEND_URL}/api`;

const PROJECT_OPTIONS = [
  { value: '', label: 'Not sure yet' },
  { value: 'launchpad', label: 'LaunchPad \u2014 R3,500' },
  { value: 'ascend', label: 'Ascend \u2014 R6,500' },
];

const CircuitDecor = ({ style }) => (
  <svg style={{ position: 'absolute', pointerEvents: 'none', opacity: 0.04, ...style }}
    width="220" height="220" viewBox="0 0 220 220" fill="none">
    <line x1="20" y1="40" x2="140" y2="40" stroke={NEON_PURPLE} strokeWidth="0.5" />
    <line x1="60" y1="90" x2="200" y2="90" stroke={NEON_PURPLE} strokeWidth="0.5" />
    <line x1="30" y1="140" x2="160" y2="140" stroke={NEON_PURPLE} strokeWidth="0.5" />
    <line x1="80" y1="190" x2="210" y2="190" stroke={NEON_PURPLE} strokeWidth="0.5" />
    <circle cx="140" cy="40" r="3" fill={NEON_PURPLE} opacity="0.4" />
    <circle cx="60" cy="90" r="2" fill={NEON_PURPLE} opacity="0.3" />
    <circle cx="160" cy="140" r="3" fill={NEON_PURPLE} opacity="0.4" />
    <circle cx="80" cy="190" r="2" fill={NEON_PURPLE} opacity="0.3" />
    <line x1="140" y1="40" x2="140" y2="90" stroke={NEON_PURPLE} strokeWidth="0.5" strokeDasharray="4 4" />
    <line x1="160" y1="90" x2="160" y2="140" stroke={NEON_PURPLE} strokeWidth="0.5" strokeDasharray="4 4" />
  </svg>
);

/* ---- Reusable sub-components ---- */

const CTACard = ({ contact, isMobile }) => (
  <div style={{
    borderRadius: 22, padding: isMobile ? '24px 20px' : '32px 28px',
    background: `linear-gradient(145deg, rgba(${PURPLE_RGB}, 0.08), rgba(${VIOLET_RGB}, 0.04), var(--bg-card))`,
    border: `1px solid rgba(${PURPLE_RGB}, 0.18)`,
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${NEON_PURPLE}, ${VIOLET}, transparent)` }} />
    <CircuitDecor style={{ bottom: -20, right: -20 }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <Sparkles size={18} style={{ color: NEON_PURPLE }} />
      <h3 className="font-heading" style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>Ready to Start?</h3>
    </div>
    <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: 22 }}>
      I'm always excited to take on new challenges. First consultation is always free — no strings attached.
    </p>
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {[
        { href: contact.social.github, icon: Github, label: 'GitHub' },
        { href: contact.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
      ].map(({ href, icon: SIcon, label }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="font-mono"
          style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 12,
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', color: NEON_PURPLE,
            background: `rgba(${PURPLE_RGB}, 0.06)`, border: `1px solid rgba(${PURPLE_RGB}, 0.15)`,
            textDecoration: 'none', transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 20px rgba(${PURPLE_RGB}, 0.2)`; e.currentTarget.style.borderColor = `rgba(${PURPLE_RGB}, 0.35)`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = `rgba(${PURPLE_RGB}, 0.15)`; e.currentTarget.style.transform = 'none'; }}
        >
          <SIcon size={14} />{label}
        </a>
      ))}
    </div>
  </div>
);

const ContactInfoCards = ({ contactItems, hoveredContact, setHoveredContact }) => (
  <>
    {contactItems.map(({ icon: Icon, label, value, href }, idx) => {
      const isHovered = hoveredContact === idx;
      return (
        <div key={label}
          onMouseEnter={() => setHoveredContact(idx)}
          onMouseLeave={() => setHoveredContact(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', borderRadius: 18,
            background: isHovered ? `linear-gradient(135deg, rgba(${PURPLE_RGB}, 0.08), rgba(${VIOLET_RGB}, 0.04))` : 'var(--bg-card)',
            border: `1px solid ${isHovered ? `rgba(${PURPLE_RGB}, 0.3)` : 'var(--border-subtle)'}`,
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: isHovered ? `0 0 30px rgba(${PURPLE_RGB}, 0.1)` : 'none',
            transform: isHovered ? 'translateY(-2px)' : 'none',
            cursor: href ? 'pointer' : 'default',
          }}
          onClick={() => href && window.open(href, '_self')}
        >
          <div style={{
            width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `rgba(${PURPLE_RGB}, 0.08)`, border: `1px solid rgba(${PURPLE_RGB}, 0.15)`, flexShrink: 0,
            transition: 'all 0.3s', boxShadow: isHovered ? `0 0 16px rgba(${PURPLE_RGB}, 0.2)` : 'none',
          }}>
            <Icon size={20} style={{ color: NEON_PURPLE }} />
          </div>
          <div style={{ flex: 1 }}>
            <p className="font-mono" style={{ fontSize: '0.63rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: NEON_PURPLE, opacity: 0.7, marginBottom: 4 }}>{label}</p>
            <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', fontWeight: 500 }}>{value}</p>
          </div>
          {href && <ArrowUpRight size={16} style={{ color: NEON_PURPLE, opacity: isHovered ? 0.8 : 0.3, transition: 'all 0.3s', transform: isHovered ? 'translate(2px, -2px)' : 'none' }} />}
        </div>
      );
    })}
  </>
);

const ContactForm = ({ formData, handleChange, handleSubmit, isSubmitting, formFocused, setFormFocused, isMobile }) => (
  <div style={{
    borderRadius: 24, padding: isMobile ? '24px 20px' : '36px 32px',
    background: 'var(--bg-card)', border: `1px solid rgba(${PURPLE_RGB}, 0.12)`,
    alignSelf: isMobile ? 'stretch' : 'start', position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: `linear-gradient(90deg, transparent, rgba(${PURPLE_RGB}, 0.4), transparent)` }} />
    <CircuitDecor style={{ top: -10, right: -10, opacity: 0.03 }} />

    <h3 className="font-heading" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Send a Message</h3>
    <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 28, lineHeight: 1.5 }}>Fill out the form and I'll get back to you soon</p>

    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <label className="font-heading" htmlFor="name" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: formFocused === 'name' ? NEON_PURPLE : 'var(--text-secondary)', marginBottom: 8, transition: 'color 0.3s' }}>Name</label>
        <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your name" className="input-cyber" style={{ width: '100%' }} onFocus={() => setFormFocused('name')} onBlur={() => setFormFocused(null)} />
      </div>
      <div>
        <label className="font-heading" htmlFor="email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: formFocused === 'email' ? NEON_PURPLE : 'var(--text-secondary)', marginBottom: 8, transition: 'color 0.3s' }}>Email</label>
        <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="your.email@example.com" className="input-cyber" style={{ width: '100%' }} onFocus={() => setFormFocused('email')} onBlur={() => setFormFocused(null)} />
      </div>
      <div>
        <label className="font-heading" htmlFor="project" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', fontWeight: 600, color: formFocused === 'project' ? NEON_PURPLE : 'var(--text-secondary)', marginBottom: 8, transition: 'color 0.3s' }}>
          <Rocket size={14} style={{ opacity: 0.7 }} />Interested In
        </label>
        <div style={{ position: 'relative' }}>
          <select id="project" name="project" value={formData.project} onChange={handleChange} onFocus={() => setFormFocused('project')} onBlur={() => setFormFocused(null)}
            style={{ width: '100%', padding: '12px 44px 12px 16px', borderRadius: 12, border: `1px solid ${formFocused === 'project' ? `rgba(${PURPLE_RGB}, 0.4)` : 'var(--border-subtle)'}`, background: 'rgba(255, 255, 255, 0.02)', color: formData.project ? 'var(--text-primary)' : 'var(--text-muted)', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif", cursor: 'pointer', outline: 'none', appearance: 'none', WebkitAppearance: 'none', transition: 'all 0.3s', boxShadow: formFocused === 'project' ? `0 0 16px rgba(${PURPLE_RGB}, 0.12)` : 'none' }}>
            {PROJECT_OPTIONS.map(opt => (<option key={opt.value} value={opt.value} style={{ background: '#1a1a2e', color: '#e2e8f0' }}>{opt.label}</option>))}
          </select>
          <ChevronDown size={16} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: formFocused === 'project' ? NEON_PURPLE : 'var(--text-muted)', pointerEvents: 'none', transition: 'color 0.3s' }} />
        </div>
      </div>
      <div>
        <label className="font-heading" htmlFor="message" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', fontWeight: 600, color: formFocused === 'message' ? NEON_PURPLE : 'var(--text-secondary)', marginBottom: 8, transition: 'color 0.3s' }}>
          Message
          <span className="font-mono" style={{ fontSize: '0.63rem', padding: '2px 10px', borderRadius: 999, background: formData.message.length >= 10 ? `rgba(${PURPLE_RGB}, 0.12)` : 'rgba(255, 255, 255, 0.04)', color: formData.message.length >= 10 ? NEON_PURPLE : 'var(--text-muted)', transition: 'all 0.3s' }}>
            {formData.message.length >= 10 ? `${String.fromCharCode(10003)} ${formData.message.length}` : `${formData.message.length}/10`}
          </span>
        </label>
        <Textarea id="message" name="message" required minLength={10} maxLength={2000} value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." rows={6} className="input-cyber" style={{ width: '100%', resize: 'vertical', minHeight: 130 }} onFocus={() => setFormFocused('message')} onBlur={() => setFormFocused(null)} />
      </div>
      <button type="submit" disabled={isSubmitting} className="font-heading"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: '15px 24px', borderRadius: 14, border: 'none', fontWeight: 700, fontSize: '0.92rem', letterSpacing: '0.02em', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.6 : 1, background: `linear-gradient(135deg, ${NEON_PURPLE}, #d946ef)`, color: '#ffffff', boxShadow: `0 0 24px rgba(${PURPLE_RGB}, 0.25)`, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
        onMouseEnter={e => { if (!isSubmitting) { e.currentTarget.style.boxShadow = `0 0 40px rgba(${PURPLE_RGB}, 0.45), 0 0 80px rgba(${VIOLET_RGB}, 0.15)`; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 24px rgba(${PURPLE_RGB}, 0.25)`; e.currentTarget.style.transform = 'none'; }}
      >
        {isSubmitting ? 'Sending...' : (<>Send Message <Send size={16} /></>)}
      </button>
    </form>
  </div>
);

/* ---- Main Component ---- */
const Contact = () => {
  const { contact } = portfolioData;
  const { toast } = useToast();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredContact, setHoveredContact] = useState(null);
  const [formFocused, setFormFocused] = useState(null);
  const { isMobile } = useResponsive();
  const [formData, setFormData] = useState({ name: '', email: '', message: '', project: '' });

  useEffect(() => {
    const readProjectFromHash = () => {
      const hash = window.location.hash;
      if (hash.includes('?project=')) {
        const params = new URLSearchParams(hash.split('?')[1]);
        const project = params.get('project');
        if (project && ['launchpad', 'ascend'].includes(project.toLowerCase())) {
          setFormData(prev => ({ ...prev, project: project.toLowerCase() }));
          setTimeout(() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 100);
        }
      }
    };
    readProjectFromHash();
    window.addEventListener('hashchange', readProjectFromHash);
    return () => window.removeEventListener('hashchange', readProjectFromHash);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: headerRef.current, start: 'top 90%' } });
      const items = contentRef.current?.children;
      if (items) { gsap.fromTo(items, { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: contentRef.current, start: 'top 90%' } }); }
      const orb = sectionRef.current?.querySelector('[data-contact-orb]');
      if (orb) { gsap.to(orb, { y: -60, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 } }); }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (formData.name.trim().length === 0) { toast({ title: 'Error', description: 'Name cannot be empty', variant: 'destructive', duration: 3000 }); setIsSubmitting(false); return; }
    if (formData.message.trim().length < 10) { toast({ title: 'Error', description: 'Message must be at least 10 characters', variant: 'destructive', duration: 3000 }); setIsSubmitting(false); return; }
    try {
      const dataToSend = { name: formData.name.trim(), email: formData.email.trim(), message: formData.message.trim(), project: formData.project || null };
      const response = await axios.post(`${API}/contact`, dataToSend);
      if (response.data.success) { toast({ title: 'Success!', description: response.data.message, duration: 3000 }); setFormData({ name: '', email: '', message: '', project: '' }); }
    } catch (error) {
      const errorMessage = error.response?.data?.detail?.[0]?.msg || error.response?.data?.detail || 'Failed to send message. Please try again.';
      toast({ title: 'Error', description: errorMessage, variant: 'destructive', duration: 3000 });
    } finally { setIsSubmitting(false); }
  };

  const contactItems = [
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
    { icon: MapPin, label: 'Location', value: 'Durban, South Africa', href: null },
  ];

  const formProps = { formData, handleChange, handleSubmit, isSubmitting, formFocused, setFormFocused, isMobile };

  return (
    <section id="contact" ref={sectionRef} className="section-darker"
      style={{ padding: isMobile ? '80px 0 100px' : '120px 0 140px', overflow: 'hidden', position: 'relative', ...sectionAccentStyle }}>

      {!isMobile && (<>
        <div data-contact-orb="" style={{ position: 'absolute', top: '5%', left: '-6%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, rgba(${PURPLE_RGB}, 0.06) 0%, rgba(${VIOLET_RGB}, 0.03) 40%, transparent 65%)`, pointerEvents: 'none', willChange: 'transform' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-4%', width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle, rgba(${VIOLET_RGB}, 0.04) 0%, transparent 60%)`, pointerEvents: 'none' }} />
      </>)}

      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(${PURPLE_RGB}, 0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(${PURPLE_RGB}, 0.012) 1px, transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {/* Header */}
        <div ref={headerRef} style={{ opacity: 0, textAlign: 'center', marginBottom: isMobile ? 40 : 64 }}>
          <p className="font-mono" style={{ color: NEON_PURPLE, fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>{'// '}Get In Touch</p>
          <h2 className="font-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16 }}>
            <span style={{ color: 'var(--text-primary)' }}>Let's Build </span>
            <span style={{ background: `linear-gradient(135deg, ${NEON_PURPLE}, #d946ef)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Something Great</span>
          </h2>
          <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '0.9rem' : '1rem', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>{contact.description}</p>
        </div>

        {/* Content — conditionally rendered layout */}
        <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 20 : 36 }}>

          {isMobile ? (
            <>
              {/* MOBILE: CTA -> Form -> Contact Cards */}
              <CTACard contact={contact} isMobile={isMobile} />
              <ContactForm {...formProps} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <ContactInfoCards contactItems={contactItems} hoveredContact={hoveredContact} setHoveredContact={setHoveredContact} />
              </div>
            </>
          ) : (
            /* DESKTOP: Two-column grid */
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 36 }}>
              {/* Left column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <CTACard contact={contact} isMobile={isMobile} />
                <ContactInfoCards contactItems={contactItems} hoveredContact={hoveredContact} setHoveredContact={setHoveredContact} />
              </div>
              {/* Right column */}
              <ContactForm {...formProps} />
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Contact;