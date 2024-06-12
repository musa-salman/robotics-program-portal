import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ThemeProvider from 'react-bootstrap/esm/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './users/UserContext.tsx';
import CategoryProvider from './upload-file/CategoryContext.tsx';
import StudyMaterialProvider from './study-material/StudyMaterialContext.tsx';
import StorageServiceProvider from './storage-service/StorageContext.tsx';
import EventProvider from './events/EventContext.tsx';
import { AuthProvider } from './authentication/AuthContext.tsx';
import StudentProvider from './students-management/StudentContext.tsx';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import createTheme from '@mui/material/styles/createTheme';
import RegisterProvider from './register/RegisterContext.tsx';


const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin]
});

const theme = createTheme({
  components: {
    MuiPagination: {
      defaultProps: {
        dir: 'ltr'
      }
    }
  },
  direction: 'rtl'
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider dir="rtl">
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <UserProvider>
              <CategoryProvider>
                <StudyMaterialProvider>
                  <EventProvider>
                    <StudentProvider>
                      <StorageServiceProvider>
                        <RegisterProvider>
                          <AuthProvider>
                            <App />
                          </AuthProvider>
                        </RegisterProvider>
                      </StorageServiceProvider>
                    </StudentProvider>
                  </EventProvider>
                </StudyMaterialProvider>
              </CategoryProvider>
            </UserProvider>
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </ThemeProvider>
  </React.StrictMode>
);
