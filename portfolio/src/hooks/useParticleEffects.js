// hooks/useParticleEffects.js
import { useEffect, useRef } from 'react';

export const useParticleEffects = () => {
  const mousePos = useRef({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 400, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400 
  });
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Create and inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      #particle-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
      }

      .particle {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        will-change: transform, opacity;
        width: var(--size);
        height: var(--size);
        background: radial-gradient(circle, var(--color-start) 0%, var(--color-end) 100%);
        animation-duration: var(--duration);
        animation-fill-mode: forwards;
        animation-timing-function: linear;
        box-shadow: 
          0 0 10px var(--color-start),
          0 0 20px var(--color-start),
          0 0 30px var(--color-start);
      }

      .diamond-shape {
        border-radius: 0;
        transform: rotate(45deg);
        background: linear-gradient(45deg, 
          rgba(255, 255, 255, 0.9) 0%,
          rgba(255, 255, 255, 0.7) 50%,
          rgba(255, 255, 255, 0.9) 100%);
        box-shadow: 
          0 0 15px rgba(255, 255, 255, 0.8),
          0 0 30px rgba(255, 255, 255, 0.6),
          0 0 45px rgba(255, 255, 255, 0.4);
      }

      .star-shape {
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        border-radius: 0;
        background: radial-gradient(circle, 
          rgba(253, 224, 71, 0.9) 0%,
          rgba(253, 224, 71, 0.6) 50%,
          rgba(253, 224, 71, 0.9) 100%);
        box-shadow: 
          0 0 12px rgba(253, 224, 71, 0.8),
          0 0 24px rgba(253, 224, 71, 0.6),
          0 0 36px rgba(253, 224, 71, 0.4);
      }

      .shooting-star {
        position: absolute;
        height: 2px;
        background: linear-gradient(90deg, 
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0.8) 50%,
          rgba(255, 255, 255, 0) 100%);
        border-radius: 1px;
        box-shadow: 
          0 0 6px rgba(255, 255, 255, 0.8),
          0 0 12px rgba(255, 255, 255, 0.6),
          0 0 24px rgba(255, 255, 255, 0.4);
        animation: shootingStar 3s ease-in-out forwards;
        will-change: transform, width, opacity;
      }

      @keyframes floatUpParticle {
        0% { 
          transform: translate(0, 0) scale(1); 
          opacity: 1; 
        }
        100% { 
          transform: translate(var(--drift-x), calc(-100vh + var(--drift-y))) scale(0.5); 
          opacity: 0; 
        }
      }

      @keyframes floatUpSpiral {
        0% { 
          transform: translate(0, 0) rotate(0deg) scale(1); 
          opacity: 1; 
        }
        100% { 
          transform: translate(var(--drift-x), calc(-100vh + var(--drift-y))) rotate(720deg) scale(0.5); 
          opacity: 0; 
        }
      }

      @keyframes floatUpZigzag {
        0%, 100% { 
          transform: translate(0, 0); 
          opacity: 0; 
        }
        10%, 90% { 
          opacity: 1; 
        }
        25% { 
          transform: translate(calc(var(--drift-x) * 0.25), calc(-25vh + var(--drift-y) * 0.25)) translateX(20px); 
        }
        50% { 
          transform: translate(calc(var(--drift-x) * 0.5), calc(-50vh + var(--drift-y) * 0.5)) translateX(-20px); 
        }
        75% { 
          transform: translate(calc(var(--drift-x) * 0.75), calc(-75vh + var(--drift-y) * 0.75)) translateX(20px); 
        }
      }

      @keyframes pulse {
        0%, 100% { 
          transform: scale(1); 
          filter: brightness(1); 
        }
        50% { 
          transform: scale(1.5); 
          filter: brightness(1.5); 
        }
      }

      @keyframes twinkle {
        0%, 100% { 
          transform: scale(1); 
          filter: blur(0px) brightness(1); 
        }
        50% { 
          transform: scale(2); 
          filter: blur(2px) brightness(2); 
        }
      }

      @keyframes shootingStar {
        0% { 
          transform: translateX(0); 
          width: 0px; 
          opacity: 1; 
        }
        70% { 
          width: 150px; 
          opacity: 0.5; 
        }
        100% { 
          transform: translateX(100vw); 
          width: 150px; 
          opacity: 0; 
        }
      }
    `;
    document.head.appendChild(styleSheet);

    // A container for all particles to keep the DOM clean.
    const particleContainer = document.createElement('div');
    particleContainer.id = 'particle-container';
    document.body.appendChild(particleContainer);

    // --- MOUSE AND SCROLL EVENT LISTENERS ---
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleScroll = () => {
      // Create a burst of particles on scroll
      if (Math.abs(window.scrollY - lastScrollY.current) > 50) {
        for (let i = 0; i < 5; i++) {
          createParticle(mousePos.current.x, mousePos.current.y, true);
        }
        lastScrollY.current = window.scrollY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // --- PARTICLE CREATION LOGIC ---
    const createParticle = (x, y, isBurst = false) => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particleContainer.appendChild(particle);

      const startX = x ?? Math.random() * window.innerWidth;
      const startY = y ?? window.innerHeight + 50;
      
      // Weighted random selection for particle type
      const rand = Math.random() * 100;
      let type, size, duration, color;

      if (rand < 5) { // 5% Twinkling Diamonds
        type = 'diamond';
        size = Math.random() * 8 + 4;
        duration = Math.random() * 3 + 2;
        color = 'rgba(255, 255, 255, 0.9)';
        particle.style.animationName = 'twinkle, floatUpParticle';
        particle.style.animationTimingFunction = 'ease-in-out, linear';
      } else if (rand < 15) { // 10% Pulsing Stars
        type = 'star';
        size = Math.random() * 10 + 5;
        duration = Math.random() * 4 + 3;
        color = 'rgba(253, 224, 71, 0.8)';
        particle.style.animationName = 'pulse, floatUpParticle';
        particle.style.animationTimingFunction = 'ease-in-out, linear';
      } else if (rand < 35) { // 20% Zigzag
        type = 'circle';
        size = Math.random() * 3 + 1;
        duration = Math.random() * 4 + 4;
        color = 'rgba(6, 182, 212, 0.7)';
        particle.style.animationName = 'floatUpZigzag';
      } else if (rand < 60) { // 25% Spiral
        type = 'circle';
        size = Math.random() * 4 + 2;
        duration = Math.random() * 5 + 5;
        color = 'rgba(139, 92, 246, 0.8)';
        particle.style.animationName = 'floatUpSpiral';
      } else { // 40% Regular
        type = 'circle';
        size = Math.random() * 4 + 1;
        duration = Math.random() * 6 + 4;
        color = 'rgba(99, 102, 241, 0.7)';
        particle.style.animationName = 'floatUpParticle';
      }

      // Apply styles based on type
      particle.style.setProperty('--duration', `${duration}s`);
      particle.style.setProperty('--size', `${size}px`);
      particle.style.setProperty('--color-start', color);
      particle.style.setProperty('--color-end', color.replace(/, [0-9\.]+\)/, ', 0)'));
      
      if (type === 'diamond') {
        particle.classList.add('diamond-shape');
      } else if (type === 'star') {
        particle.classList.add('star-shape');
      }

      // Mouse attraction logic
      const angle = Math.atan2(mousePos.current.y - startY, mousePos.current.x - startX);
      const velocity = isBurst ? Math.random() * 100 + 50 : 20;
      const driftX = Math.cos(angle) * velocity;
      const driftY = Math.sin(angle) * velocity;
      particle.style.setProperty('--drift-x', `${driftX}px`);
      particle.style.setProperty('--drift-y', `${driftY}px`);

      // Set initial position
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;

      // Cleanup
      setTimeout(() => particle.remove(), duration * 1000);
    };

    // --- SHOOTING STAR LOGIC ---
    const createShootingStar = () => {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      particleContainer.appendChild(star);

      const fromTop = Math.random() > 0.5;
      const fromLeft = Math.random() > 0.5;
      
      star.style.top = fromTop ? '-20px' : `${Math.random() * 100}%`;
      star.style.left = fromLeft ? '-20px' : `${Math.random() * 100}%`;
      
      const angle = (Math.atan2(window.innerHeight - parseFloat(star.style.top), window.innerWidth - parseFloat(star.style.left)) * 180 / Math.PI) + (Math.random() * 60 - 30);
      star.style.transform = `rotate(${angle}deg)`;

      setTimeout(() => star.remove(), 3000);
    };

    // --- INTERVALS ---
    const particleInterval = setInterval(() => createParticle(), 250);
    const shootingStarInterval = setInterval(createShootingStar, 8000);

    // --- CLEANUP FUNCTION ---
    return () => {
      clearInterval(particleInterval);
      clearInterval(shootingStarInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (particleContainer.parentNode) {
        document.body.removeChild(particleContainer);
      }
      document.head.removeChild(styleSheet);
    };
  }, []);
};