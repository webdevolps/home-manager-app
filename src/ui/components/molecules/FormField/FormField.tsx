import React, { forwardRef } from 'react';
import { Input, InputProps } from '../../atoms/Input/Input';

export interface FormFieldProps extends InputProps {
  isRequired?: boolean;
}

const styles = {
  moleculeBase: 'w-full relative',
};

/**
 * FormField (Molecule)
 * Wrapper conceptual que orquesta el Atom Input configurando sus vínculos
 * de accesibilidad (aria y htmlFor) uniformemente, y controla la lógica visual
 * del Formulario (ej: asteriscos obligatorios, sin duplicar esfuerzos de CSS)
 */
export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, isRequired, id, className = '', ...props }, ref) => {
    const generatedId = React.useId();
    // Garantizamos conexión estricta de accesibilidad Label <-> Input usando useId nativo
    const inputId = id || generatedId;

    // Enriquecer el label text visualmente abstrayendo el patrón del asterísco de los layouts y Atoms
    const computedLabel = isRequired && label ? `${label} *` : label;

    return (
      <div className={`${styles.moleculeBase} ${className}`}>
        <Input
          ref={ref}
          id={inputId}
          label={computedLabel}
          error={error}
          required={isRequired}
          aria-required={isRequired}
          {...props}
        />
      </div>
    );
  }
);

FormField.displayName = 'FormField';
export default FormField;
