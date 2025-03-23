import React from 'react';
import './Button.css';

export const Button = ({ 
  as: Component = 'button', 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <Component 
      className={`button ${className}`} 
      {...props}
    >
      {children}
    </Component>
  );
}; 