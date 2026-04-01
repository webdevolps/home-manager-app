import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const styles = {
  wrapper: 'w-full flex flex-col gap-2',
  label: 'text-sm font-bold text-slate-300 tracking-wide',
  inputBase: 'w-full px-4 py-3 bg-slate-900/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed',
  inputNormal: 'border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500/30 hover:border-slate-500',
  inputError: 'border-red-500/50 text-red-100 placeholder-red-400 focus:border-red-500 focus:ring-red-500/30 hover:border-red-500/80',
  errorText: 'text-xs text-red-400 font-semibold mt-1 flex items-center gap-1',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const generatedId = React.useId();
    // Generar un ID fallback determinístico para accesibilidad si no se provee uno
    const inputId = id || generatedId;
    const inputStyle = `${styles.inputBase} ${error ? styles.inputError : styles.inputNormal} ${className}`;

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <input ref={ref} id={inputId} className={inputStyle} aria-invalid={!!error} {...props} />
        {error && <span className={styles.errorText} role="alert">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
