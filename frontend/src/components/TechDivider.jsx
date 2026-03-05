import React from 'react';

const WORDS = [
  'React', 'Node.js', 'Python', 'FastAPI', 'MongoDB',
  'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3', 'Git',
  'REST APIs', 'Responsive Design', 'SEO', 'Performance',
  'React', 'Node.js', 'Python', 'FastAPI', 'MongoDB',
  'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3', 'Git',
  'REST APIs', 'Responsive Design', 'SEO', 'Performance',
];

const TechDivider = () => {
  return (
    <div style={{
      padding: '32px 0',
      background: 'var(--bg-primary)',
      overflow: 'hidden',
      position: 'relative',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      {/* Fade edges */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 120,
        background: 'linear-gradient(to right, var(--bg-primary), transparent)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 120,
        background: 'linear-gradient(to left, var(--bg-primary), transparent)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Marquee */}
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        <div className="marquee-track">
          {WORDS.map((word, i) => (
            <span
              key={i}
              className="font-mono"
              style={{
                fontSize: '0.8rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.05em',
                transition: 'color 0.3s',
              }}
            >
              {word}
              <span style={{
                display: 'inline-block',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'var(--accent-primary)',
                opacity: 0.3,
                marginLeft: 24,
                verticalAlign: 'middle',
              }} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechDivider;
