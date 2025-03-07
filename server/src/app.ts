
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';

// Load environment variables
dotenv.config();

// Import route handlers
import reflectionRoutes from './routes/reflectionRoutes';
import healthAssistantRoutes from './routes/healthAssistantRoutes';
import contentRoutes from './routes/contentRoutes';
import wellnessRoutes from './routes/wellnessRoutes';

// Import services that need to be initialized
import * as contentService from './services/contentService';

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev')); // Logging
app.use(helmet()); // Security

// API Routes
const apiPrefix = '/api/v1';
app.use(`${apiPrefix}/reflections`, reflectionRoutes);
app.use(`${apiPrefix}/health-assistant`, healthAssistantRoutes);
app.use(`${apiPrefix}/content`, contentRoutes);
app.use(`${apiPrefix}/wellness`, wellnessRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Connect to MongoDB and initialize data
const initializeDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/augmend-health';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully');
    
    // Seed initial content if needed
    await contentService.seedInitialContent();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Initialize the database
initializeDatabase();

export default app;
