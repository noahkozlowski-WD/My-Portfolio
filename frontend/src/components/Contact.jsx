import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { portfolioData } from '../mock';
import axios from 'axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useResponsive from '../hooks/use-responsive';
import makeSectionAccent from '../utils/makeSectionAccent';

gsap.registerPlugin(ScrollTrigger);

/* ────── Accent ────── */
const NEON_PURPLE = '#bf00ff';
const sectionAccentStyle = makeSectionAccent(191, 0, 255);

const BACKEND_URL = 'https://backend-noah.zeabur.app';
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const { contact } = portfolioData;
  const { toast } = useToast();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isMobile } = useResponsive();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: headerRef.current, start: 'top 100%' },
      });

      const columns = contentRef.current?.children;
      if (columns) {
        gsap.fromTo(columns, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.4, stagger: 0.1,
          scrollTrigger: { trigger: contentRef.current, start: 'top 100%' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.name.trim().length === 0) {
      toast({ title: 'Error', description: 'Name cannot be empty', variant: 'destructive', duration: 3000 });
      setIsSubmitting(false);
      return;
    }

    if (formData.message.trim().length < 10) {
      toast({ title: 'Error', description: 'Message must be at least 10 characters', variant: 'destructive', duration: 3000 });
      setIsSubmitting(false);
      return;
    }

    try {
      const dataToSend = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim()
      };

      const response = await axios.post(`${API}/contact`, dataToSend);

      if (response.data.success) {
        toast({ title: 'Success!', description: response.data.message, duration: 3000 });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail?.[0]?.msg
        || error.response?.data?.detail
        || 'Failed to send message. Please try again.';
      toast({ title: 'Error', description: errorMessage, variant: 'destructive', duration: 3000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
    { icon: MapPin, label: 'Location', value: 'Durban, South Africa', href: null },
  ];

  const inputStyle = {
    width: '100%',
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-darker"
      style={{ padding: isMobile ? '80px 0' : '120px 0', overflow: 'hidden', ...sectionAccentStyle }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div ref={headerRef} style={{ opacity: 0, textAlign: 'center', marginBottom: isMobile ? 40 : 64 }}>
          <p className="font-mono" style={{
            color: NEON_PURPLE,
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            {'// '}Get In Touch
          </p>
          <h2 className="font-heading" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}>
            <span style={{
              background: `linear-gradient(135deg, ${NEON_PURPLE}, #d946ef)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>{contact.title}</span>
          </h2>
          <p className="font-body" style={{
            color: 'var(--text-muted)',
            fontSize: '1rem',
            maxWidth: 500,
            margin: '16px auto 0',
          }}>
            {contact.description}
          </p>
        </div>

        {/* Two column layout */}
        <div
          ref={contentRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
            gap: isMobile ? 24 : 40,
          }}
        >
          {/* Left — Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Contact cards */}
            <div className="card-glass" style={{ padding: 28 }}>
              <h3 className="font-heading" style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: 20,
              }}>
                Contact Info
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(191, 0, 255, 0.06)',
                      border: '1px solid rgba(191, 0, 255, 0.1)',
                      flexShrink: 0,
                    }}>
                      <Icon size={18} style={{ color: NEON_PURPLE }} />
                    </div>
                    <div>
                      <p className="font-mono" style={{
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: 'var(--text-muted)',
                        marginBottom: 2,
                      }}>
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            textDecoration: 'none',
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={e => e.target.style.color = NEON_PURPLE}
                          onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                        >
                          {value}
                        </a>
                      ) : (
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Banner */}
            <div style={{
              borderRadius: 16,
              padding: 28,
              background: 'linear-gradient(135deg, rgba(191, 0, 255, 0.08), rgba(217, 70, 239, 0.08))',
              border: '1px solid rgba(191, 0, 255, 0.12)',
            }}>
              <h3 className="font-heading" style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: 10,
              }}>
                Let's Build Something Great
              </h3>
              <p className="font-body" style={{
                color: 'var(--text-secondary)',
                fontSize: '0.88rem',
                lineHeight: 1.6,
                marginBottom: 20,
              }}>
                I'm always excited to take on new challenges and collaborate on innovative projects.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { href: contact.social.github, label: 'GH' },
                  { href: contact.social.linkedin, label: 'LI' },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: NEON_PURPLE,
                      background: 'rgba(191, 0, 255, 0.06)',
                      border: '1px solid rgba(191, 0, 255, 0.15)',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(191, 0, 255, 0.15)';
                      e.currentTarget.style.borderColor = 'rgba(191, 0, 255, 0.3)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(191, 0, 255, 0.15)';
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="card-glass" style={{ padding: 28, alignSelf: 'start' }}>
            <h3 className="font-heading" style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 6,
            }}>
              Send a Message
            </h3>
            <p className="font-body" style={{
              color: 'var(--text-muted)',
              fontSize: '0.82rem',
              marginBottom: 24,
            }}>
              Fill out the form and I'll get back to you soon
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label className="font-heading" htmlFor="name" style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: 6,
                }}>
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="input-cyber"
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="font-heading" htmlFor="email" style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: 6,
                }}>
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="input-cyber"
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="font-heading" htmlFor="message" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: 6,
                }}>
                  Message
                  <span className="font-mono" style={{
                    fontSize: '0.65rem',
                    padding: '2px 8px',
                    borderRadius: 999,
                    background: formData.message.length >= 10
                      ? 'rgba(191, 0, 255, 0.1)'
                      : 'rgba(255, 255, 255, 0.05)',
                    color: formData.message.length >= 10
                      ? NEON_PURPLE
                      : 'var(--text-muted)',
                  }}>
                    {formData.message.length >= 10 ? `✓ ${formData.message.length}` : `${formData.message.length}/10`}
                  </span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={2000}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="input-cyber"
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary font-heading"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '14px 24px',
                  opacity: isSubmitting ? 0.6 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  background: `linear-gradient(135deg, ${NEON_PURPLE}, #d946ef)`,
                }}
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section >
  );
};

export default Contact;
