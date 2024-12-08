import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Import configuration and routes
import { CORS_ORIGIN, PORT, validateEnvVariables } from './config/env.config.js';
import { errorMiddleware } from './middlewares/error.middlewares.js';
import { morganMiddleware } from './middlewares/morgan.middleware.js';

import authRoutes from './routes/auth.routes.js';

// Validate required environment variables
validateEnvVariables();

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [CORS_ORIGIN],
    credentials: true,
  })
);
app.use(morganMiddleware());

// API Routes
app.use('/api/v1/auth', authRoutes);

// Global error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
