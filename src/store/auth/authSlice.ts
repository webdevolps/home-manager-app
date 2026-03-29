import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces/auth.interface';

interface AuthState {
  user: User | null;
  token: string | null;
  currentTenantId: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  currentTenantId: null,
  isAuthenticated: false,
};

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
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.currentTenantId = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
