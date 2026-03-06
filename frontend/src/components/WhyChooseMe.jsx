import React, { useEffect, useRef } from 'react';
import { Zap, MessageSquare, Sparkles, DollarSign } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useResponsive from '../hooks/use-responsive';

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    icon: Zap,
    title: "Lightning-Fast Delivery",
    description: "Your website will be ready in days, not months. I work efficiently without compromising quality.",
    highlight: "Get online quickly and start attracting customers"
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    description: "No confusing tech talk. I keep you updated every step of the way and respond within hours.",
    highlight: "Always know what's happening with your project"
  },
  {
    icon: Sparkles,
    title: "Stunning Design",
    description: "Your website won't just work well — it'll look amazing. Modern, professional designs that impress.",
    highlight: "Stand out and make a lasting impression"
  },
  {
    icon: DollarSign,
    title: "Best Value for Money",
    description: "Premium quality at competitive prices. No hidden fees, no surprises. A website that fits your budget.",
    highlight: "Affordable excellence for your business"
  }
];

const WhyChooseMe = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const { isMobile } = useResponsive();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      });

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(cards, { opacity: 0, y: 60, scale: 0.95 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        });
      }

      // Parallax glow blob
      const glow = sectionRef.current?.querySelector('[data-parallax-glow]');
      if (glow) {
        gsap.to(glow, {
          y: -50,
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
      id="why-choose-me"
      ref={sectionRef}
      className="section-dark"
      style={{ padding: isMobile ? '80px 0' : '120px 0', overflow: 'hidden' }}
    >
      {/* Subtle glow accents — parallax */}
      <div data-parallax-glow="" style={{
        position: 'absolute',
        top: '30%',
        left: '5%',
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.04) 0%, transparent 60%)',
        pointerEvents: 'none',
        willChange: 'transform',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div ref={headerRef} style={{ opacity: 0, textAlign: 'center', marginBottom: isMobile ? 40 : 64 }}>
          <p className="font-mono" style={{
            color: 'var(--accent-why)',
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            {'// '}Why Me
          </p>
          <h2 className="font-heading" style={{
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}>
            <span style={{ color: 'var(--text-primary)' }}>Why Choose </span>
            <span style={{
              background: `linear-gradient(135deg, var(--accent-why), #a78bfa)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Me</span>
          </h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 16,
          }}>
            <div style={{ height: 1, width: 48, background: 'linear-gradient(to right, transparent, var(--accent-why))' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-why)', boxShadow: '0 0 8px var(--accent-why)' }} />
            <div style={{ height: 1, width: 48, background: 'linear-gradient(to left, transparent, var(--accent-why))' }} />
          </div>
          <p className="font-body" style={{
            color: 'var(--text-muted)',
            fontSize: '1rem',
            maxWidth: 500,
            margin: '0 auto',
          }}>
            I don't just build websites — I help businesses thrive online.
          </p>
        </div>

        {/* Cards Grid — 2×2 on desktop, 1 col on mobile */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? 16 : 20,
          }}
        >
          {REASONS.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <div
                key={index}
                className="card-glass"
                style={{ padding: isMobile ? 22 : 28, display: 'flex', flexDirection: 'column', gap: isMobile ? 12 : 16 }}
              >
                {/* Icon */}
                <div style={{
                  width: isMobile ? 44 : 52,
                  height: isMobile ? 44 : 52,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(191, 0, 255, 0.12), rgba(168, 85, 247, 0.12))',
                  border: '1px solid rgba(191, 0, 255, 0.15)',
                }}>
                  <IconComponent size={isMobile ? 18 : 22} style={{ color: 'var(--accent-primary)' }} />
                </div>

                {/* Title */}
                <h3 className="font-heading" style={{
                  fontSize: isMobile ? '1.05rem' : '1.15rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}>
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="font-body" style={{
                  color: 'var(--text-secondary)',
                  fontSize: isMobile ? '0.85rem' : '0.9rem',
                  lineHeight: 1.65,
                }}>
                  {reason.description}
                </p>

                {/* Highlight box */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: isMobile ? '8px 12px' : '10px 14px',
                  borderRadius: 10,
                  background: 'rgba(191, 0, 255, 0.04)',
                  borderLeft: '3px solid var(--accent-primary)',
                }}>
                  <svg
                    width="16" height="16"
                    viewBox="0 0 20 20"
                    fill="var(--accent-primary)"
                    style={{ flexShrink: 0 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="font-body" style={{
                    fontSize: isMobile ? '0.75rem' : '0.8rem',
                    fontWeight: 600,
                    color: 'var(--accent-primary)',
                    lineHeight: 1.4,
                  }}>
                    {reason.highlight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMe;
