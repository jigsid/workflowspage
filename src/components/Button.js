import React from 'react';
import './Button.css';

export const Button = ({ 
  as: Component = 'button', 
  children, 
  className = '', 
  variant = 'primary',
  size = 'default',
  iconOnly = false,
  disabled = false,
  ...props 
}) => {
  const classNames = [
    'button',
    variant !== 'primary' && `button--${variant}`,
    size !== 'default' && `button--${size}`,
    iconOnly && 'button--icon',
    disabled && 'button--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component 
      className={classNames} 
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  );
}; 