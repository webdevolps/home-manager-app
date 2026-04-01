import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, logout } from '../store/auth/authSlice';
import { AuthResponse } from '../interfaces/auth.interface';

import type { RootState } from '../store/store';

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const loginUser = (authData: AuthResponse) => {
    // Almacenamos el tenant_id en el store global como solicitaste, extrayéndolo de la respuesta del backend
    dispatch(
      setCredentials({
        user: authData.user,
        token: authData.token,
        tenant_id: authData.tenant.id, 
      })
    );
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    // Propiedades del estado
    user: authState?.user,
    token: authState?.token,
    currentTenantId: authState?.currentTenantId,
    isAuthenticated: authState?.isAuthenticated,
    isLoading: false, // Stub sync load

    // Acciones/Funciones
    loginUser,
    logoutUser,
  };
};
