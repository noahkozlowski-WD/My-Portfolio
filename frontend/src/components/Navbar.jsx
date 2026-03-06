import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import useResponsive from '../hooks/use-responsive';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { isMobile } = useResponsive();
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Services', id: 'services' },
    { name: 'Process', id: 'process' },
    { name: 'Why Me', id: 'why-choose-me' },
  ];

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    if (!isMobile) setIsMobileMenuOpen(false);
  }, [isMobile]);

  // Scroll direction detection & progress optimized with requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);

      // Hide/Show navbar logic
      if (currentY > lastScrollY.current && currentY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;

      // Scroll Progress logic
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? (currentY / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    updateScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate navbar hide/show
  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        yPercent: hidden ? -100 : 0,
        duration: 0.4,
        ease: 'power2.inOut',
      });
    }
  }, [hidden]);

  // Active section detection
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.id);
    const observers = [];

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(observerCallback, {
          rootMargin: '-40% 0px -55% 0px',
          threshold: 0,
        });
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => observers.forEach(o => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.4s, backdrop-filter 0.4s, box-shadow 0.4s',
        background: isScrolled || isMobileMenuOpen ? (isMobile ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0.85)') : 'transparent',
        backdropFilter: isScrolled || isMobileMenuOpen ? (isMobile ? 'blur(8px) saturate(150%)' : 'blur(20px) saturate(180%)') : 'none',
        WebkitBackdropFilter: isScrolled || isMobileMenuOpen ? (isMobile ? 'blur(8px) saturate(150%)' : 'blur(20px) saturate(180%)') : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        willChange: 'transform, background-color',
      }}>
      {/* Global Scroll Progress Bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 2,
        background: `linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-skills) 100%)`,
        width: `${scrollProgress}%`,
        transition: 'width 0.1s ease-out',
        zIndex: 51,
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>

          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-heading"
            style={{
              fontSize: '1.6rem',
              fontWeight: 700,
              cursor: 'pointer',
              color: 'var(--accent-primary)',
              letterSpacing: '-0.02em',
              textShadow: '0 0 20px rgba(191, 0, 255, 0.4)',
              flexShrink: 0,
            }}
          >
            NK<span style={{ color: 'var(--text-muted)' }}>.</span>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="font-mono"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: 8,
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      cursor: 'pointer',
                      color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      transition: 'color 0.3s',
                      position: 'relative',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => !isActive && (e.target.style.color = 'var(--text-primary)')}
                    onMouseLeave={e => !isActive && (e.target.style.color = 'var(--text-secondary)')}
                  >
                    {link.name}
                    {isActive && (
                      <span style={{
                        position: 'absolute',
                        bottom: 2,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: 'var(--accent-primary)',
                        boxShadow: '0 0 8px var(--accent-primary)',
                      }} />
                    )}
                  </button>
                );
              })}
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-primary font-heading"
                style={{ marginLeft: 16, padding: '10px 24px', fontSize: '0.85rem' }}
              >
                Get In Touch
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobile && isMobileMenuOpen && (
          <div style={{
            padding: '16px 0 24px',
            borderTop: '1px solid var(--border-subtle)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="font-mono"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      textAlign: 'left',
                      padding: '12px 16px',
                      borderRadius: 8,
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      background: isActive ? 'rgba(191, 0, 255, 0.05)' : 'transparent',
                      color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {isActive && (
                      <span style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--accent-primary)',
                        boxShadow: '0 0 8px var(--accent-primary)',
                        flexShrink: 0,
                      }} />
                    )}
                    {link.name}
                  </button>
                );
              })}
              <div style={{ padding: '8px 16px' }}>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="btn-primary font-heading"
                  style={{ width: '100%', padding: '12px 24px', fontSize: '0.85rem' }}
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
