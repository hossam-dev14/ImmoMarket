import express from 'express'
// import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'dotenv/config'
import { 
  signUp,
  signIn,
  // signOut 
} from '../controllers/auth.controller.js';
import { 
  validateSignUp, 
  validateSignIn 
} from '../helpers/validate.js';
// import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// router.post('/signup', async (req, res) => {
//   const { username, email, password } = req.body;

//   // encrypt the password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = bcrypt.hashSync(password, salt);
  
//   if(!username || !email || !password) {
//     return res.status(400).send({
//       message: "Please provide all fields"
//     });
//   }
  
//   const newUser = new User({ 
//     username, email, password: hashedPassword
//   });

//   console.log('New User:', newUser);
  
//   try {
//     await newUser.save();
//     res.status(201).json({ 
//       message: 'User created successfully',
//       newUser
//     });
//   } catch (err) {
//       return res.status(501).json(err.message);
//   }
// });


// test
router.post('/signup', signUp)
router.post('/signin', signIn)
// router.post('/signout', signOut)

// router.post('/dashboard', verifyToken, dashdoard)

export default router;
