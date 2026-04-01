import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { injectStore } from '../infrastructure/Api'
import authReducer from './auth/authSlice'
import employeesReducer from './employees/employeesSlice'

export const store = configureStore({
  reducer: {
    _placeholder: (state: Record<string, unknown> = {}) => state,
    auth: authReducer,
    employees: employeesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

setupListeners(store.dispatch)
injectStore(store)

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
