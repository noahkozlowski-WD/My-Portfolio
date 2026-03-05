import React, { useEffect, useRef, useState } from 'react';
import { Globe, Smartphone, Search, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useResponsive from '../hooks/use-responsive';
import makeSectionAccent from '../utils/makeSectionAccent';

gsap.registerPlugin(ScrollTrigger);

/* ────── Inline SVG illustrations ────── */
const WebsiteSVG = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ opacity: 0.45 }}>
    <rect x="4" y="8" width="56" height="42" rx="4" stroke="#3b82f6" strokeWidth="1.5" />
    <line x1="4" y1="18" x2="60" y2="18" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
    <circle cx="11" cy="13" r="2" fill="#f43f5e" opacity="0.6" />
    <circle cx="17" cy="13" r="2" fill="#f59e0b" opacity="0.6" />
    <circle cx="23" cy="13" r="2" fill="#10b981" opacity="0.6" />
    <rect x="10" y="24" width="22" height="2" rx="1" fill="#3b82f6" opacity="0.4" />
    <rect x="10" y="30" width="16" height="2" rx="1" fill="#3b82f6" opacity="0.25" />
    <rect x="10" y="36" width="20" height="2" rx="1" fill="#3b82f6" opacity="0.25" />
    <rect x="38" y="24" width="16" height="16" rx="2" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
    <text x="32" y="58" textAnchor="middle" fill="#3b82f6" fontSize="6" fontFamily="JetBrains Mono, monospace" opacity="0.3">{"</>"}</text>
  </svg>
);

const MobileSVG = () => (
  <svg width="48" height="64" viewBox="0 0 48 64" fill="none" style={{ opacity: 0.45 }}>
    <rect x="8" y="4" width="32" height="56" rx="6" stroke="#3b82f6" strokeWidth="1.5" />
    <line x1="8" y1="14" x2="40" y2="14" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
    <line x1="8" y1="50" x2="40" y2="50" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
    <rect x="14" y="20" width="20" height="10" rx="2" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
    <rect x="14" y="34" width="9" height="9" rx="2" stroke="#3b82f6" strokeWidth="1" opacity="0.25" />
    <rect x="26" y="34" width="9" height="9" rx="2" stroke="#3b82f6" strokeWidth="1" opacity="0.25" />
    <circle cx="24" cy="55" r="3" stroke="#3b82f6" strokeWidth="1" opacity="0.25" />
  </svg>
);

const SeoSVG = () => (
  <svg width="64" height="56" viewBox="0 0 64 56" fill="none" style={{ opacity: 0.45 }}>
    <line x1="8" y1="48" x2="56" y2="48" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
    <rect x="12" y="36" width="8" height="12" rx="1" fill="#3b82f6" opacity="0.15" />
    <rect x="24" y="28" width="8" height="20" rx="1" fill="#3b82f6" opacity="0.2" />
    <rect x="36" y="18" width="8" height="30" rx="1" fill="#3b82f6" opacity="0.25" />
    <rect x="48" y="10" width="8" height="38" rx="1" fill="#3b82f6" opacity="0.3" />
    <polyline points="14,34 28,26 40,16 52,8" stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.5" />
    <circle cx="52" cy="8" r="3" fill="#3b82f6" opacity="0.4" />
  </svg>
);

const ConversionSVG = () => (
  <svg width="64" height="48" viewBox="0 0 64 48" fill="none" style={{ opacity: 0.45 }}>
    <path d="M12 4 L52 4 L42 18 L22 18 Z" stroke="#3b82f6" strokeWidth="1.2" fill="#3b82f6" fillOpacity="0.05" />
    <path d="M22 20 L42 20 L38 32 L26 32 Z" stroke="#3b82f6" strokeWidth="1.2" fill="#3b82f6" fillOpacity="0.08" />
    <path d="M26 34 L38 34 L35 44 L29 44 Z" stroke="#3b82f6" strokeWidth="1.2" fill="#3b82f6" fillOpacity="0.12" />
    <circle cx="32" cy="46" r="2" fill="#3b82f6" opacity="0.5" />
    <line x1="32" y1="44" x2="32" y2="46" stroke="#3b82f6" strokeWidth="1" opacity="0.4" />
  </svg>
);

const svgMap = [WebsiteSVG, MobileSVG, SeoSVG, ConversionSVG];

/* ────── Service data ────── */
const SERVICES = [
  {
    tag: 'Core Service',
    title: 'Custom Website for Your Business',
    desc: "Your website is your first impression. I'll build something professional, fast, and custom — not a template — that showcases your brand and turns visitors into customers.",
    pills: ['Stand Out', 'Build Trust', '24/7 Presence'],
    Icon: Globe,
  },
  {
    tag: 'Performance',
    title: 'Mobile-Friendly & Fast Loading',
    desc: 'Over 60% of web traffic is mobile. Your site will look stunning and load instantly on every device — phones, tablets, and computers.',
    pills: ['All Devices', 'Lightning Fast', 'Better UX'],
    Icon: Smartphone,
  },
  {
    tag: 'Visibility',
    title: 'Get Found on Google',
    desc: "I'll optimise your site so customers discover you through local search — more visibility, more customers.",
    pills: ['Local SEO', 'More Visitors', 'Reach Customers'],
    Icon: Search,
  },
  {
    tag: 'Growth',
    title: 'Turn Visitors Into Customers',
    desc: 'Websites designed to turn interest into action from the very first visit.',
    pills: ['Conversions', 'Pro Design', 'Always Online'],
    Icon: MessageSquare,
  },
];

/* ────── Accent colors ────── */
const BLUE = '#3b82f6';
const sectionAccentStyle = makeSectionAccent(59, 130, 246);

const Services = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const { isMobile } = useResponsive();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      });

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(cards, { opacity: 0, y: 80, scale: 0.9 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        });
      }

      // Parallax glow blob
      const glow = sectionRef.current?.querySelector('[data-parallax-glow]');
      if (glow) {
        gsap.to(glow, {
          y: -70,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-darker"
      style={{ padding: isMobile ? '80px 0' : '120px 0', overflow: 'hidden', ...sectionAccentStyle }}
    >
      {/* Parallax glow */}
      <div data-parallax-glow="" style={{
        position: 'absolute', bottom: '10%', left: '5%',
        width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.04) 0%, transparent 60%)',
        pointerEvents: 'none',
        willChange: 'transform',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* Header */}
        <div ref={headerRef} style={{ opacity: 0, marginBottom: isMobile ? 40 : 64 }}>
          <p className="font-mono" style={{
            color: BLUE,
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            {'// '}How I Can Help
          </p>
          <h2 className="font-heading" style={{
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: 12,
          }}>
            <span style={{ color: 'var(--text-primary)' }}>Everything </span>
            <span style={{
              background: `linear-gradient(135deg, ${BLUE}, #60a5fa)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>You Need</span>
          </h2>
          <p className="font-body" style={{
            color: 'var(--text-muted)',
            fontSize: '1rem',
            maxWidth: 420,
          }}>
            For a successful online presence, built around your goals.
          </p>
        </div>

        {/* ═══ Bento Grid ═══ */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gridTemplateRows: isMobile ? 'auto' : 'auto auto auto',
            gap: 16,
          }}
        >
          {SERVICES.map((svc, index) => {
            const { tag, title, desc, pills, Icon } = svc;
            const SVGIllustration = svgMap[index];
            const isActive = activeCard === index;
            const isHero = index === 0;
            const isFullWidth = index === 3;

            // Bento grid placement — only on desktop
            const gridStyle = {};
            if (!isMobile) {
              if (isHero) {
                gridStyle.gridColumn = '1';
                gridStyle.gridRow = '1 / 3';
              } else if (index === 1) {
                gridStyle.gridColumn = '2';
                gridStyle.gridRow = '1';
              } else if (index === 2) {
                gridStyle.gridColumn = '2';
                gridStyle.gridRow = '2';
              } else if (isFullWidth) {
                gridStyle.gridColumn = '1 / -1';
                gridStyle.gridRow = '3';
              }
            }

            return (
              <div
                key={index}
                style={{
                  ...gridStyle,
                  background: isHero
                    ? `linear-gradient(145deg, rgba(59, 130, 246, 0.06), rgba(96, 165, 250, 0.04), var(--bg-card))`
                    : 'var(--bg-card)',
                  border: `1px solid ${isActive ? `rgba(59, 130, 246, 0.3)` : 'var(--border-subtle)'}`,
                  borderRadius: 20,
                  padding: isMobile ? 24 : (isHero ? 36 : (isFullWidth ? '28px 36px' : 28)),
                  display: 'flex',
                  flexDirection: (!isMobile && isFullWidth) ? 'row' : 'column',
                  gap: (!isMobile && isFullWidth) ? 32 : 16,
                  cursor: 'default',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isActive ? `0 0 20px rgba(59, 130, 246, 0.15), 0 0 60px rgba(59, 130, 246, 0.05)` : 'none',
                  transform: isActive ? 'translateY(-4px)' : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  alignItems: (!isMobile && isFullWidth) ? 'center' : 'stretch',
                }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* SVG Illustration — top right on desktop, hidden on mobile for small cards */}
                <div style={{
                  position: (!isMobile && !isFullWidth) ? 'absolute' : 'relative',
                  top: (!isMobile && !isFullWidth) ? 20 : undefined,
                  right: (!isMobile && !isFullWidth) ? 20 : undefined,
                  flexShrink: 0,
                  display: isMobile ? 'none' : 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.4s ease',
                  transform: isActive ? 'scale(1.08)' : 'scale(1)',
                }}>
                  <SVGIllustration />
                </div>

                {/* Content */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: isMobile ? 12 : 16,
                  flex: 1,
                }}>
                  {/* Icon + Tag */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: isMobile ? 42 : 48,
                      height: isMobile ? 42 : 48,
                      borderRadius: 14,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isHero
                        ? `linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(96, 165, 250, 0.15))`
                        : `rgba(59, 130, 246, 0.08)`,
                      border: `1px solid ${isHero ? `rgba(59, 130, 246, 0.2)` : `rgba(59, 130, 246, 0.1)`}`,
                      transition: 'all 0.3s',
                    }}>
                      <Icon size={isMobile ? 18 : 20} style={{ color: BLUE }} />
                    </div>
                    <span className="font-mono" style={{
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: BLUE,
                      opacity: 0.7,
                    }}>
                      {tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading" style={{
                    fontSize: isMobile ? '1.1rem' : (isHero ? '1.4rem' : '1.15rem'),
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: 1.25,
                  }}>
                    {title}
                  </h3>

                  {/* Divider */}
                  <div style={{
                    height: 1,
                    background: 'var(--border-subtle)',
                  }} />

                  {/* Description */}
                  <p className="font-body" style={{
                    color: 'var(--text-secondary)',
                    fontSize: isMobile ? '0.85rem' : '0.9rem',
                    lineHeight: 1.7,
                    flex: 1,
                  }}>
                    {desc}
                  </p>

                  {/* Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {pills.map(p => (
                      <span
                        key={p}
                        className="font-mono"
                        style={{
                          fontSize: '0.68rem',
                          padding: '5px 12px',
                          borderRadius: 999,
                          fontWeight: 500,
                          color: BLUE,
                          background: `rgba(59, 130, 246, 0.06)`,
                          border: `1px solid rgba(59, 130, 246, 0.1)`,
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
