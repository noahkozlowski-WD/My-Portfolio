import React, { useEffect, useRef, useState } from 'react';
import { Check, Rocket, Sparkles, ArrowRight, Star, Server } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useResponsive from '../hooks/use-responsive';
import makeSectionAccent from '../utils/makeSectionAccent';

gsap.registerPlugin(ScrollTrigger);

/* ────── Neon Pink palette ────── */
const PINK = '#ff2d7c';
const MAGENTA = '#d946ef';
const PINK_RGB = '255, 45, 124';
const MAGENTA_RGB = '217, 70, 239';
const sectionAccentStyle = makeSectionAccent(255, 45, 124);

/* ────── Pricing data — 2 tiers ────── */
const PACKAGES = [
  {
    id: 'launchpad',
    tag: 'Essential',
    name: 'LaunchPad',
    tagline: 'Everything you need to go live — fast, clean, and professional.',
    Icon: Rocket,
    accentColor: PINK,
    accentRGB: PINK_RGB,
    once: 3500,
    hostingFee: 250,
    installmentMonths: 6,
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
    id: 'ascend',
    tag: '⚡ Recommended',
    name: 'Ascend',
    tagline: 'Premium experience — designed to convert and built to scale.',
    Icon: Sparkles,
    accentColor: MAGENTA,
    accentRGB: MAGENTA_RGB,
    once: 6500,
    hostingFee: 350,
    installmentMonths: 6,
    features: [
      'Everything in LaunchPad, plus:',
      'Up to 10 custom pages',
      'Premium UI/UX design',
      'Advanced animations & interactions',
      'Full SEO optimisation',
      'Blog or portfolio section',
      'Analytics & performance setup',
      'CTA & conversion-focused layout',
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
];

/* ────── Decorative circuit-style SVG ────── */
const CircuitLines = ({ color, opacity = 0.04 }) => (
  <svg
    style={{ position: 'absolute', bottom: 0, right: 0, pointerEvents: 'none', opacity }}
    width="200" height="200" viewBox="0 0 200 200" fill="none"
  >
    <line x1="20" y1="40" x2="120" y2="40" stroke={color} strokeWidth="0.5" />
    <line x1="60" y1="80" x2="180" y2="80" stroke={color} strokeWidth="0.5" />
    <line x1="30" y1="120" x2="150" y2="120" stroke={color} strokeWidth="0.5" />
    <line x1="80" y1="160" x2="190" y2="160" stroke={color} strokeWidth="0.5" />
    <circle cx="120" cy="40" r="3" fill={color} opacity="0.3" />
    <circle cx="60" cy="80" r="2" fill={color} opacity="0.2" />
    <circle cx="150" cy="120" r="3" fill={color} opacity="0.3" />
    <circle cx="80" cy="160" r="2" fill={color} opacity="0.2" />
    <line x1="120" y1="40" x2="120" y2="80" stroke={color} strokeWidth="0.5" strokeDasharray="4 4" />
    <line x1="150" y1="80" x2="150" y2="120" stroke={color} strokeWidth="0.5" strokeDasharray="4 4" />
  </svg>
);

/* ────── Payment Toggle ────── */
const PaymentToggle = ({ mode, setMode }) => (
  <div style={{
    display: 'inline-flex',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 14,
    padding: 4,
    gap: 4,
    backdropFilter: 'blur(8px)',
  }}>
    {['once-off', 'monthly'].map(m => (
      <button
        key={m}
        onClick={() => setMode(m)}
        style={{
          padding: '11px 28px',
          borderRadius: 10,
          border: 'none',
          cursor: 'pointer',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: '0.85rem',
          letterSpacing: '0.01em',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          background: mode === m
            ? `linear-gradient(135deg, ${PINK}, ${MAGENTA})`
            : 'transparent',
          color: mode === m ? '#ffffff' : 'var(--text-secondary)',
          boxShadow: mode === m
            ? `0 0 24px rgba(${PINK_RGB}, 0.35), 0 0 60px rgba(${PINK_RGB}, 0.1)`
            : 'none',
        }}
      >
        {m === 'once-off' ? 'Once-Off' : 'Monthly Plan'}
      </button>
    ))}
  </div>
);

/* ────── Price Display ────── */
const PriceDisplay = ({ pkg, mode }) => {
  const monthlyTotal = Math.ceil(pkg.once / pkg.installmentMonths) + pkg.hostingFee;

  return (
    <div style={{ minHeight: 80 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span className="font-mono" style={{
          fontSize: '1rem',
          fontWeight: 500,
          color: pkg.accentColor,
          opacity: 0.8,
        }}>R</span>
        <span className="font-heading" style={{
          fontSize: 'clamp(2.4rem, 4.5vw, 3.2rem)',
          fontWeight: 800,
          background: `linear-gradient(135deg, ${pkg.accentColor}, ${pkg.accentColor}cc)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
        }}>
          {mode === 'once-off'
            ? pkg.once.toLocaleString()
            : monthlyTotal.toLocaleString()
          }
        </span>
        <span className="font-body" style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          marginLeft: 2,
        }}>
          {mode === 'once-off' ? 'once-off' : '/mo'}
        </span>
      </div>

      {mode === 'once-off' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
          <Server size={12} style={{ color: pkg.accentColor, opacity: 0.6 }} />
          <p className="font-mono" style={{
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.04em',
          }}>
            + R{pkg.hostingFee}/mo hosting add-on
          </p>
        </div>
      )}
      {mode === 'monthly' && (
        <div style={{ marginTop: 8 }}>
          <p className="font-mono" style={{
            fontSize: '0.68rem',
            color: pkg.accentColor,
            opacity: 0.65,
            letterSpacing: '0.04em',
          }}>
            6-month plan · hosting included
          </p>
          <p className="font-mono" style={{
            fontSize: '0.62rem',
            color: 'var(--text-muted)',
            marginTop: 4,
            letterSpacing: '0.03em',
          }}>
            R{Math.ceil(pkg.once / pkg.installmentMonths).toLocaleString()} build
            {' '}+ R{pkg.hostingFee} hosting = R{monthlyTotal.toLocaleString()}/mo
          </p>
        </div>
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
            duration: 0.5, stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 90%' },
          }
        );
      }

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
      {/* Background neon pink orb */}
      {!isMobile && (
        <div data-orb="" style={{
          position: 'absolute',
          top: '10%',
          right: '-8%',
          width: 550,
          height: 550,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${PINK_RGB}, 0.06) 0%, rgba(${MAGENTA_RGB}, 0.03) 40%, transparent 65%)`,
          pointerEvents: 'none',
          willChange: 'transform',
        }} />
      )}

      {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${MAGENTA_RGB}, 0.04) 0%, transparent 60%)`,
          pointerEvents: 'none',
        }} />
      )}

      {/* Subtle grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(rgba(${PINK_RGB}, 0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(${PINK_RGB}, 0.012) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* Header */}
        <div ref={headerRef} style={{ opacity: 0, textAlign: 'center', marginBottom: isMobile ? 40 : 60 }}>
          <p className="font-mono" style={{
            color: PINK,
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
              background: `linear-gradient(135deg, ${PINK}, ${MAGENTA})`,
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
            maxWidth: 560,
            margin: '0 auto 32px',
            lineHeight: 1.7,
          }}>
            No hidden costs. No lock-in contracts. Pay once and own it, or
            spread it over 6 months with hosting included. Your choice.
          </p>

          <PaymentToggle mode={paymentMode} setMode={setPaymentMode} />
        </div>

        {/* Cards Grid — 2 columns */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? 20 : 28,
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
                    ? `linear-gradient(145deg, rgba(${MAGENTA_RGB}, 0.07), rgba(${PINK_RGB}, 0.03), var(--bg-card))`
                    : 'var(--bg-card)',
                  border: `1px solid ${isHovered || isPopular
                    ? `rgba(${pkg.accentRGB}, 0.35)`
                    : 'var(--border-subtle)'}`,
                  borderRadius: 24,
                  padding: isMobile ? '30px 24px' : '40px 36px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isHovered
                    ? `0 0 40px rgba(${pkg.accentRGB}, 0.15), 0 0 80px rgba(${pkg.accentRGB}, 0.06)`
                    : isPopular
                      ? `0 0 25px rgba(${pkg.accentRGB}, 0.08)`
                      : 'none',
                  transform: isHovered
                    ? 'translateY(-8px)'
                    : isPopular && !isMobile
                      ? 'translateY(-4px)'
                      : 'none',
                  overflow: 'hidden',
                }}
              >
                {isPopular && (
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, transparent, ${PINK}, ${MAGENTA}, transparent)`,
                  }} />
                )}

                <CircuitLines color={pkg.accentColor} opacity={isHovered ? 0.08 : 0.04} />

                {/* Tag + Icon */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 22,
                }}>
                  <span className="font-mono" style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: pkg.accentColor,
                    opacity: isPopular ? 1 : 0.75,
                  }}>
                    {pkg.tag}
                  </span>
                  <div style={{
                    width: 42, height: 42,
                    borderRadius: 13,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `rgba(${pkg.accentRGB}, 0.1)`,
                    border: `1px solid rgba(${pkg.accentRGB}, 0.18)`,
                    transition: 'all 0.3s',
                    boxShadow: isHovered ? `0 0 16px rgba(${pkg.accentRGB}, 0.2)` : 'none',
                  }}>
                    <pkg.Icon size={19} style={{ color: pkg.accentColor }} />
                  </div>
                </div>

                {/* Name + tagline */}
                <h3 className="font-heading" style={{
                  fontSize: isMobile ? '1.4rem' : '1.65rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: 8,
                  lineHeight: 1.2,
                }}>
                  {pkg.name}
                </h3>
                <p className="font-body" style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  marginBottom: 28,
                  lineHeight: 1.5,
                }}>
                  {pkg.tagline}
                </p>

                <PriceDisplay pkg={pkg} mode={paymentMode} />

                {/* Divider */}
                <div style={{
                  height: 1,
                  background: `linear-gradient(90deg, rgba(${pkg.accentRGB}, 0.25), transparent)`,
                  margin: '28px 0',
                }} />

                {/* Features */}
                <p className="font-mono" style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: 16,
                  fontWeight: 600,
                }}>
                  What's Included
                </p>
                <ul style={{
                  listStyle: 'none', margin: 0, padding: 0,
                  display: 'flex', flexDirection: 'column', gap: 11,
                  marginBottom: 28,
                }}>
                  {pkg.features.map((f, fi) => {
                    const isEverythingLine = f.startsWith('Everything in');
                    return (
                      <li key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <div style={{
                          width: 20, height: 20,
                          borderRadius: 7,
                          background: isEverythingLine
                            ? `linear-gradient(135deg, rgba(${PINK_RGB}, 0.15), rgba(${MAGENTA_RGB}, 0.15))`
                            : `rgba(${pkg.accentRGB}, 0.1)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: 1,
                        }}>
                          <Check size={11} style={{ color: pkg.accentColor }} />
                        </div>
                        <span className="font-body" style={{
                          fontSize: '0.88rem',
                          color: isEverythingLine ? pkg.accentColor : 'var(--text-secondary)',
                          lineHeight: 1.45,
                          fontWeight: isEverythingLine ? 600 : 400,
                        }}>{f}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* Hosting add-on card */}
                <div style={{
                  background: `linear-gradient(135deg, rgba(${pkg.accentRGB}, 0.05), rgba(${pkg.accentRGB}, 0.02))`,
                  border: `1px solid rgba(${pkg.accentRGB}, 0.12)`,
                  borderRadius: 16,
                  padding: '18px 20px',
                  marginBottom: 32,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <Server size={13} style={{ color: pkg.accentColor, opacity: 0.8 }} />
                    <p className="font-mono" style={{
                      fontSize: '0.63rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: pkg.accentColor,
                      opacity: 0.8,
                      fontWeight: 600,
                    }}>
                      {paymentMode === 'monthly'
                        ? '✓ Hosting Included'
                        : `Hosting Add-on — R${pkg.hostingFee}/mo`}
                    </p>
                  </div>
                  <ul style={{
                    listStyle: 'none', margin: 0, padding: 0,
                    display: 'flex', flexDirection: 'column', gap: 8,
                  }}>
                    {pkg.hosting.map(h => (
                      <li key={h} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Star size={8} style={{ color: pkg.accentColor, opacity: 0.5, flexShrink: 0 }} />
                        <span className="font-body" style={{
                          fontSize: '0.8rem',
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
                    padding: '15px 24px',
                    borderRadius: 14,
                    textDecoration: 'none',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    letterSpacing: '0.02em',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    ...(isPopular ? {
                      background: `linear-gradient(135deg, ${PINK}, ${MAGENTA})`,
                      color: '#ffffff',
                      boxShadow: isHovered
                        ? `0 0 32px rgba(${PINK_RGB}, 0.5), 0 0 60px rgba(${MAGENTA_RGB}, 0.15)`
                        : `0 0 20px rgba(${PINK_RGB}, 0.25)`,
                    } : {
                      background: `rgba(${pkg.accentRGB}, 0.08)`,
                      color: pkg.accentColor,
                      border: `1px solid rgba(${pkg.accentRGB}, 0.28)`,
                      boxShadow: isHovered
                        ? `0 0 24px rgba(${pkg.accentRGB}, 0.18)`
                        : 'none',
                    }),
                  }}
                >
                  {pkg.cta}
                  <ArrowRight size={15} style={{
                    transition: 'transform 0.3s',
                    transform: isHovered ? 'translateX(4px)' : 'none',
                  }} />
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
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
          <div style={{
            position: 'absolute',
            top: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: '60%', height: 1,
            background: `linear-gradient(90deg, transparent, ${PINK}, ${MAGENTA}, transparent)`,
          }} />

          <p className="font-mono" style={{
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: PINK,
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
            Every site is fully custom — no templates, ever. Monthly plans split
            the build cost over 6 months with hosting built in. Once-off gives you
            full ownership with optional hosting as an add-on.
            Not sure which path?{' '}
            <strong style={{ color: 'var(--text-primary)' }}>
              Let's chat — the first consultation is always free.
            </strong>
          </p>

          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 34px',
              borderRadius: 13,
              textDecoration: 'none',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '0.9rem',
              background: `linear-gradient(135deg, ${PINK}, ${MAGENTA})`,
              color: '#ffffff',
              boxShadow: `0 0 24px rgba(${PINK_RGB}, 0.25)`,
              transition: 'all 0.3s ease',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 0 40px rgba(${PINK_RGB}, 0.45), 0 0 80px rgba(${MAGENTA_RGB}, 0.15)`;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = `0 0 24px rgba(${PINK_RGB}, 0.25)`;
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
