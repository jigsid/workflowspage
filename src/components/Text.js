import React from 'react';

export const Text = ({ 
  as: Component = 'p', 
  size = 'md', 
  weight = 'normal', 
  color = 'primary',
  align = 'inherit', 
  children, 
  className = '', 
  ...props 
}) => {
  const styles = {
    fontSize: getSize(size),
    fontWeight: getWeight(weight),
    color: getColor(color),
    textAlign: align,
  };

  return (
    <Component 
      className={`text ${className}`} 
      style={styles}
      {...props}
    >
      {children}
    </Component>
  );
};

// Helper functions to map props to CSS variables
function getSize(size) {
  const sizeMap = {
    xs: 'var(--font-size-xs)',
    sm: 'var(--font-size-sm)',
    md: 'var(--font-size-md)',
    lg: 'var(--font-size-lg)',
    xl: 'var(--font-size-xl)',
    '2xl': 'var(--font-size-2xl)',
    '3xl': 'var(--font-size-3xl)',
    '4xl': 'var(--font-size-4xl)',
  };
  return sizeMap[size] || 'var(--font-size-md)';
}

function getWeight(weight) {
  const weightMap = {
    normal: 'var(--font-weight-normal)',
    medium: 'var(--font-weight-medium)',
    semibold: 'var(--font-weight-semibold)',
    bold: 'var(--font-weight-bold)',
  };
  return weightMap[weight] || 'var(--font-weight-normal)';
}

function getColor(color) {
  const colorMap = {
    primary: 'var(--color-text)',
    secondary: 'var(--color-text-secondary)',
    accent: 'var(--color-accent)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)',
  };
  return colorMap[color] || 'var(--color-text)';
} 