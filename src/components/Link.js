import React from 'react';

export const Link = ({ 
  as: Component = 'a', 
  children, 
  className = '', 
  color = 'accent',
  underline = 'hover',
  external = false,
  ...props 
}) => {
  const styles = {
    color: getColor(color),
    textDecoration: underline === 'none' ? 'none' : 'underline',
    textDecorationColor: underline === 'hover' ? 'transparent' : undefined,
    textUnderlineOffset: '0.2em',
    fontWeight: 500,
    transition: 'all var(--transition-fast)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3em',
  };

  const hoverStyles = {
    textDecorationColor: underline === 'hover' ? getColor(color) : undefined,
    filter: 'brightness(1.2)',
  };

  const handleMouseEnter = (e) => {
    for (const [key, value] of Object.entries(hoverStyles)) {
      if (value !== undefined) {
        e.target.style[key] = value;
      }
    }
  };

  const handleMouseLeave = (e) => {
    for (const key of Object.keys(hoverStyles)) {
      e.target.style[key] = styles[key];
    }
  };

  const externalProps = external ? {
    target: '_blank',
    rel: 'noopener noreferrer',
  } : {};

  return (
    <Component 
      className={`link ${className}`}
      style={styles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...externalProps}
      {...props}
    >
      {children}
      {external && (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="1em" 
          height="1em" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          style={{ fontSize: '0.8em' }}
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      )}
    </Component>
  );
};

function getColor(color) {
  const colorMap = {
    accent: 'var(--color-accent)',
    text: 'var(--color-text)',
    secondary: 'var(--color-text-secondary)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)',
  };
  return colorMap[color] || 'var(--color-accent)';
} 