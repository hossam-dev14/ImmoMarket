import express from 'express';
import { 
  addProperty, 
  getProperty, 
  getAllProperties,
  updateProperty, 
  deleteProperty,
  getMyListing,
} from '../controllers/property.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import uploadOptions from '../middleware/multer.middleware.js';

const router = express.Router();

// Uploding files
const uploadImage = uploadOptions.single('imageUrl');


// test Upload route
// router.post('/upload', isAuthenticated, uploadMiddleware, uploadImage);

// Property route 
router.post('/add', isAuthenticated, uploadImage, addProperty);
router.get('/', isAuthenticated, getMyListing);
router.get('/all', getAllProperties);
router.get('/:id', getProperty);
router.put('/:id', isAuthenticated, updateProperty);
router.delete('/:id', isAuthenticated, deleteProperty);

export default router;
