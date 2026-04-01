import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/molecules/PageHeader/PageHeader';
import { LoadingView } from '../../components/molecules/StateViews/StateViews';

const LegacyPlaceholder = () => {
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    // Simulamos un tiempo de carga tratando de buscar el Microfrontend
    const timer = setTimeout(() => {
      setIsTimeout(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10 py-6">
      <PageHeader 
        title="Módulo Complementario"
        subtitle="Agnes Legacy Ecosystem"
      />

      <div className="w-full bg-slate-900/40 backdrop-blur-3xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden min-h-[400px] flex items-center justify-center p-8">
        {!isTimeout ? (
          <LoadingView message="Inicializando Agnes Legacy Framework..." />
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
            <div className="p-4 bg-orange-500/10 rounded-full mb-2">
              <svg className="w-12 h-12 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-200">
              Módulo No Disponible
            </h3>
            <p className="text-slate-400 max-w-md mx-auto">
              El submódulo heredado al que intentas acceder no se pudo cargar o aún se encuentra en proceso de migración (Próximamente). 
            </p>
            <div className="mt-6 px-6 py-2 bg-slate-800 rounded-lg border border-slate-700 text-sm font-medium text-slate-300">
              Module Federation: agnes-legacy (Pending)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegacyPlaceholder;
