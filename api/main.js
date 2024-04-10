import express from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import connectMongoDB from "./config/database.js";
import cors from "cors";
import errorMiddlewar from "./middleware/error.middleware.js";
//  Routes
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import propertyRoute from './routes/property.route.js';

// Initialize the express app
const app = express();

// Loading environment variables from .env file
dotenv.config();

// Connect to mongodb
connectMongoDB();

// Set the port of our application
const port = process.env.PORT || 8080;

const corsOptions = {origin: "http://localhost:3000"};
app.use(cors(corsOptions));

// Middleware for parsing incoming requests data
app.use(express.json());
app.use(cookieParser());

// Log requests to the console
app.use(morgan('tiny'));


// Define routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use('/api/properties', propertyRoute)





// ----_____-----------___ FOR TESTING PURPOSE ___---------_______---------____// 
import User from './models/user.model.js';
// For testIGN---------------------- //
import {authMiddleware} from './middleware/auth.middleware.js';


/* TESTIIIING -------------------*/ 
// Route to get the currently logged-in user  
app.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    console.log(user );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// API endpoint to get all properties
// app.get('/api/property/all', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// ----_____-----------___ FOR TESTING PURPOSE ___---------_______---------____// 




// Error middleware
app.use('/api', errorMiddlewar); 
// must be placed at the end, if not it will catch all routes and always return the error


// Start the server.
app.listen(port, function(err) {
  // If an error occurs, log the error message to the console.
  if(err) {
    console.error(`Server failed to start on ${"http://localhost:" + port} owen to: ${err.message}`);
  } else {
    // If no error occurs, log a message indicating the server is running.
    console.log(`Server is Running on ${"http://localhost:" + port}`);
  }
})


