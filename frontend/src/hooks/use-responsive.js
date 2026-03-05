import { useState, useEffect, useCallback } from 'react';

/**
 * Returns responsive breakpoint booleans that update on window resize.
 *
 * @returns {{ isMobile: boolean, isTablet: boolean, isDesktop: boolean }}
 *   - isMobile:  width < 768
 *   - isTablet:  768 <= width < 1024
 *   - isDesktop: width >= 1024
 */
const useResponsive = () => {
    const getBreakpoints = () => {
        const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
        return {
            isMobile: w < 768,
            isTablet: w >= 768 && w < 1024,
            isDesktop: w >= 1024,
        };
    };

    const [bp, setBp] = useState(getBreakpoints);

    const handleResize = useCallback(() => {
        setBp(getBreakpoints());
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return bp;
};

export default useResponsive;
