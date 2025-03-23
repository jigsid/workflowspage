import React from 'react';

export const Text = ({ 
  as: Component = 'p', 
  size = 'm', 
  weight = 'auto', 
  align = 'auto', 
  children, 
  className, 
  ...props 
}) => {
  return (
    <Component 
      className={className} 
      {...props}
    >
      {children}
    </Component>
  );
}; 