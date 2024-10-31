import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectMongoDB from "./config/database.js";
import cors from "cors";
import errorMiddleware from "./middleware/error.middleware.js";

// Routes
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import propertyRoute from "./routes/property.route.js";

import path from "path";
import { fileURLToPath } from "url";

// Initialize the express app
const app = express();

// Loading environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectMongoDB();

const corsOptions = {
  origin: "https://immomarket.vercel.app", // Replace with your frontend origin
  // origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// get the resolved path to the file
const __filename = fileURLToPath(import.meta.url);
// get the name of the directory
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/properties", propertyRoute);

// Error middleware (must be placed at the end)
app.use(errorMiddleware);

// Define the port
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
