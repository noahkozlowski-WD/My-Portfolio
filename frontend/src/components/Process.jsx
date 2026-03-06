import React, { useEffect, useRef } from 'react';
import { MessageCircle, Palette, Code, Rocket, HeadphonesIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useResponsive from '../hooks/use-responsive';
import makeSectionAccent from '../utils/makeSectionAccent';

gsap.registerPlugin(ScrollTrigger);

/* ────── Accent ────── */
const FUCHSIA = '#e879f9';
const sectionAccentStyle = makeSectionAccent(232, 121, 249);

const steps = [
  {
    icon: MessageCircle,
    number: '01',
    title: 'We Talk About Your Vision',
    description: "We'll have a conversation about your business goals, who you want to reach, and what success looks like. No jargon — just a friendly chat.",
    result: 'Clear understanding of your goals',
  },
  {
    icon: Palette,
    number: '02',
    title: 'I Create Your Design',
    description: "I'll design a website that reflects your brand. You'll see mockups and request changes until it's exactly what you want.",
    result: 'A beautiful design you love',
  },
  {
    icon: Code,
    number: '03',
    title: 'I Build Your Website',
    description: "Clean, professional code. Flawless on all devices, lightning fast. I'll keep you updated every step of the way.",
    result: 'A professional, fast website',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'We Launch Together',
    description: "Before going live, we test everything thoroughly. Once you're ready, I launch your site and make sure everything runs perfectly.",
    result: 'Your business is online and ready',
  },
  {
    icon: HeadphonesIcon,
    number: '05',
    title: 'Ongoing Support',
    description: "After launch, I don't disappear. Updates, questions, new features — I'm just a message away.",
    result: 'Ongoing support and peace of mind',
  },
];

const Process = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const hLineRef = useRef(null);
  const { isDesktop } = useResponsive();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(headerRef.current, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      });

      if (isDesktop) {
        // Horizontal line draw
        if (hLineRef.current) {
          gsap.fromTo(hLineRef.current, { scaleX: 0 }, {
            scaleX: 1, duration: 1.5, ease: 'power2.out',
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 75%',
              end: 'bottom 60%',
              scrub: 1,
            },
          });
        }

        // Step cards stagger horizontally
        const cards = timelineRef.current?.querySelectorAll('.process-step');
        if (cards) {
          gsap.fromTo(cards, { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: timelineRef.current, start: 'top 75%' },
          });
        }
      } else {
        // Vertical line draw
        if (lineRef.current) {
          gsap.fromTo(lineRef.current, { scaleY: 0 }, {
            scaleY: 1, duration: 1.5, ease: 'power2.out',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              end: 'bottom 60%',
              scrub: 1,
            },
          });
        }

        // Step cards vertical stagger
        const cards = timelineRef.current?.querySelectorAll('.process-step');
        if (cards) {
          gsap.fromTo(cards, { opacity: 0, x: 40 }, {
            opacity: 1, x: 0, duration: 0.7, stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: timelineRef.current, start: 'top 75%' },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  /* ═══════════════════════════════════════════
     DESKTOP — Horizontal Timeline
     ═══════════════════════════════════════════ */
  const renderDesktop = () => (
    <div ref={timelineRef} style={{ position: 'relative' }}>
      {/* Horizontal connecting line */}
      <div
        ref={hLineRef}
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          right: 24,
          height: 2,
          background: `linear-gradient(to right, ${FUCHSIA}, rgba(232, 121, 249, 0.3), rgba(232, 121, 249, 0.1))`,
          transformOrigin: 'left center',
          borderRadius: 1,
          zIndex: 0,
        }}
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
        gap: 16,
        position: 'relative',
        zIndex: 1,
      }}>
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div
              key={index}
              className="process-step"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
                opacity: 0,
              }}
            >
              {/* Icon circle */}
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, rgba(232, 121, 249, 0.15), rgba(52, 211, 153, 0.15))`,
                border: `2px solid rgba(232, 121, 249, 0.25)`,
                boxShadow: `0 0 15px rgba(232, 121, 249, 0.1), inset 0 0 15px rgba(232, 121, 249, 0.05)`,
                transition: 'all 0.3s',
                zIndex: 2,
                backdropFilter: 'blur(4px)',
              }}>
                <IconComponent size={18} style={{ color: FUCHSIA }} />
              </div>

              {/* Compact card */}
              <div className="card-glass" style={{
                padding: '16px 18px',
                textAlign: 'center',
                width: '100%',
              }}>
                {/* Number */}
                <span className="font-mono" style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: FUCHSIA,
                  opacity: 0.5,
                  display: 'block',
                  marginBottom: 8,
                }}>
                  {step.number}
                </span>

                {/* Title */}
                <h3 className="font-heading" style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1.3,
                  marginBottom: 10,
                }}>
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-body" style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  lineHeight: 1.6,
                  marginBottom: 12,
                }}>
                  {step.description}
                </p>

                {/* Result pill */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '5px 12px',
                  borderRadius: 8,
                  background: `rgba(232, 121, 249, 0.05)`,
                  border: `1px solid rgba(232, 121, 249, 0.1)`,
                }}>
                  <div style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: FUCHSIA,
                    boxShadow: `0 0 6px ${FUCHSIA}`,
                    flexShrink: 0,
                  }} />
                  <p className="font-body" style={{
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    color: FUCHSIA,
                  }}>
                    {step.result}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════
     MOBILE — Vertical Timeline (original)
     ═══════════════════════════════════════════ */
  const renderMobile = () => (
    <div ref={timelineRef} style={{ position: 'relative' }}>
      {/* Vertical line */}
      <div
        ref={lineRef}
        style={{
          position: 'absolute',
          left: 23,
          top: 24,
          bottom: 24,
          width: 2,
          background: `linear-gradient(to bottom, ${FUCHSIA}, rgba(232, 121, 249, 0.3), rgba(232, 121, 249, 0.1))`,
          transformOrigin: 'top center',
          borderRadius: 1,
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div
              key={index}
              className="process-step"
              style={{
                display: 'flex',
                gap: 20,
                alignItems: 'flex-start',
                opacity: 0,
              }}
            >
              {/* Step icon */}
              <div style={{ flexShrink: 0, zIndex: 10 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, rgba(232, 121, 249, 0.15), rgba(52, 211, 153, 0.15))`,
                  border: `2px solid rgba(232, 121, 249, 0.2)`,
                  boxShadow: `0 0 15px rgba(232, 121, 249, 0.1), inset 0 0 15px rgba(232, 121, 249, 0.05)`,
                  transition: 'all 0.3s',
                }}>
                  <IconComponent size={18} style={{ color: FUCHSIA }} />
                </div>
              </div>

              {/* Card */}
              <div className="card-glass" style={{
                flex: 1,
                padding: '20px 24px',
              }}>
                {/* Title row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 12,
                  marginBottom: 10,
                }}>
                  <h3 className="font-heading" style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: 1.3,
                  }}>
                    {step.title}
                  </h3>
                  <span className="font-mono" style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: FUCHSIA,
                    flexShrink: 0,
                    opacity: 0.6,
                  }}>
                    {step.number}
                  </span>
                </div>

                {/* Description */}
                <p className="font-body" style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem',
                  lineHeight: 1.65,
                  marginBottom: 14,
                }}>
                  {step.description}
                </p>

                {/* Result pill */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  borderRadius: 8,
                  background: `rgba(232, 121, 249, 0.05)`,
                  border: `1px solid rgba(232, 121, 249, 0.1)`,
                }}>
                  <div style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: FUCHSIA,
                    boxShadow: `0 0 6px ${FUCHSIA}`,
                    flexShrink: 0,
                  }} />
                  <p className="font-body" style={{
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    color: FUCHSIA,
                  }}>
                    {step.result}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-darker"
      style={{ padding: '120px 0', overflow: 'hidden', ...sectionAccentStyle }}
    >
      <div style={{ maxWidth: isDesktop ? 1200 : 800, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div ref={headerRef} style={{ opacity: 0, textAlign: 'center', marginBottom: 72 }}>
          <p className="font-mono" style={{
            color: FUCHSIA,
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            {'// '}How It Works
          </p>
          <h2 className="font-heading" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}>
            <span style={{ color: 'var(--text-primary)' }}>A Simple, </span>
            <span style={{
              background: `linear-gradient(135deg, ${FUCHSIA}, #f0abfc)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Transparent</span>
            <span style={{ color: 'var(--text-primary)' }}> Process</span>
          </h2>
          <p className="font-body" style={{
            color: 'var(--text-muted)',
            fontSize: '1rem',
            maxWidth: 480,
            margin: '0 auto',
          }}>
            Clear communication every step of the way.
          </p>
        </div>

        {/* Timeline — responsive */}
        {isDesktop ? renderDesktop() : renderMobile()}
      </div>
    </section>
  );
};

export default Process;
