import mongoose from "mongoose";
import dotenv from "dotenv";

// Loading environment variables from .env file
dotenv.config();
const mongo_uri = process.env.MONGO_URI;

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

//  Connect to the database
const connectMongoDB = async () => {
  try {
    const connect = await mongoose.connect(mongo_uri, options);
    console.log(`MongoDB Connected!`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

export default connectMongoDB;
