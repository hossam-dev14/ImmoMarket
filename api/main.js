import express from "express";
import morgan from "morgan";
import connectMongoDB from "./config/database.js";
import authRouter from "./routes/auth.route.js";

import dotenv from 'dotenv';


// Loading environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Connect to mongodb
connectMongoDB();

// Middleware for parsing incoming requests data
app.use(express.json());

// Log requests to the console
app.use(morgan('tiny'));

// -------------- Test ------------------- //
// ------ Define routes for products
app.get('/api/test', (req, res) => {
  res.send(data);
  console.log(data);
});

app.use('/api/auth', authRouter);



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

app.listen(port, function(err){
  console.log(`Server is Run on ${"http://localhost:" + port}`);
})

