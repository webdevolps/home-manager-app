import React from 'react';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const styles = {
  header: 'mb-12 border-b border-slate-800 pb-8',
  title: 'text-5xl font-black bg-gradient-to-br from-white via-blue-200 to-indigo-500 bg-clip-text text-transparent mb-3 tracking-tighter',
  subtitle: 'text-slate-300 text-xl font-medium tracking-tight opacity-90',
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
};

export default PageHeader;
