import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectMongoDB from './config/database.js';
import cors from 'cors';
import errorMiddleware from './middleware/error.middleware.js';

// Routes
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import propertyRoute from './routes/property.route.js';

import path from 'path';
import { fileURLToPath } from 'url';

// Initialize the express app
const app = express();

// Loading environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectMongoDB();

// Enable CORS for all routes
app.use(cors({ origin: '*' }));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev')); // Change logging format if needed

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


app.use('/images', express.static(path.join(__dirname, 'uploads')));
// app.use(express.static('uploads'));
// app.use('/api/public/images', express.static(path.join(__dirname, 'upload')));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/properties', propertyRoute);

// import multeRoute from './routes/multer.router.js'
// app.use('/', multeRoute);


// Error middleware (must be placed at the end)
app.use(errorMiddleware);

// Define the port
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
