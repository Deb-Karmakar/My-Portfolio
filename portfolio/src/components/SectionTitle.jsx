import React, { useState, useEffect, useRef } from 'react';

const SectionTitle = ({ children }) => {
  // 1. State to track if the element is visible
  const [isVisible, setIsVisible] = useState(false);

  // 2. Ref to attach to the DOM element
  const elementRef = useRef(null);

  // 3. Effect to observe the element
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // If the element is intersecting (i.e., on screen)
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Stop observing once it's visible to prevent re-triggering
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1, // Trigger when 10% of the element is visible
    });

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Cleanup function to unobserve when the component unmounts
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []); // Empty dependency array means this effect runs only once

  return (
    <div
      ref={elementRef}
      className={`
        text-center mb-16 transition-all duration-700 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      <h2 className="text-4xl font-bold text-white mb-4">{children}</h2>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto"></div>
    </div>
  );
};

export default SectionTitle;