import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { healthRoutes } from './routes/healthRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/v1/health', healthRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});