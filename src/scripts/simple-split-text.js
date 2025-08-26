// Simple SplitText Animation for Maruchi_VN
class SimpleSplitTextAnimation {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        if (!this.element || !window.gsap) {
            console.warn('GSAP not loaded or element not found');
            return;
        }

        this.createAnimation();
    }

    createAnimation() {
        const el = this.element;
        const text = el.textContent;
        
        // Clear existing content
        el.innerHTML = '';
        
        // Create wrapper
        const wrapper = document.createElement('span');
        wrapper.className = 'split-text-wrapper';
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        el.appendChild(wrapper);
        
        // Split text into characters
        const chars = text.split('').map(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.className = 'split-char';
            span.style.display = 'inline-block';
            span.style.willChange = 'transform, opacity';
            return span;
        });
        
        chars.forEach(char => wrapper.appendChild(char));
        
        // Set initial state
        window.gsap.set(chars, { 
            opacity: 0, 
            y: 50,
            rotationX: -90,
            scale: 0.5
        });
        
        // Create animation timeline
        const tl = window.gsap.timeline({
            onComplete: () => {
                console.log('Maruchi_VN animation completed!');
                // Clean up will-change property
                window.gsap.set(chars, { clearProps: "willChange" });
            }
        });
        
        // Animate characters
        tl.to(chars, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.12,
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

// Initialize animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const checkGSAP = setInterval(() => {
        if (window.gsap) {
            clearInterval(checkGSAP);
            // Delay slightly to ensure DOM is fully ready
            setTimeout(() => {
                const titleElement = document.getElementById('animated-title');
                if (titleElement) {
                    new SimpleSplitTextAnimation(titleElement);
                }
            }, 100);
        }
    }, 100);
});
