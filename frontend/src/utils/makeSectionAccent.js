/**
 * Build per-section CSS custom property overrides for accent-colored glow / border.
 *
 * @param {number} r - Red channel (0-255)
 * @param {number} g - Green channel (0-255)
 * @param {number} b - Blue channel (0-255)
 * @returns {object} Style object to spread on the section element
 */
const makeSectionAccent = (r, g, b) => ({
    '--border-accent': `rgba(${r}, ${g}, ${b}, 0.2)`,
    '--glow-primary': `0 0 20px rgba(${r}, ${g}, ${b}, 0.15), 0 0 60px rgba(${r}, ${g}, ${b}, 0.05)`,
    '--glow-strong': `0 0 30px rgba(${r}, ${g}, ${b}, 0.3), 0 0 80px rgba(${r}, ${g}, ${b}, 0.1)`,
});

export default makeSectionAccent;
