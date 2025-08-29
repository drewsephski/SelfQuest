import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Hook to optimize performance by preloading critical routes
 */
export function usePerformanceOptimization() {
    const router = useRouter();
    
    useEffect(() => {
        // Only run on client-side
        if (typeof window === 'undefined') return;

        // Preload critical routes after a short delay
        const timer = setTimeout(() => {
            router.prefetch('/test');
            router.prefetch('/test/result/history');
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);
}

/**
 * Hook to track Core Web Vitals
 */
export function useWebVitals() {
    useEffect(() => {
        // Only run on client-side
        if (typeof window === 'undefined' || !('performance' in window)) return;
        
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if ('value' in entry) {
                    console.log(`${entry.name}: ${entry.value}`);
                } else {
                    console.log(`${entry.name}:`, entry);
                }
            });
        });

        try {
            observer.observe({ entryTypes: ['measure', 'navigation'] });
            return () => observer.disconnect();
        } catch (e) {
            console.warn('Performance observer not fully supported', e);
        }
    }, []);
}