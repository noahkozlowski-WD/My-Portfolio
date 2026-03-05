import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { portfolioData } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { contact } = portfolioData;

  const navSections = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Services', id: 'services' },
    { name: 'Process', id: 'process' },
    { name: 'Why Me', id: 'why-choose-me' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: contact.social.github },
    { icon: Linkedin, href: contact.social.linkedin },
    { icon: Mail, href: `mailto:${contact.email}` },
  ];

  return (
    <footer style={{
      background: 'var(--bg-primary)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Gradient accent line */}
      <div className="footer-gradient-line" />

      {/* Dot grid texture */}
      <div className="dot-grid" style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.5,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 0', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
          gap: 48,
        }}>

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              className="font-heading gradient-text-accent"
              style={{ fontSize: '1.5rem', fontWeight: 700 }}
            >
              Noah Kozlowski
            </div>
            <p className="font-body" style={{
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              lineHeight: 1.6,
              maxWidth: 260,
            }}>
              Full-stack web developer crafting fast, beautiful, and conversion-focused websites.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              {socialLinks.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-subtle)',
                    transition: 'all 0.3s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--accent-primary)';
                    e.currentTarget.style.borderColor = 'rgba(191, 0, 255, 0.2)';
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(191, 0, 255, 0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-mono" style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--text-muted)',
              marginBottom: 20,
            }}>
              Navigation
            </h3>
            <ul style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}>
              {navSections.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="font-body"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                      textAlign: 'left',
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent-primary)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-mono" style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--text-muted)',
              marginBottom: 20,
            }}>
              Contact
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a
                href={`mailto:${contact.email}`}
                className="font-body"
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--accent-primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >
                {contact.email}
              </a>
              <p className="font-body" style={{
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
              }}>
                Durban, South Africa
              </p>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-primary font-heading"
                style={{
                  padding: '10px 20px',
                  fontSize: '0.8rem',
                  marginTop: 8,
                  width: 'fit-content',
                }}
              >
                Start a Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div style={{
        textAlign: 'center',
        padding: '40px 24px 0',
        position: 'relative',
      }}>
        <p className="font-heading" style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          fontWeight: 600,
          color: 'var(--text-muted)',
          letterSpacing: '-0.01em',
        }}>
          Let's build something{' '}
          <span className="gradient-text-accent">great</span>.
        </p>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        marginTop: 32,
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <p className="font-mono" style={{
            color: 'var(--text-muted)',
            fontSize: '0.7rem',
            letterSpacing: '0.05em',
          }}>
            © {currentYear} Noah Kozlowski. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.7rem',
              cursor: 'pointer',
              transition: 'color 0.2s',
              fontFamily: "'JetBrains Mono', monospace",
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            Back to top
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
