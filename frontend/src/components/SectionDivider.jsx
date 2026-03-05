import React from 'react';

/**
 * A curved SVG divider placed between sections.
 *
 * @param {object} props
 * @param {'up'|'down'} props.direction  — 'up' = concave (curves upward), 'down' = convex
 * @param {string}      props.fillTop    — CSS colour for the upper portion
 * @param {string}      props.fillBottom — CSS colour for the lower portion
 * @param {string}      [props.accent]   — Optional accent colour for a thin glow line along the curve
 * @param {boolean}     [props.flip]     — Mirror the curve horizontally
 */
const SectionDivider = ({
    direction = 'down',
    fillTop = 'var(--bg-secondary)',
    fillBottom = 'var(--bg-primary)',
    accent,
    flip = false,
}) => {
    const isDown = direction === 'down';

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                lineHeight: 0,
                overflow: 'hidden',
                transform: flip ? 'scaleX(-1)' : undefined,
                marginTop: -1,
                marginBottom: -1,
            }}
        >
            <svg
                viewBox="0 0 1440 80"
                preserveAspectRatio="none"
                style={{ display: 'block', width: '100%', height: 'clamp(40px, 5vw, 80px)' }}
            >
                {/* Background fill — top colour */}
                <rect width="1440" height="80" fill={fillTop} />

                {/* The curve — filled with bottom colour */}
                {isDown ? (
                    <path
                        d="M0,40 C360,90 1080,90 1440,40 L1440,80 L0,80 Z"
                        fill={fillBottom}
                    />
                ) : (
                    <path
                        d="M0,40 C360,-10 1080,-10 1440,40 L1440,80 L0,80 Z"
                        fill={fillBottom}
                    />
                )}

                {/* Optional accent glow line along the curve */}
                {accent && (
                    <path
                        d={isDown
                            ? 'M0,40 C360,90 1080,90 1440,40'
                            : 'M0,40 C360,-10 1080,-10 1440,40'}
                        fill="none"
                        stroke={accent}
                        strokeWidth="1.5"
                        strokeOpacity="0.3"
                    />
                )}
            </svg>
        </div>
    );
};

export default SectionDivider;
