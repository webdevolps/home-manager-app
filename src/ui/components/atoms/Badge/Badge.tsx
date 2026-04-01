import React from 'react';

export interface BadgeProps {
  status: 'active' | 'inactive';
  label?: string;
  className?: string;
}

const styles = {
  base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-md transition-colors duration-200',
  active: 'bg-green-100/50 text-green-800 border-green-200',
  inactive: 'bg-red-100/50 text-red-800 border-red-200'
};

export const Badge: React.FC<BadgeProps> = ({ status, label, className = '' }) => {
  const variantStyle = status === 'active' ? styles.active : styles.inactive;
  const displayLabel = label || (status === 'active' ? 'Activo' : 'Inactivo');

  return (
    <span className={`${styles.base} ${variantStyle} ${className}`} role="status">
      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
      {displayLabel}
    </span>
  );
};

export default Badge;
