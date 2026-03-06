import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../mock';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useResponsive from '../hooks/use-responsive';
import makeSectionAccent from '../utils/makeSectionAccent';

gsap.registerPlugin(ScrollTrigger);

/* ────── Accent ────── */
const VIOLET = '#8b5cf6';
const sectionAccentStyle = makeSectionAccent(139, 92, 246);

const TRAITS = [
  { label: 'Problem Solver', emoji: '⚡' },
  { label: 'Team Player', emoji: '🤝' },
  { label: 'Quick Learner', emoji: '🚀' },
  { label: 'Creative Thinker', emoji: '💡' },
];

const STATS = [
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Completed' },
];

const About = () => {
  const { about } = portfolioData;
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const storyRef = useRef(null);
  const journeyRef = useRef(null);
  const traitsRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);
  const { isMobile } = useResponsive();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(headerRef.current, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      });

      // Story block
      gsap.fromTo(storyRef.current, { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.8,
        scrollTrigger: { trigger: storyRef.current, start: 'top 80%' },
      });

      // Journey block
      gsap.fromTo(journeyRef.current, { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.8, delay: 0.2,
        scrollTrigger: { trigger: journeyRef.current, start: 'top 80%' },
      });

      // Trait pills stagger
      const pills = traitsRef.current?.children;
      if (pills) {
        gsap.fromTo(pills, { opacity: 0, y: 20, scale: 0.9 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1,
          scrollTrigger: { trigger: traitsRef.current, start: 'top 85%' },
        });
      }

      // Image parallax
      gsap.fromTo(imageRef.current, { opacity: 0, scale: 0.95, y: 40 }, {
        opacity: 1, scale: 1, y: 0, duration: 1,
        scrollTrigger: { trigger: imageRef.current, start: 'top 80%' },
      });

      // Stats counter animation
      const statEls = statsRef.current?.querySelectorAll('.stat-value');
      statEls?.forEach(el => {
        const target = parseInt(el.dataset.value);
        gsap.fromTo(el, { textContent: '0' }, {
          textContent: target,
          duration: 1.5,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: function () {
            el.textContent = Math.ceil(parseFloat(el.textContent)) + '+';
          },
        });
      });

      // Parallax glow blob
      const glow = sectionRef.current?.querySelector('[data-parallax-glow]');
      if (glow) {
        gsap.to(glow, {
          y: -60,
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
      id="about"
      ref={sectionRef}
      className="section-darker"
      style={{ padding: isMobile ? '80px 0' : '120px 0', overflow: 'hidden', ...sectionAccentStyle }}
    >
      {/* Parallax glow */}
      {!isMobile && (
        <div data-parallax-glow="" style={{
          position: 'absolute', top: '20%', right: '5%',
          width: 450, height: 450,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
          willChange: 'transform',
        }} />
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* Header */}
        <div ref={headerRef} style={{ opacity: 0, marginBottom: isMobile ? 40 : 64 }}>
          <p className="font-mono" style={{
            color: VIOLET,
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            {'// '}Get to know me
          </p>
          <h2 className="font-heading" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}>
            <span style={{ color: 'var(--text-primary)' }}>About </span>
            <span style={{
              background: `linear-gradient(135deg, ${VIOLET}, #a78bfa)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Me</span>
          </h2>
        </div>

        {/* Two column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
          gap: isMobile ? 40 : 64,
          alignItems: 'center',
        }}>

          {/* Left — text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Story */}
            <div ref={storyRef} style={{ opacity: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 3,
                  height: 28,
                  borderRadius: 2,
                  background: `linear-gradient(to bottom, ${VIOLET}, #7c3aed)`,
                }} />
                <h3 className="font-heading" style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}>
                  My Story
                </h3>
              </div>
              <p className="font-body" style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                lineHeight: 1.75,
                paddingLeft: 15,
              }}>
                {about.story}
              </p>
            </div>

            {/* Journey */}
            <div ref={journeyRef} style={{ opacity: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 3,
                  height: 28,
                  borderRadius: 2,
                  background: `linear-gradient(to bottom, #7c3aed, #5b21b6)`,
                }} />
                <h3 className="font-heading" style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                }}>
                  My Journey
                </h3>
              </div>
              <p className="font-body" style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                lineHeight: 1.75,
                paddingLeft: 15,
              }}>
                {about.history}
              </p>
            </div>

            {/* Trait pills */}
            <div ref={traitsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {TRAITS.map(({ label, emoji }) => (
                <span
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 16px',
                    borderRadius: 999,
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    color: VIOLET,
                    background: 'rgba(139, 92, 246, 0.06)',
                    border: '1px solid rgba(139, 92, 246, 0.12)',
                    transition: 'all 0.3s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.12)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span>{emoji}</span>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — image + stats */}
          <div ref={imageRef} style={{ opacity: 0 }}>
            <div style={{ position: 'relative' }}>

              {/* --- Decorative Tech Frame Behind Image --- */}
              <div style={{
                position: 'absolute',
                inset: 0,
                border: `1px dashed rgba(139, 92, 246, 0.3)`,
                borderRadius: 20,
                transform: 'translate(16px, 16px)',
                zIndex: 0,
                pointerEvents: 'none',
              }} />

              {/* Decorative Floating SVG Corner (Top Right) */}
              <svg style={{ position: 'absolute', top: -12, right: -12, width: 30, height: 30, opacity: 0.6, zIndex: 2 }} viewBox="0 0 30 30" fill="none">
                <path d="M30 0 H15 V2 H28 V15 H30 V0 Z" fill={VIOLET} />
              </svg>

              {/* Decorative Floating SVG Corner (Bottom Left) */}
              <svg style={{ position: 'absolute', bottom: -12, left: -12, width: 30, height: 30, opacity: 0.6, zIndex: 2 }} viewBox="0 0 30 30" fill="none">
                <path d="M0 30 H15 V28 H2 V15 H0 V30 Z" fill={VIOLET} />
              </svg>

              {/* Floating Code Badge */}
              <div style={{
                position: 'absolute',
                top: 30,
                left: -20,
                background: 'rgba(10,10,10,0.85)',
                backdropFilter: 'blur(8px)',
                padding: '6px 14px',
                borderRadius: 8,
                border: '1px solid rgba(139, 92, 246, 0.2)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                zIndex: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: VIOLET, boxShadow: `0 0 8px ${VIOLET}` }} />
                <span className="font-mono" style={{ fontSize: '0.75rem', color: VIOLET, letterSpacing: '0.05em' }}>_active</span>
              </div>

              {/* Image Container */}
              <div style={{
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
                zIndex: 1,
              }}>
                <img
                  src={about.image}
                  alt="Noah Kozlowski"
                  style={{
                    width: '100%',
                    height: 'clamp(300px, 40vw, 500px)',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                  }}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 50%)',
                }} />
                {/* Glow border effect */}
                <div style={{
                  position: 'absolute',
                  inset: -1,
                  borderRadius: 20,
                  border: '1px solid transparent',
                  background: `linear-gradient(135deg, rgba(99,102,241,0.15), transparent 50%, rgba(79,70,229,0.15)) border-box`,
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  pointerEvents: 'none',
                }} />
              </div>

              {/* Stats overlay */}
              <div
                ref={statsRef}
                style={{
                  display: 'flex',
                  gap: 12,
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  right: 16,
                }}
              >
                {STATS.map(({ value, label }) => (
                  <div
                    key={label}
                    style={{
                      flex: 1,
                      background: 'rgba(10, 10, 10, 0.8)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: 12,
                      padding: '16px 12px',
                      textAlign: 'center',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <p
                      className="stat-value font-heading glow-pulse"
                      data-value={parseInt(value)}
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: VIOLET,
                        marginBottom: 2,
                      }}
                    >
                      {value}
                    </p>
                    <p className="font-body" style={{
                      fontSize: '0.65rem',
                      color: 'var(--text-muted)',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
