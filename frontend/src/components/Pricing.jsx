import React, { useEffect, useRef, useState } from 'react';
import { Check, Zap, Globe, Smartphone, Crown, ArrowRight, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useResponsive from '../hooks/use-responsive';
import makeSectionAccent from '../utils/makeSectionAccent';

gsap.registerPlugin(ScrollTrigger);

/* ────── Section accent — cyber blue / indigo / neon purple ────── */
const CYAN = '#38bdf8';
const INDIGO = '#818cf8';
const NEON = '#bf00ff';
const sectionAccentStyle = makeSectionAccent(56, 189, 248);

/* ────── Pricing data ────── */
const PACKAGES = [
  {
    id: 'starter',
    tag: 'Perfect to Start',
    name: 'Starter Site',
    tagline: 'Get online, look professional.',
    Icon: Globe,
    accentColor: CYAN,
    accentRGB: '56, 189, 248',
    once: 3500,
    monthly: 290,
    hostingFee: 250,
    features: [
      'Up to 5 custom pages',
      'Mobile-responsive design',
      'Contact form integration',
      'Basic on-page SEO',
      'Google Maps embed',
      'Deployment & go-live',
    ],
    hosting: [
      'Managed hosting & uptime',
      'Monthly content updates (1 round)',
      'Security patches',
      'Priority support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'business',
    tag: '⚡ Most Popular',
    name: 'Business Pro',
    tagline: 'Designed to convert visitors into clients.',
    Icon: Zap,
    accentColor: INDIGO,
    accentRGB: '129, 140, 248',
    once: 6500,
    monthly: 540,
    hostingFee: 350,
    features: [
      'Up to 10 custom pages',
      'Premium UI/UX design',
      'Advanced animations & interactions',
      'Full SEO optimisation',
      'Blog or portfolio section',
      'Analytics & performance setup',
      'CTA & conversion-focused layout',
      'Deployment & go-live',
    ],
    hosting: [
      'Priority managed hosting',
      'Monthly content updates (3 rounds)',
      'Performance monitoring',
      'Security & SSL management',
      'Dedicated support line',
    ],
    cta: 'Start Building',
    popular: true,
  },
  {
    id: 'premium',
    tag: 'Full Power',
    name: 'Premium Custom',
    tagline: 'Enterprise-level, built around you.',
    Icon: Crown,
    accentColor: NEON,
    accentRGB: '191, 0, 255',
    once: null,
    monthly: null,
    hostingFee: null,
    features: [
      'Unlimited pages & custom features',
      'Full-stack web application',
      'Custom admin dashboard',
      'Third-party API integrations',
      'E-commerce / booking systems',
      'Advanced SEO strategy',
      'Performance & load optimisation',
      'Ongoing retainer available',
    ],
    hosting: [
      'Fully managed infrastructure',
      'Unlimited content updates',
      'Dedicated project channel',
      '24/7 emergency support',
      'Monthly strategy call',
    ],
    cta: 'Let\'s Talk',
    popular: false,
    custom: true,
  },
];

/* ────── SVG Decorative ────── */
const HexGrid = ({ color, opacity = 0.04 }) => (
  <svg
    style={{ position: 'absolute', bottom: 0, right: 0, pointerEvents: 'none', opacity }}
    width="180" height="180" viewBox="0 0 180 180" fill="none"
  >
    {[0, 1, 2].map(row =>
      [0, 1, 2].map(col => {
        const cx = col * 52 + (row % 2 === 0 ? 0 : 26) + 20;
        const cy = row * 45 + 20;
        return (
          <polygon
            key={`${row}-${col}`}
            points={`${cx},${cy - 22} ${cx + 19},${cy - 11} ${cx + 19},${cy + 11} ${cx},${cy + 22} ${cx - 19},${cy + 11} ${cx - 19},${cy - 11}`}
            stroke={color}
            strokeWidth="1"
            fill="none"
          />
        );
      })
    )}
  </svg>
);

/* ────── Payment Toggle ────── */
const PaymentToggle = ({ mode, setMode }) => (
  <div style={{
    display: 'inline-flex',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  }}>
    {['once-off', 'monthly'].map(m => (
      <button
        key={m}
        onClick={() => setMode(m)}
        style={{
          padding: '10px 24px',
          borderRadius: 9,
          border: 'none',
          cursor: 'pointer',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: '0.85rem',
          letterSpacing: '0.01em',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: mode === m
            ? `linear-gradient(135deg, ${CYAN}, ${INDIGO})`
            : 'transparent',
          color: mode === m ? '#0a0a0a' : 'var(--text-secondary)',
          boxShadow: mode === m ? `0 0 20px rgba(56, 189, 248, 0.35)` : 'none',
        }}
      >
        {m === 'once-off' ? 'Once-Off' : 'Monthly Plan'}
      </button>
    ))}
  </div>
);

/* ────── Price Display ────── */
const PriceDisplay = ({ pkg, mode }) => {
  if (pkg.custom) {
    return (
      <div style={{ minHeight: 72, display: 'flex', alignItems: 'center' }}>
        <span className="font-heading" style={{
          fontSize: 'clamp(1.6rem, 3vw, 2rem)',
          fontWeight: 800,
          background: `linear-gradient(135deg, ${pkg.accentColor}, #c084fc)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Custom Quote
        </span>
      </div>
    );
  }

  const price = mode === 'once-off' ? pkg.once : pkg.monthly;

  return (
    <div style={{ minHeight: 72 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span className="font-mono" style={{
          fontSize: '1rem',
          fontWeight: 500,
          color: pkg.accentColor,
          opacity: 0.8,
        }}>R</span>
        <span className="font-heading" style={{
          fontSize: 'clamp(2.2rem, 4vw, 3rem)',
          fontWeight: 800,
          background: `linear-gradient(135deg, ${pkg.accentColor}, ${pkg.accentColor}cc)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
        }}>
          {price?.toLocaleString()}
        </span>
        <span className="font-body" style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          marginLeft: 2,
        }}>
          {mode === 'once-off' ? 'once' : '/mo'}
        </span>
      </div>

      {mode === 'once-off' && pkg.hostingFee && (
        <p className="font-mono" style={{
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          marginTop: 6,
          letterSpacing: '0.05em',
        }}>
          + R{pkg.hostingFee}/mo hosting (optional)
        </p>
      )}
      {mode === 'monthly' && (
        <p className="font-mono" style={{
          fontSize: '0.7rem',
          color: pkg.accentColor,
          opacity: 0.6,
          marginTop: 6,
          letterSpacing: '0.05em',
        }}>
          Hosting included in plan
        </p>
      )}
    </div>
  );
};

/* ────── Main Component ────── */
const Pricing = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const [paymentMode, setPaymentMode] = useState('once-off');
  const [hoveredCard, setHoveredCard] = useState(null);
  const { isMobile } = useResponsive();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: headerRef.current, start: 'top 90%' },
        }
      );

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 80, scale: 0.92 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5, stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 90%' },
          }
        );
      }

      // Floating glow orb
      const orb = sectionRef.current?.querySelector('[data-orb]');
      if (orb) {
        gsap.to(orb, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="section-dark"
      style={{
        padding: isMobile ? '80px 0 100px' : '120px 0 140px',
        overflow: 'hidden',
        position: 'relative',
        ...sectionAccentStyle,
      }}
    >
      {/* Background orb */}
      {!isMobile && (
        <div data-orb="" style={{
          position: 'absolute',
          top: '15%',
          right: '-5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, rgba(129, 140, 248, 0.03) 50%, transparent 70%)`,
          pointerEvents: 'none',
          willChange: 'transform',
        }} />
      )}

      {/* Subtle grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.015) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* ═══ Header ═══ */}
        <div ref={headerRef} style={{ opacity: 0, textAlign: 'center', marginBottom: isMobile ? 40 : 60 }}>
          <p className="font-mono" style={{
            color: CYAN,
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            {'// '}Transparent Pricing
          </p>

          <h2 className="font-heading" style={{
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: 16,
          }}>
            <span style={{ color: 'var(--text-primary)' }}>Investment in Your </span>
            <span style={{
              background: `linear-gradient(135deg, ${CYAN}, ${INDIGO})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Digital Presence
            </span>
          </h2>

          <p className="font-body" style={{
            color: 'var(--text-secondary)',
            fontSize: isMobile ? '0.9rem' : '1rem',
            maxWidth: 520,
            margin: '0 auto 32px',
            lineHeight: 1.7,
          }}>
            No hidden costs. No lock-in contracts. Choose how you want to pay —
            once-off ownership or a manageable monthly plan. Hosting is available as an add-on or included in your plan.
          </p>

          {/* Toggle */}
          <PaymentToggle mode={paymentMode} setMode={setPaymentMode} />
        </div>

        {/* ═══ Cards Grid ═══ */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? 16 : 20,
            alignItems: 'start',
          }}
        >
          {PACKAGES.map((pkg, i) => {
            const isHovered = hoveredCard === i;
            const isPopular = pkg.popular;

            return (
              <div
                key={pkg.id}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: 'relative',
                  background: isPopular
                    ? `linear-gradient(145deg, rgba(129,140,248,0.08), rgba(56,189,248,0.03), var(--bg-card))`
                    : 'var(--bg-card)',
                  border: `1px solid ${isHovered || isPopular
                    ? `rgba(${pkg.accentRGB}, 0.35)`
                    : 'var(--border-subtle)'}`,
                  borderRadius: 24,
                  padding: isMobile ? '28px 24px' : '36px 32px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isHovered
                    ? `0 0 30px rgba(${pkg.accentRGB}, 0.12), 0 0 80px rgba(${pkg.accentRGB}, 0.05)`
                    : isPopular
                      ? `0 0 20px rgba(${pkg.accentRGB}, 0.08)`
                      : 'none',
                  transform: isHovered ? 'translateY(-6px)' : isPopular && !isMobile ? 'translateY(-8px)' : 'none',
                  overflow: 'hidden',
                  marginTop: isPopular && !isMobile ? 0 : 0,
                }}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, transparent, ${CYAN}, ${INDIGO}, transparent)`,
                  }} />
                )}

                {/* Hex decoration */}
                <HexGrid color={pkg.accentColor} opacity={isHovered ? 0.07 : 0.03} />

                {/* Tag */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}>
                  <span className="font-mono" style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: pkg.accentColor,
                    opacity: isPopular ? 1 : 0.7,
                  }}>
                    {pkg.tag}
                  </span>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: 11,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `rgba(${pkg.accentRGB}, 0.1)`,
                    border: `1px solid rgba(${pkg.accentRGB}, 0.15)`,
                  }}>
                    <pkg.Icon size={17} style={{ color: pkg.accentColor }} />
                  </div>
                </div>

                {/* Name + tagline */}
                <h3 className="font-heading" style={{
                  fontSize: isMobile ? '1.3rem' : '1.5rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: 6,
                  lineHeight: 1.2,
                }}>
                  {pkg.name}
                </h3>
                <p className="font-body" style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  marginBottom: 24,
                  lineHeight: 1.5,
                }}>
                  {pkg.tagline}
                </p>

                {/* Price */}
                <PriceDisplay pkg={pkg} mode={paymentMode} />

                {/* Divider */}
                <div style={{
                  height: 1,
                  background: `linear-gradient(90deg, rgba(${pkg.accentRGB}, 0.2), transparent)`,
                  margin: '24px 0',
                }} />

                {/* Features */}
                <p className="font-mono" style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: 14,
                  fontWeight: 600,
                }}>
                  What's Included
                </p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                  {pkg.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{
                        width: 18,
                        height: 18,
                        borderRadius: 6,
                        background: `rgba(${pkg.accentRGB}, 0.1)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 1,
                      }}>
                        <Check size={10} style={{ color: pkg.accentColor }} />
                      </div>
                      <span className="font-body" style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.4,
                      }}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Hosting add-on */}
                <div style={{
                  background: `rgba(${pkg.accentRGB}, 0.04)`,
                  border: `1px solid rgba(${pkg.accentRGB}, 0.1)`,
                  borderRadius: 14,
                  padding: '16px 18px',
                  marginBottom: 28,
                }}>
                  <p className="font-mono" style={{
                    fontSize: '0.62rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: pkg.accentColor,
                    opacity: 0.75,
                    marginBottom: 10,
                    fontWeight: 600,
                  }}>
                    {paymentMode === 'monthly' ? '✓ Hosting Included' : `Hosting Add-on${pkg.hostingFee ? ` — R${pkg.hostingFee}/mo` : ''}`}
                  </p>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {pkg.hosting.map(h => (
                      <li key={h} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Star size={8} style={{ color: pkg.accentColor, opacity: 0.6, flexShrink: 0 }} />
                        <span className="font-body" style={{
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                        }}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    width: '100%',
                    padding: '14px 24px',
                    borderRadius: 13,
                    textDecoration: 'none',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    letterSpacing: '0.02em',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    ...(isPopular ? {
                      background: `linear-gradient(135deg, ${INDIGO}, ${CYAN})`,
                      color: '#0a0a0a',
                      boxShadow: isHovered ? `0 0 28px rgba(129, 140, 248, 0.5)` : `0 0 16px rgba(129, 140, 248, 0.25)`,
                    } : {
                      background: `rgba(${pkg.accentRGB}, 0.08)`,
                      color: pkg.accentColor,
                      border: `1px solid rgba(${pkg.accentRGB}, 0.25)`,
                      boxShadow: isHovered ? `0 0 20px rgba(${pkg.accentRGB}, 0.15)` : 'none',
                    }),
                  }}
                >
                  {pkg.cta}
                  <ArrowRight size={15} style={{
                    transition: 'transform 0.3s',
                    transform: isHovered ? 'translateX(3px)' : 'none',
                  }} />
                </a>
              </div>
            );
          })}
        </div>

        {/* ═══ Bottom Note ═══ */}
        <div style={{
          marginTop: isMobile ? 48 : 72,
          textAlign: 'center',
          padding: isMobile ? '28px 24px' : '36px 48px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 20,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Top accent line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: 1,
            background: `linear-gradient(90deg, transparent, ${CYAN}, ${INDIGO}, transparent)`,
          }} />

          <p className="font-mono" style={{
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: CYAN,
            opacity: 0.7,
            marginBottom: 12,
          }}>
            Good to Know
          </p>

          <p className="font-body" style={{
            color: 'var(--text-secondary)',
            fontSize: isMobile ? '0.85rem' : '0.95rem',
            lineHeight: 1.8,
            maxWidth: 700,
            margin: '0 auto 24px',
          }}>
            All packages are fully custom — no templates. Monthly plans spread the build cost over time with hosting built in.
            Once-off payments give you full ownership of the site, with optional hosting as an add-on.
            Not sure which fits? <strong style={{ color: 'var(--text-primary)' }}>Let's chat — the first consultation is free.</strong>
          </p>

          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '13px 32px',
              borderRadius: 12,
              textDecoration: 'none',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '0.9rem',
              background: `linear-gradient(135deg, ${CYAN}, ${NEON})`,
              color: '#0a0a0a',
              boxShadow: `0 0 24px rgba(56, 189, 248, 0.25)`,
              transition: 'all 0.3s ease',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 0 40px rgba(56, 189, 248, 0.45)`;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = `0 0 24px rgba(56, 189, 248, 0.25)`;
              e.currentTarget.style.transform = 'none';
            }}
          >
            Book a Free Consultation
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
