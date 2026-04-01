import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces/auth.interface';
import { SecureStorage } from '../../utils/secureStorage';

interface AuthState {
  user: User | null;
  token: string | null;
  currentTenantId: string | null;
  isAuthenticated: boolean;
}

const loadInitialState = (): AuthState => {
  try {
    const token = SecureStorage.getItem('token');
    const userStr = SecureStorage.getItem('user');
    const tenantId = SecureStorage.getItem('tenant_id');

    if (token && userStr && tenantId) {
      const user = JSON.parse(userStr) as User;
      return {
        user,
        token,
        currentTenantId: tenantId,
        isAuthenticated: true,
      };
    }
  } catch (e) {
    console.error('Failed to parse auth state from secure storage', e);
  }

  return {
    user: null,
    token: null,
    currentTenantId: null,
    isAuthenticated: false,
  };
};

const initialState: AuthState = loadInitialState();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string; tenant_id: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.currentTenantId = action.payload.tenant_id;
      state.isAuthenticated = true;

      SecureStorage.setItem('token', action.payload.token);
      SecureStorage.setItem('user', JSON.stringify(action.payload.user));
      SecureStorage.setItem('tenant_id', action.payload.tenant_id);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.currentTenantId = null;
      state.isAuthenticated = false;

      SecureStorage.removeItem('token');
      SecureStorage.removeItem('user');
      SecureStorage.removeItem('tenant_id');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
