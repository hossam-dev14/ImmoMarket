import { v2 as cloudinary } from 'cloudinary';
import User, { 
  // userValidation 
} from '../models/user.model.js';
import createError from '../helpers/createError.js';

// Retrive all Users profile
export const getUsers = async (req,res, next) => {
  try{
    const users = await User.find().select('-password');
    if(!users) return next(createError(500, 'The users was not found!'));
    res.status(200).json({ users })
  } catch (error) {
    next(error)
  }
}

// Get User Details
export const getUserDetails = async (req, res, next) => {
  try{
    const user = await User.findById(req.user).select('-password');
    if(!user) return next(createError(404, 'User not found!'));

    res.status(200).json({ success: true, user })

  } catch (error) {
    next(createError(500, 'Server error!'));
  }
};

// Update user
export const updateUser = async (req, res, next) => {
  const {username, email, phone, avatar} = req.body;

  try {
    // Validate the user data using Joi
    // const {error} = userValidation.validate({username, email, phone});
    // if (error) return next(createError(400, error.details[0].message));
    
    // Get the uploaded file
    const file = req.file;
    let avatarUrl;
    
    // Check if file was uploaded
    if (file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(file.path);

      // If file was uploaded, construct full avatar URL
      avatarUrl= result.secure_url;
    }

    // find and Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user, 
      {username, email, phone, avatar: avatarUrl }, 
      { new: true }).select("-password");

    if (!updatedUser) {
      return next(createError(404, 'User not found'));
    }
    res.
      status(200).json({ 
        seccuss: 'User updated successfully.',
        updatedUser
      });

  } catch (error) {
    next(error);
  }
}

// Delete user from the database
export const deleteUser = async (req, res, next) => {
  const user = req.user
  if(!user) return next(createError('User not found!'));

  try{
    await User.findByIdAndDelete(user);

    res.
      status(200).
      json('User deleted successfully!');
  } catch (error) {
    next(error)
  }
}
