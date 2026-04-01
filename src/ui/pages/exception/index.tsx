import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/atoms/Button/Button';

const ExceptionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[100dvh] w-screen bg-slate-950 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-red-500/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-500/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-lg w-full">
        <div className="mb-8">
          <h1 className="text-[8rem] sm:text-[10rem] font-black leading-none bg-gradient-to-br from-red-400 via-rose-500 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl">
            404
          </h1>
          <div className="h-2 w-24 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full mt-4 mb-8"></div>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4 tracking-tight">
          Página no encontrada
        </h2>
        <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-md mx-auto">
          Lo sentimos, la ruta a la que intentas acceder no existe en el sistema o no tienes los permisos necesarios.
        </p>
        
        <Button 
          variant="primary" 
          onClick={() => navigate('/')}
          className="w-full sm:w-auto min-w-[200px] h-14 text-lg justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-shadow duration-300 !bg-gradient-to-r !from-red-500 !to-orange-500 border-none"
        >
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
};

export default ExceptionPage;
