import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'scale';
  className?: string;
  delay?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  className = '',
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getInitialTransform = () => {
    switch (direction) {
      case 'left':
        return 'translate-x-[-36px] opacity-0';
      case 'right':
        return 'translate-x-[36px] opacity-0';
      case 'scale':
        return 'scale-95 opacity-0';
      case 'up':
      default:
        return 'translate-y-[32px] opacity-0';
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[700ms] cubic-bezier(0.16, 1, 0.3, 1) ${
        isVisible ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : getInitialTransform()
      } ${className}`}
    >
      {children}
    </div>
  );
};
