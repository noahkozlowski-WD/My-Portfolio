import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../mock';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useResponsive from '../hooks/use-responsive';

gsap.registerPlugin(ScrollTrigger);

const FLOAT_DOTS = [
  { x: '12%', y: '20%', size: 6 },
  { x: '85%', y: '25%', size: 8 },
  { x: '20%', y: '75%', size: 5 },
  { x: '78%', y: '70%', size: 7 },
  { x: '45%', y: '12%', size: 4 },
  { x: '65%', y: '85%', size: 6 },
  { x: '8%', y: '50%', size: 5 },
  { x: '92%', y: '48%', size: 4 },
];

const CODE_SYMBOLS = [
  { text: '</>', x: '8%', y: '30%', size: '1rem', rotate: -15 },
  { text: '{ }', x: '88%', y: '35%', size: '1.1rem', rotate: 12 },
  { text: '[ ]', x: '15%', y: '68%', size: '0.9rem', rotate: -8 },
  { text: '( )', x: '82%', y: '65%', size: '0.85rem', rotate: 20 },
  { text: '&&', x: '30%', y: '15%', size: '0.8rem', rotate: -5 },
  { text: '//', x: '70%', y: '82%', size: '0.9rem', rotate: 10 },
];

const Hero = () => {
  const { hero } = portfolioData;
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const taglineRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const gridRef = useRef(null);
  const graphicRef = useRef(null);
  const { isMobile } = useResponsive();

  const [typedText, setTypedText] = useState('');
  const fullText = hero.tagline;

  // Typing effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);
    return () => clearInterval(typingInterval);
  }, [fullText]);

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(gridRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 })
        .fromTo(
          graphicRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' },
          0
        )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: isMobile ? 40 : 80, skewY: isMobile ? 1 : 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.2 },
          0.3
        )
        .fromTo(taglineRef.current, { opacity: 0, y: isMobile ? 20 : 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.8)
        .fromTo(descRef.current, { opacity: 0, y: isMobile ? 15 : 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.1)
        .fromTo(ctaRef.current, { opacity: 0, y: isMobile ? 15 : 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.4)
        .fromTo(socialRef.current, { opacity: 0, y: isMobile ? 10 : 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.7);

      // Orbit rotations
      gsap.to('[data-orbit="1"]', { rotation: 360, duration: 80, repeat: -1, ease: 'none', transformOrigin: 'center center' });
      gsap.to('[data-orbit="2"]', { rotation: -360, duration: 60, repeat: -1, ease: 'none', transformOrigin: 'center center' });
      gsap.to('[data-orbit="3"]', { rotation: 360, duration: 100, repeat: -1, ease: 'none', transformOrigin: 'center center' });

      // Float dots
      gsap.utils.toArray('[data-float-dot]').forEach((dot, i) => {
        gsap.to(dot, {
          y: gsap.utils.random(-12, 12),
          x: gsap.utils.random(-8, 8),
          duration: gsap.utils.random(3, 5),
          repeat: -1, yoyo: true, ease: 'sine.inOut',
          delay: i * 0.3,
        });
      });

      // Float code symbols
      gsap.utils.toArray('[data-float-code]').forEach((el, i) => {
        gsap.to(el, {
          y: gsap.utils.random(-15, 15),
          duration: gsap.utils.random(4, 6),
          repeat: -1, yoyo: true, ease: 'sine.inOut',
          delay: i * 0.4,
        });
      });

      // Orbital graphic drifts up at 0.5× speed
      if (graphicRef.current) {
        gsap.to(graphicRef.current, {
          y: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
        paddingTop: isMobile ? 60 : 80,
      }}
    >
      {/* Dot grid + animated gradient mesh */}
      <div ref={gridRef} style={{ position: 'absolute', inset: 0, opacity: 0 }}>
        <div className="dot-grid" style={{ position: 'absolute', inset: 0 }} />

        {/* ═══ Gradient Mesh Blobs ═══ */}
        {!isMobile && (
          <div data-mesh-blob="" style={{
            position: 'absolute', top: '10%', left: '10%',
            width: 600, height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.05) 40%, transparent 60%)',
            animation: 'meshDrift1 15s ease-in-out infinite',
            pointerEvents: 'none',
            willChange: 'transform',
          }} />
        )}
        {!isMobile && (
          <div data-mesh-blob="" style={{
            position: 'absolute', bottom: '5%', right: '5%',
            width: 500, height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(168, 85, 247, 0.05) 40%, transparent 60%)',
            animation: 'meshDrift2 18s ease-in-out infinite',
            pointerEvents: 'none',
            willChange: 'transform',
          }} />
        )}
        {!isMobile && (
          <div data-mesh-blob="" style={{
            position: 'absolute', top: '40%', left: '50%',
            width: 400, height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217, 70, 239, 0.2) 0%, transparent 60%)',
            animation: 'meshDrift3 12s ease-in-out infinite',
            pointerEvents: 'none',
            willChange: 'transform',
          }} />
        )}

        {/* Noise texture overlay */}
        <div className="noise-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      </div>

      {/* ═══ HERO BACKGROUND GRAPHIC ═══ */}
      <div
        ref={graphicRef}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%', maxWidth: 850,
          height: '100%', maxHeight: 700,
          pointerEvents: 'none',
          opacity: 0,
        }}
      >
        {/* Orbital ring 1 — large */}
        <div data-orbit="1" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(550px, 80vw)', height: 'min(550px, 80vw)',
          borderRadius: '50%',
          border: `1px solid rgba(191, 0, 255, ${isMobile ? 0.28 : 0.4})`,
        }} />
        {/* Orbital ring 2 — medium, tilted */}
        <div data-orbit="2" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%) rotate(60deg)',
          width: 'min(420px, 62vw)', height: 'min(420px, 62vw)',
          borderRadius: '50%',
          border: `1px dashed rgba(168, 85, 247, ${isMobile ? 0.28 : 0.4})`,
        }} />
        {/* Orbital ring 3 — small */}
        <div data-orbit="3" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%) rotate(-30deg)',
          width: 'min(300px, 45vw)', height: 'min(300px, 45vw)',
          borderRadius: '50%',
          border: `1px solid rgba(217, 70, 239, ${isMobile ? 0.28 : 0.4})`,
        }} />

        {/* Floating dots */}
        {FLOAT_DOTS.map((dot, i) => (
          <div
            key={`dot-${i}`}
            data-float-dot=""
            style={{
              position: 'absolute', left: dot.x, top: dot.y,
              width: dot.size, height: dot.size,
              borderRadius: '50%',
              background: 'var(--accent-primary)',
              opacity: (0.6 + (i % 3) * 0.1) * (isMobile ? 0.6 : 1),
              boxShadow: `0 0 ${dot.size * 2}px rgba(191, 0, 255, ${isMobile ? 0.3 : 0.5})`,
            }}
          />
        ))}

        {/* Floating code symbols */}
        {CODE_SYMBOLS.map((sym, i) => (
          <span
            key={`code-${i}`}
            data-float-code=""
            className="font-mono"
            style={{
              position: 'absolute', left: sym.x, top: sym.y,
              fontSize: sym.size, color: 'var(--accent-primary)',
              opacity: isMobile ? 0.35 : 0.5, transform: `rotate(${sym.rotate}deg)`,
              fontWeight: 600, userSelect: 'none',
            }}
          >
            {sym.text}
          </span>
        ))}

        {/* Hexagon */}
        <svg data-float-code="" style={{ position: 'absolute', left: '25%', top: '22%', width: 40, height: 40, opacity: isMobile ? 0.28 : 0.4 }} viewBox="0 0 40 40">
          <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" />
        </svg>

        {/* Diamond */}
        <svg data-float-dot="" style={{ position: 'absolute', right: '22%', bottom: '28%', width: 30, height: 30, opacity: isMobile ? 0.35 : 0.5 }} viewBox="0 0 30 30">
          <rect x="4" y="4" width="22" height="22" fill="none" stroke="var(--accent-secondary)" strokeWidth="1.5" transform="rotate(45 15 15)" />
        </svg>

        {/* Triangle */}
        <svg data-float-code="" style={{ position: 'absolute', left: '72%', top: '18%', width: 35, height: 35, opacity: isMobile ? 0.25 : 0.36 }} viewBox="0 0 35 35">
          <polygon points="17.5,3 32,30 3,30" fill="none" stroke="var(--accent-tertiary)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div style={{
        maxWidth: 1080, margin: '0 auto', padding: isMobile ? '24px 16px' : '40px 24px',
        position: 'relative', zIndex: 10, textAlign: 'center',
      }}>
        {/* Greeting + Name */}
        <div ref={headingRef} style={{ opacity: 0 }}>
          <p className="font-mono" style={{
            color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 500,
            letterSpacing: '0.15em', marginBottom: 12, textTransform: 'uppercase',
          }}>
            {'// '}Hi, I'm
          </p>
          <h1 className="font-heading" style={{
            fontSize: 'clamp(3.5rem, 10vw, 8rem)', fontWeight: 700,
            lineHeight: 0.95, letterSpacing: '-0.03em',
            color: 'var(--text-primary)', marginBottom: 8,
          }}>
            {hero.name.split(' ').map((word, i) => (
              <span key={i}>
                {i === 1 ? (
                  <span className="gradient-text-accent">{word}</span>
                ) : word}
                {i === 0 ? ' ' : ''}
              </span>
            ))}
          </h1>
        </div>

        {/* Typed tagline */}
        <div ref={taglineRef} style={{ opacity: 0, minHeight: 52, marginTop: 24, marginBottom: 24 }}>
          <p className="font-heading" style={{
            fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontWeight: 500,
            color: 'var(--text-secondary)',
          }}>
            {typedText}
            <span className="animate-blink" style={{
              display: 'inline-block', width: 3, height: '1.1em',
              background: 'var(--accent-primary)', marginLeft: 4,
              verticalAlign: 'text-bottom', boxShadow: '0 0 8px var(--accent-primary)',
            }} />
          </p>
        </div>

        {/* Description */}
        <p ref={descRef} className="font-body" style={{
          opacity: 0, fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
          color: 'var(--text-muted)', maxWidth: 600,
          margin: `0 auto ${isMobile ? 40 : 32}px`, lineHeight: 1.7,
        }}>
          {hero.description}
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} style={{
          opacity: 0, display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'center',
          gap: 16, marginBottom: 48,
        }}>
          <button onClick={() => scrollToSection('services')} className="btn-primary font-heading"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            View Services <ArrowRight size={18} />
          </button>
          <button onClick={() => scrollToSection('contact')} className="btn-outline font-heading">
            Get In Touch
          </button>
        </div>

        {/* Social Icons */}
        <div ref={socialRef} style={{
          opacity: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 12,
        }}>
          {[
            { icon: Github, href: portfolioData.contact.social.github },
            { icon: Linkedin, href: portfolioData.contact.social.linkedin },
            { icon: Mail, href: `mailto:${portfolioData.contact.email}` },
          ].map(({ icon: Icon, href }, i) => (
            <a key={i} href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{
                width: 44, height: 44, borderRadius: 12, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', border: '1px solid var(--border-subtle)',
                background: 'rgba(255,255,255,0.02)', transition: 'all 0.3s', cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--accent-primary)';
                e.currentTarget.style.borderColor = 'rgba(191, 0, 255, 0.3)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(191, 0, 255, 0.15)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: -20, left: '50%',
          transform: 'translateX(-50%)', display: 'flex',
          flexDirection: 'column', alignItems: 'center', gap: 8,
        }}>
          <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em' }}>

          </span>
          <div style={{
            width: 1, height: 40,
            background: 'linear-gradient(to bottom, var(--accent-primary), transparent)',
            opacity: 0.5,
          }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
