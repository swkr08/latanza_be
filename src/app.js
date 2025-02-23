import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';  // Import Morgan
import dotenv from 'dotenv';
import userRouter from "./routes/user.routes.js";
import errorHandler from './middlewares/error.middleware.js';

dotenv.config();

const app = express();

// Use Morgan to log API requests in the terminal
app.use(morgan("dev"));  // Logs method, URL, status, response time

// CORS Configuration
app.use(cors({
    origin: process.env.ORIGIN || "*",
    credentials: true
}));

// Middleware
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static('public'));
app.use(cookieParser());

// API Routes
app.use("/api/v1/students", userRouter);

// Error Handling Middleware (Keep this at the end)
app.use(errorHandler);

export { app };
