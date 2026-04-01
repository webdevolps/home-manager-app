import React from 'react';
import { Card } from '../../../components/atoms/Card/Card';

const styles = {
  header: 'flex justify-between items-start mb-8',
  title: 'text-2xl font-black text-slate-800 tracking-tight',
  badge: 'inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase bg-blue-100 text-blue-700 border border-blue-200 shadow-sm',
  content: 'space-y-5 text-slate-700 text-lg leading-relaxed font-medium',
  highlight: 'text-blue-700 font-bold underline decoration-blue-500/10 underline-offset-4'
};

export const AuthorityCard: React.FC = () => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-slate-200/60 !bg-white">
      <div className={styles.header}>
        <h2 className={styles.title}>Nivel de Acceso</h2>
        <span className={styles.badge}>Root Authority</span>
      </div>
      <div className={styles.content}>
        <p>
          Autenticado vía <span className={styles.highlight}>Agnes Logic Core</span>. 
          Posees la llave maestra al entorno y a la base de datos distribuida. 
        </p>
        <p>
          Desde este Hub centralizado podrás gestionar la nómina de empleados y supervisar operaciones críticas.
        </p>
      </div>
    </Card>
  );
};

export default AuthorityCard;
