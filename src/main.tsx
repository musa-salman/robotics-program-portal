import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ThemeProvider from 'react-bootstrap/esm/ThemeProvider'
import AuthProvider from './authentication/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './users/UserContext.tsx'
import CategoryProvider from './upload-file/CategoryContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider dir="rtl">
      <BrowserRouter>
        <UserProvider>
          <CategoryProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </CategoryProvider>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
