# Regional Program in Robotics and Mechatronics - Web Application

## Project Overview

This web application was developed for the **Regional Program in Robotics and Mechatronics**, which is in collaboration with **Pico Kids**. It streamlines the management of study materials, events, and student registrations for the program.

The platform supports two main user roles:

- **Owner**: Manages users roles and everything related to the program like admin.
- **Admins**: Manage students, events, registrations, and generate reports.
- **Students**: Register for events and access study materials.

## Features

- **Admin Management**:
  - Oversee student registrations and manage users.
  - Generate Excel reports for data analysis.
  - Document management system for uploading and inspecting student contracts.
  - Core business logic implementation for the program.
- **Event Management**:
  - Admins can add, edit, and delete events.
  - Students can register for events.
- **Study Material**:
  - Admins can upload study materials.
  - Students can access and download study materials.

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - Material UI (MUI)
  - Vite
- **Backend & Database**:
  - Firebase Firestore (NoSQL Database)
  - Firebase Firestorage (File Storage)
  - Firebase Authentication (User Authentication)

## Getting Started

### Prerequisites

- Node.js (version 21+)
- Firebase account with Firestore, Firestorage, and Authentication enabled.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mosa-salman/robotics-program-portal.git
   ```
2. Navigate to the project directory:
   ```bash
   cd robotics-program-portal
   ```
3. Install the dependencies:
   ```bash
    npm install
   ```
4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   VITE_REACT_APP_API_KEY=your-firebase-api-key
   VITE_REACT_APP_AUTH_DOMAIN=your-firebase-auth-domain
   VITE_REACT_APP_PROJECT_ID=your-firebase-project-id
   VITE_REACT_APP_STORAGE_BUCKET=your-firebase-storage-bucket
   VITE_REACT_APP_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
   VITE_REACT_APP_APP_ID=your-firebase-app-id
   VITE_REACT_APP_MEASUREMENT_ID=your-firebase-measurement-id
   VITE_REACT_APP_PASSWORD_RESET_REDIRECT=your-password-reset-redirect-url
   ```

> **Note**:
>
> You can create an OpenAI API key by signing up at [OpenAI](https://groq.com/).

5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open the browser and navigate to `http://localhost:3000`.

## Deployment

This app can be easily deployed using Firebase Hosting or any hosting service that supports static websites. To deploy with Firebase Hosting:

1. Install the Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Login to Firebase:
   ```bash
   firebase login
   ```
3. Initialize Firebase Hosting:
   ```bash
   firebase init hosting
   ```
4. Build the app:
   ```bash
   npm run build
   ```
5. Deploy the app:
   ```bash
   firebase deploy
   ```
