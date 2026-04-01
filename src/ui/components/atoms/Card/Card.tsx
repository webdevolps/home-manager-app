import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
}

const styles = {
  base: 'bg-white rounded-2xl border border-gray-100/50 overflow-hidden',
  paddingVars: {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  },
  elevationVars: {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md shadow-gray-200/50',
    lg: 'shadow-lg shadow-gray-200/50',
  }
};

export const Card: React.FC<CardProps> = ({ 
  padding = 'md', 
  elevation = 'md',
  className = '', 
  children, 
  ...props 
}) => {
  const classNames = `${styles.base} ${styles.paddingVars[padding]} ${styles.elevationVars[elevation]} ${className}`;

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

export default Card;
