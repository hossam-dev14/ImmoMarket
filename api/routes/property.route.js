import express from 'express';
import { 
  addProperty, 
  getProperty, 
  getAllProperties,
  updateProperty, 
  deleteProperty,
  getMyListing,
  searchProperties
} from '../controllers/property.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import uploadOptions from '../middleware/multer.middleware.js';

const router = express.Router();

// Uploding files
const uploadImage = uploadOptions.single('imageUrl');

// Tetst search
router.get('/get', searchProperties);

// Property route 
router.post('/add', isAuthenticated, uploadImage, addProperty);
router.get('/', isAuthenticated, getMyListing);
router.get('/all', getAllProperties);
router.get('/:id', getProperty);
router.put('/:id', isAuthenticated, uploadImage, updateProperty);
router.delete('/:id', isAuthenticated, deleteProperty);








export default router;
