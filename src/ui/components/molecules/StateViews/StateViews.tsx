import React from 'react';

export interface ViewProps {
  message?: string;
  className?: string;
}

const defaultContainerStyle = 'overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-3xl shadow-2xl shadow-black/20';

export const LoadingView: React.FC<ViewProps> = ({ 
  message = 'Cargando información...', 
  className = '' 
}) => {
  return (
    <div className={`${defaultContainerStyle} ${className}`}>
      <div className="px-8 py-16 text-center text-lg text-indigo-400 font-black animate-pulse">
        {message}
      </div>
    </div>
  );
};

export const EmptyView: React.FC<ViewProps> = ({ 
  message = 'No hay datos disponibles.', 
  className = '' 
}) => {
  return (
    <div className={`${defaultContainerStyle} ${className}`}>
      <div className="px-8 py-16 text-center text-lg text-slate-500 font-medium">
        {message}
      </div>
    </div>
  );
};
