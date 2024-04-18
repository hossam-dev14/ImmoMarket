import express from 'express'
// import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'dotenv/config'
import { 
  signUp,
  signIn,
  signOut, 
  getAccessToken
} from '../controllers/auth.controller.js';
import { 
  verifyRefreshToken, 
  isAuthenticated 
} from '../middleware/auth.middleware.js';
import uploadOptions from '../middleware/multer.middleware.js';

const router = express.Router();

// Uploding files
const uploadImage = uploadOptions.single('avatar');


router.post('/signup', uploadImage, signUp); 
router.post('/signin', signIn);
router.post('/refresh-token', verifyRefreshToken, getAccessToken);
router.post('/signout', signOut);

export default router;
