// SplitText Animation for Maruchi_VN
class SplitTextAnimation {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            delay: options.delay || 100,
            duration: options.duration || 0.6,
            ease: options.ease || "power3.out",
            splitType: options.splitType || "chars",
            from: options.from || { opacity: 0, y: 40 },
            to: options.to || { opacity: 1, y: 0 },
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || "-100px",
            onComplete: options.onComplete || null
        };
        
        this.init();
    }

    init() {
        if (!this.element || !window.gsap) {
            console.warn('GSAP not loaded or element not found');
            return;
        }

        // Register GSAP plugins if not already registered
        if (window.gsap.plugins.ScrollTrigger) {
            window.gsap.registerPlugin(window.gsap.plugins.ScrollTrigger);
        }

        this.createAnimation();
    }

    createAnimation() {
        const el = this.element;
        const text = el.textContent;
        
        // Clear existing content
        el.innerHTML = '';
        
        // Create wrapper for split text
        const wrapper = document.createElement('span');
        wrapper.className = 'split-text-wrapper';
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        el.appendChild(wrapper);
        
        // Split text into characters
        const chars = text.split('').map(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
            span.className = 'split-char';
            span.style.display = 'inline-block';
            span.style.willChange = 'transform, opacity';
            return span;
        });
        
        chars.forEach(char => wrapper.appendChild(char));
        
        // Set initial state
        window.gsap.set(chars, this.options.from);
        
        // Create timeline with ScrollTrigger
        const tl = window.gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: `top ${(1 - this.options.threshold) * 100}%${this.options.rootMargin}`,
                toggleActions: "play none none none",
                once: true
            },
            onComplete: () => {
                if (this.options.onComplete) {
                    this.options.onComplete();
                }
                // Clean up will-change property
                window.gsap.set(chars, { clearProps: "willChange" });
            }
        });
        
        // Animate characters
        tl.to(chars, {
            ...this.options.to,
            duration: this.options.duration,
            ease: this.options.ease,
            stagger: this.options.delay / 1000,
            force3D: true
        });
        
        this.timeline = tl;
    }

    destroy() {
        if (this.timeline) {
            this.timeline.kill();
        }
    }
}

// Initialize SplitText animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for GSAP to load
    const checkGSAP = setInterval(() => {
        if (window.gsap) {
            clearInterval(checkGSAP);
            initializeSplitTextAnimations();
        }
    }, 100);
});

function initializeSplitTextAnimations() {
    // Find the Maruchi_VN title element
    const titleElement = document.querySelector('.font-signika.font-bold.text-3xl');
    
    if (titleElement) {
        new SplitTextAnimation(titleElement, {
            delay: 150,
            duration: 0.8,
            ease: "back.out(1.7)",
            splitType: "chars",
            from: { 
                opacity: 0, 
                y: 50, 
                rotationX: -90,
                scale: 0.5
            },
            to: { 
                opacity: 1, 
                y: 0, 
                rotationX: 0,
                scale: 1
            },
            threshold: 0.2,
            rootMargin: "-50px",
            onComplete: () => {
                console.log('Maruchi_VN animation completed!');
            }
        });
    }
    
    // Optional: Add animation to subtitle
    const subtitleElement = document.querySelector('.text-center.text-base.md\\:text-lg.font-normal.text-slate-600');
    if (subtitleElement) {
        new SplitTextAnimation(subtitleElement, {
            delay: 80,
            duration: 0.6,
            ease: "power3.out",
            splitType: "words",
            from: { opacity: 0, y: 30 },
            to: { opacity: 1, y: 0 },
            threshold: 0.3,
            rootMargin: "-30px"
        });
    }
}
