import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl2TlgNRuQD-4E1yNN3k_3nin7B6RhMjk",
  authDomain: "pico-7a9d2.firebaseapp.com",
  projectId: "pico-7a9d2",
  storageBucket: "pico-7a9d2.appspot.com",
  messagingSenderId: "673223833904",
  appId: "1:673223833904:web:cb1397e6b218bbae2a70f5",
  measurementId: "G-5ZH9CK0CSH"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri: string =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/My Queries';

(async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to the database');
    } catch {
        console.log('Error connecting to the database');
    }
})();

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).send('Server is running');
});

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});