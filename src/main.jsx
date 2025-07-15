import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx';
import { UIProvider } from './contexts/CompTransits.jsx';
import { UserProvider } from './contexts/Username.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
      <UIProvider>
    <App />
      </UIProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>,
)
