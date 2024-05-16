import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import {CloudinaryStorage}  from 'multer-storage-cloudinary';


// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Optional - folder for the uploaded files
    allowed_formats: ['jpg', 'png', 'jpeg'], // Optional - allowed file formats
    // You can add more options here, see Cloudinary documentation for available options
  },
});

const upload = multer({ storage: storage });
export default upload;
