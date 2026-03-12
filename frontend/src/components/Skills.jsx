import React, { useEffect, useRef } from 'react';
import { Code2, Database, Settings, Palette } from 'lucide-react';
import { portfolioData } from '../mock';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useResponsive from '../hooks/use-responsive';
import makeSectionAccent from '../utils/makeSectionAccent';

gsap.registerPlugin(ScrollTrigger);

/* ────── Accent ────── */
const INDIGO = '#6366f1';
const sectionAccentStyle = makeSectionAccent(99, 102, 241);

const iconMap = { Code2, Database, Settings, Palette };

const Skills = () => {
  const { skills } = portfolioData;
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const { isMobile } = useResponsive();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: headerRef.current, start: 'top 100%' },
      });

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(cards, { opacity: 0, y: 60, scale: 0.95 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 100%' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-dark"
      style={{ padding: isMobile ? '80px 0' : '120px 0', overflow: 'hidden', ...sectionAccentStyle }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div ref={headerRef} style={{ opacity: 0, textAlign: 'center', marginBottom: isMobile ? 40 : 64 }}>
          <p className="font-mono" style={{
            color: INDIGO,
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            {'// '}What I Provide
          </p>
          <h2 className="font-heading" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}>
            <span style={{ color: 'var(--text-primary)' }}>My </span>
            <span style={{
              background: `linear-gradient(135deg, ${INDIGO}, #818cf8)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Expertise</span>
          </h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 16,
          }}>
            <div style={{ height: 1, width: 48, background: `linear-gradient(to right, transparent, ${INDIGO})` }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: INDIGO, boxShadow: `0 0 8px ${INDIGO}` }} />
            <div style={{ height: 1, width: 48, background: `linear-gradient(to left, transparent, ${INDIGO})` }} />
          </div>
          <p className="font-body" style={{
            color: 'var(--text-muted)',
            fontSize: '1rem',
            maxWidth: 500,
            margin: '0 auto',
          }}>
            Skills that elevate your business and make your life easier.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
            gap: 20,
          }}
        >
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon];
            return (
              <div
                key={index}
                className="card-glass"
                style={{
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(129, 140, 248, 0.1))`,
                  border: `1px solid rgba(99, 102, 241, 0.15)`,
                }}>
                  <IconComponent size={22} style={{ color: INDIGO }} />
                </div>

                {/* Title */}
                <h3 className="font-heading" style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}>
                  {skill.category}
                </h3>

                {/* Tech tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {skill.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="font-mono"
                      style={{
                        padding: '4px 12px',
                        borderRadius: 999,
                        fontSize: '0.72rem',
                        fontWeight: 500,
                        color: INDIGO,
                        background: 'rgba(99, 102, 241, 0.06)',
                        border: '1px solid rgba(99, 102, 241, 0.1)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
