import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { FormField } from '../../molecules/FormField/FormField';
import { Button } from '../../atoms/Button/Button';
import { useAuth } from '../../../../hooks/useAuth';
import { AuthService } from '../../../../infrastructure/services/auth.service';

const styles = {
  container: 'w-full max-w-[90vw] sm:max-w-sm mx-auto p-8 bg-slate-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/40 border border-slate-700/50 transition-all duration-300',
  title: 'text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-8',
  form: 'flex flex-col gap-6',
  errorContainer: 'p-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 font-semibold',
  submitButton: 'mt-4 w-full h-12 text-lg font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-shadow duration-300'
};

type LoginFormData = {
  email: string;
  password?: string;
};

/**
 * Organism: LoginForm
 * Coordina múltiples moléculas (Campos de texto) y átomos (Botón), 
 * atándolos a la capa de lógica asíncrona (Redux + API Mock/Real).
 */
export const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();
  const { loginUser } = useAuth();
  const location = useLocation();
  const [globalError, setGlobalError] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.requireLogin) {
      setGlobalError('La sesión ha expirado o se requiere iniciar sesión para acceder.');
      // Limpiar el estate del history explícitamente es opcional, 
      // pero evitamos que un F5 del usuario estando aquí mantenga el mensaje indefinidamente.
      window.history.replaceState({}, '');
    }
  }, [location]);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setGlobalError(null);
    try {
      const authData = await AuthService.login(data);
      // loginUser guarda token, user y tenant en Redux (useAuth hook)
      loginUser(authData);
    } catch {
      // Capturamos cualquier rechazo del API implícitamente
      setGlobalError('Credenciales inválidas. Por favor verifique sus datos.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bienvenido a Agnes</h2>
      
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        {globalError && (
          <div className={styles.errorContainer} role="alert">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {globalError}
          </div>
        )}

        <FormField
          id="email-input"
          label="Email"
          type="email"
          placeholder="admin@agnes.com"
          isRequired
          error={errors.email?.message}
          {...register('email', {
            required: 'El correo electrónico es requerido',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Debe ser un correo electrónico válido'
            }
          })}
        />

        <FormField
          id="password-input"
          label="Password"
          type="password"
          placeholder="••••••••"
          isRequired
          error={errors.password?.message}
          {...register('password', {
            required: 'La contraseña es requerida',
            minLength: {
              value: 6,
              message: 'Mínimo 6 caracteres'
            }
          })}
        />

        <Button
          type="submit"
          className={styles.submitButton}
          variant="primary"
          isLoading={isSubmitting}
        >
          Iniciar Sesión
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
