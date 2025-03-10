import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'
import { Toaster } from './components/ui/sonner'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </BrowserRouter>

)
