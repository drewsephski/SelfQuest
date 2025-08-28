import { useEffect } from 'react';

/**
 * Hook to optimize performance by preloading critical routes
 */
export function usePerformanceOptimization() {
    useEffect(() => {
        // Preload critical routes
        if (typeof window !== 'undefined') {
            const router = require('next/router').default;

            // Preload test route after a short delay
            const timer = setTimeout(() => {
                router.prefetch('/test');
                router.prefetch('/test/result/history');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, []);
}

/**
 * Hook to track Core Web Vitals
 */
export function useWebVitals() {
    useEffect(() => {
        if (typeof window !== 'undefined' && 'performance' in window) {
            // Track performance metrics
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    // You can send these metrics to your analytics service
                    if ('value' in entry) {
                        console.log(`${entry.name}: ${entry.value}`);
                    } else {
                        console.log(`${entry.name}:`, entry);
                    }
                });
            });

            try {
                observer.observe({ entryTypes: ['measure', 'navigation'] });
            } catch (e) {
                // Fallback for browsers that don't support all entry types
                console.warn('Performance observer not fully supported');
            }

            return () => observer.disconnect();
        }
    }, []);
}