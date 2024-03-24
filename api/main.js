import express from "express";
import morgan from "morgan";
import connectMongoDB from "./config/database.js";
import authRouter from "./routes/auth.route.js";

import dotenv from 'dotenv';
import errorHandler from "./middleware/errorHandler.js";

// Loading environment variables from .env file
dotenv.config();

// Initialize the express app
const app = express();

// Set the port of our application
const port = process.env.PORT || 8080;

// Connect to mongodb
connectMongoDB();

// Middleware for parsing incoming requests data
app.use(express.json());

// Log requests to the console
app.use(morgan('tiny'));

// Use the '/api/auth' endpoint for the authRouter
app.use('/api/auth', authRouter);

// Middleware form Handling Error
app.use('/api/auth', errorHandler);

// Define Property schema
// const PropertySchema = new mongoose.Schema({
//   address: {
//     type: String,
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   // Add more properties like type (apartment, house), description, etc.
// }); const Property = mongoose.model('Property', PropertySchema);


// API endpoint to get all properties
// app.get('/api/user', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

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

