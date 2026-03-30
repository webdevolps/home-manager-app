import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const styles = {
  wrapper: 'w-full flex flex-col gap-1.5',
  label: 'text-sm font-medium text-gray-700',
  inputBase: 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
  inputNormal: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20 hover:border-gray-400',
  inputError: 'border-red-500 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500/20',
  errorText: 'text-xs text-red-600',
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
