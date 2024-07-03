// performanceOptimization.js

// Apply lazy loading to images, iframes, and videos
export function applyLazyLoading() {
    const lazyElements = document.querySelectorAll('img[data-src], iframe[data-src], video[data-src]');
    const config = {
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.tagName === 'VIDEO') {
                    const sources = entry.target.querySelectorAll('source');
                    sources.forEach(source => {
                        source.src = source.getAttribute('data-src');
                    });
                    entry.target.load();
                } else {
                    entry.target.src = entry.target.getAttribute('data-src');
                }
                self.unobserve(entry.target);
            }
        });
    }, config);

    lazyElements.forEach(element => observer.observe(element));
}

// Apply lazy loading to background images
export function applyLazyBackgrounds() {
    const lazyBackgrounds = document.querySelectorAll('[data-bg-src]');
    const config = {
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.backgroundImage = `url(${entry.target.getAttribute('data-bg-src')})`;
                self.unobserve(entry.target);
            }
        });
    }, config);

    lazyBackgrounds.forEach(bg => observer.observe(bg));
}

// Prefetch links for faster navigation
export function prefetchLinks() {
    const links = document.querySelectorAll('a[data-prefetch]');
    links.forEach(link => {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link.href;
        document.head.appendChild(prefetchLink);
    });
}

// Defer non-critical scripts to improve page load times
export function deferNonCriticalScripts() {
    const scripts = document.querySelectorAll('script[data-defer]');
    scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.src = script.src;
        newScript.defer = true;
        document.body.appendChild(newScript);
        script.remove();
    });
}

// Optimize CSS delivery by preloading key stylesheets
export function preloadCriticalCSS() {
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"][data-preload]');
    stylesheets.forEach(sheet => {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = sheet.href;
        preloadLink.as = 'style';
        document.head.appendChild(preloadLink);
    });
}

// Preconnect to important third-party domains
export function preconnectDomains() {
    const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.youtube.com',
        'https://cdn.jsdelivr.net'
    ];
    domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}

// Optimize font loading
export function optimizeFonts() {
    const fonts = document.querySelectorAll('link[rel="stylesheet"][data-font-preload]');
    fonts.forEach(font => {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = font.href;
        preloadLink.as = 'style';
        preloadLink.crossOrigin = 'anonymous';
        document.head.appendChild(preloadLink);

        const newFont = document.createElement('link');
        newFont.rel = 'stylesheet';
        newFont.href = font.href;
        document.head.appendChild(newFont);

        font.remove();
    });
}

// Optimize all performance enhancements
export function optimizePerformance() {
    applyLazyLoading();
    applyLazyBackgrounds();
    prefetchLinks();
    deferNonCriticalScripts();
    preloadCriticalCSS();
    preconnectDomains();
    optimizeFonts();
}

// Automatically call the optimization functions on DOMContentLoaded
document.addEventListener('DOMContentLoaded', optimizePerformance);
