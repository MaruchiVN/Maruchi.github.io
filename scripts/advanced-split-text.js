// Advanced SplitText Animation with Multiple Effects
class AdvancedSplitTextAnimation {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            effect: options.effect || 'typewriter', // typewriter, bounce, wave, glitch, morph
            delay: options.delay || 100,
            duration: options.duration || 0.6,
            ease: options.ease || "power3.out",
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

        window.gsap.registerPlugin(window.gsap.plugins.ScrollTrigger);
        this.createAnimation();
    }

    createAnimation() {
        const el = this.element;
        const text = el.textContent;
        
        // Clear existing content
        el.innerHTML = '';
        
        // Create wrapper
        const wrapper = document.createElement('span');
        wrapper.className = 'advanced-split-wrapper';
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        el.appendChild(wrapper);
        
        // Split text into characters
        const chars = text.split('').map((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.className = 'advanced-split-char';
            span.style.display = 'inline-block';
            span.style.willChange = 'transform, opacity, color';
            span.dataset.index = index;
            return span;
        });
        
        chars.forEach(char => wrapper.appendChild(char));
        
        // Apply effect based on type
        switch (this.options.effect) {
            case 'typewriter':
                this.typewriterEffect(chars);
                break;
            case 'bounce':
                this.bounceEffect(chars);
                break;
            case 'wave':
                this.waveEffect(chars);
                break;
            case 'glitch':
                this.glitchEffect(chars);
                break;
            case 'morph':
                this.morphEffect(chars);
                break;
            default:
                this.defaultEffect(chars);
        }
    }

    typewriterEffect(chars) {
        // Set initial state
        window.gsap.set(chars, { opacity: 0, scale: 0 });
        
        const tl = window.gsap.timeline({
            onComplete: this.options.onComplete
        });
        
        tl.to(chars, {
            opacity: 1,
            scale: 1,
            duration: 0.1,
            ease: "back.out(1.7)",
            stagger: this.options.delay / 1000,
            onComplete: () => {
                // Add typewriter cursor effect
                this.addTypewriterCursor();
            }
        });
        
        this.timeline = tl;
    }

    bounceEffect(chars) {
        window.gsap.set(chars, { 
            opacity: 0, 
            y: -100, 
            rotation: -180,
            scale: 0
        });
        
        const tl = window.gsap.timeline({
            onComplete: this.options.onComplete
        });
        
        tl.to(chars, {
            opacity: 1,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: this.options.duration,
            ease: "bounce.out",
            stagger: this.options.delay / 1000
        });
        
        this.timeline = tl;
    }

    waveEffect(chars) {
        window.gsap.set(chars, { 
            opacity: 0, 
            y: 50,
            rotationX: -90
        });
        
        const tl = window.gsap.timeline({
            onComplete: this.options.onComplete
        });
        
        tl.to(chars, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: this.options.duration,
            ease: "power3.out",
            stagger: (index) => Math.sin(index * 0.5) * 0.1 + this.options.delay / 1000
        });
        
        this.timeline = tl;
    }

    glitchEffect(chars) {
        window.gsap.set(chars, { opacity: 0 });
        
        const tl = window.gsap.timeline({
            onComplete: this.options.onComplete
        });
        
        // Create glitch effect
        chars.forEach((char, index) => {
            const delay = index * (this.options.delay / 1000);
            
            tl.to(char, {
                opacity: 1,
                duration: 0.1,
                ease: "none"
            }, delay)
            .to(char, {
                x: "random(-10, 10)",
                y: "random(-5, 5)",
                duration: 0.05,
                ease: "none",
                repeat: 3
            }, delay + 0.1)
            .to(char, {
                x: 0,
                y: 0,
                duration: 0.1,
                ease: "power3.out"
            }, delay + 0.25);
        });
        
        this.timeline = tl;
    }

    morphEffect(chars) {
        window.gsap.set(chars, { 
            opacity: 0, 
            scale: 0,
            rotation: 360,
            color: "#667eea"
        });
        
        const tl = window.gsap.timeline({
            onComplete: this.options.onComplete
        });
        
        tl.to(chars, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            color: "#1e293b",
            duration: this.options.duration,
            ease: "elastic.out(1, 0.3)",
            stagger: this.options.delay / 1000
        });
        
        this.timeline = tl;
    }

    defaultEffect(chars) {
        window.gsap.set(chars, this.options.from);
        
        const tl = window.gsap.timeline({
            onComplete: this.options.onComplete
        });
        
        tl.to(chars, {
            ...this.options.to,
            duration: this.options.duration,
            ease: this.options.ease,
            stagger: this.options.delay / 1000
        });
        
        this.timeline = tl;
    }

    addTypewriterCursor() {
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.className = 'typewriter-cursor';
        cursor.style.cssText = `
            color: #667eea;
            font-weight: bold;
            animation: blink 1s infinite;
        `;
        
        this.element.appendChild(cursor);
        
        // Remove cursor after 2 seconds
        setTimeout(() => {
            if (cursor.parentNode) {
                cursor.parentNode.removeChild(cursor);
            }
        }, 2000);
    }

    destroy() {
        if (this.timeline) {
            this.timeline.kill();
        }
    }
}

// Initialize advanced animations
document.addEventListener('DOMContentLoaded', () => {
    const checkGSAP = setInterval(() => {
        if (window.gsap) {
            clearInterval(checkGSAP);
            // Delay slightly to ensure DOM is fully ready
            setTimeout(() => {
                initializeAdvancedAnimations();
            }, 100);
        }
    }, 100);
});

function initializeAdvancedAnimations() {
    const titleElement = document.getElementById('animated-title');
    
    if (titleElement) {
        // You can change the effect here: 'typewriter', 'bounce', 'wave', 'glitch', 'morph'
        new AdvancedSplitTextAnimation(titleElement, {
            effect: 'typewriter',
            delay: 120,
            duration: 0.8,
            onComplete: () => {
                console.log('Advanced Maruchi_VN animation completed!');
            }
        });
    }
}

// Add CSS for typewriter cursor
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .typewriter-cursor {
        color: #667eea;
        font-weight: bold;
        animation: blink 1s infinite;
    }
    
    .advanced-split-char {
        transition: color 0.3s ease;
    }
    
    .advanced-split-char:hover {
        color: #667eea !important;
        transform: scale(1.2) translateY(-3px);
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);
