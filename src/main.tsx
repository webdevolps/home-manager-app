import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from '@store/store'
import { ModalProvider } from './context/ModalContext'
import AppRouter from './ui/routes/AppRouter'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <AppRouter />
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
)
