import { RegisterService } from './register/service/RegisterService';
import { StudentRepository } from './students-management/StudentRepository';
import { UserRepository } from './users/UserRepository';
import { UserService } from './users/UserService';
import React from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './users/UserContext';
import GPTServiceProvider from './gpt-service/GPTContext';
import MaterialProvider from './study-material/repository/StudyMaterialContext';
import { MaterialService } from './study-material/repository/MaterialService';
import { CategoryRepository } from './study-material/repository/CategoryRepository';
import { StudyMaterialRepository } from './study-material/repository/StudyMaterialRepository';
import EventProvider from './events/repository/EventContext';
import StorageProvider from './storage-service/StorageContext';
import { AuthProvider } from './authentication/services/AuthContext';
import App from './App';
import RegisterProvider from './register/service/RegisterContext';
import { RegisterRepository } from './register/service/RegisterRepository';
import { CachingRepository } from './repositories/caching/CachingRepository';
import { StudentEventRepositories } from './events/repository/StudentEventRepositories';
import { EventRegistrationRepositories } from './events/repository/EventRegistrationRepositories';
import { EventRepository } from './events/repository/EventRepository';
import { EventService } from './events/repository/EventService';
import { DocumentProvider } from './docs-handling/service/DocumentInfoContext';
import { DocumentInfoService } from './docs-handling/service/DocumentService';
import { IStorageService } from './storage-service/IStorageService';
import { StorageService } from './storage-service/StorageService';
import { DocumentStudentRepositories } from './docs-handling/service/DocumentStudentRepositories';
import { DocumentRepository } from './docs-handling/service/DocumentRepository';

interface IProps {
  theme: Theme;
  cacheRtl: EmotionCache;
}

function bootstrap({ theme, cacheRtl }: IProps) {
  const storage: IStorageService = new StorageService();

  const categoryRepository = new CachingRepository(new CategoryRepository());
  const studyMaterialRepository = new CachingRepository(new StudyMaterialRepository());
  const materialService = new MaterialService(categoryRepository, studyMaterialRepository);

  const studentEventRepositories = new StudentEventRepositories();
  const eventRegistrationRepositories = new EventRegistrationRepositories();
  const eventRepository = new CachingRepository(new EventRepository());
  const eventService = new EventService(eventRepository, eventRegistrationRepositories, studentEventRepositories);

  const studentRepository = new CachingRepository(new StudentRepository());
  const userRepository = new CachingRepository(new UserRepository());
  const userService = new UserService(
    userRepository,
    studentRepository,
    eventRegistrationRepositories,
    studentEventRepositories
  );

  const registerRepository = new CachingRepository(new RegisterRepository());
  const registerService = new RegisterService(registerRepository, studentRepository, userRepository);

  const documentRepository = new CachingRepository(new DocumentRepository());
  const documentStudentRepositories = new DocumentStudentRepositories();
  const documentService = new DocumentInfoService(documentRepository, documentStudentRepositories, storage);
  console.log(theme);
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CacheProvider value={cacheRtl}>
          <BrowserRouter>
            <DocumentProvider documentService={documentService}>
              <UserProvider userService={userService}>
                <GPTServiceProvider>
                  <MaterialProvider materialService={materialService}>
                    <EventProvider eventService={eventService}>
                      <StorageProvider>
                        <RegisterProvider registerService={registerService}>
                          <AuthProvider>
                            <CssBaseline />
                            <App />
                          </AuthProvider>
                        </RegisterProvider>
                      </StorageProvider>
                    </EventProvider>
                  </MaterialProvider>
                </GPTServiceProvider>
              </UserProvider>
            </DocumentProvider>
          </BrowserRouter>
        </CacheProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default bootstrap;
