import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ThemeProvider from 'react-bootstrap/esm/ThemeProvider'
import AuthProvider from './authentication/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './users/UserContext.tsx'
import CategoryProvider from './upload-file/CategoryContext.tsx'
import StudyMaterialProvider from './study-material/StudyMaterialContext.tsx'
import StorageServiceProvider from './storage-service/StorageServiceContext.tsx'
import EventProvider from './events/EventContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider dir="rtl">
      <BrowserRouter>
        <UserProvider>
          <CategoryProvider>
            <StudyMaterialProvider>
              <EventProvider>
                <StorageServiceProvider>
                  <AuthProvider>
                    <App />
                  </AuthProvider>
                </StorageServiceProvider>
              </EventProvider>
            </StudyMaterialProvider>
          </CategoryProvider>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
