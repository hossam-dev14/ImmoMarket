import User, { userValidation } from '../models/user.model.js';
import createError from '../helpers/createError.js';

/**
 * Update User profile
 * Retrive User profile
 * Delete User profile
 */

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
  // console.log('User ID: ', req.user);
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
  const {username, email, phone} = req.body;
  try {
    // // Validate the user data using Joi
    // const {error} = userValidation.validate({username, email, phone});
    // if (error) return next(createError(400, error.details[0].message));

    // find and Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user, {username, email, phone}, { new: true }).select("-password");

    res.
      status(200).json({ 
        seccuss: 'User updated successfully.',
        updatedUser
      });

  } catch (error) {
    res.status(500).json({ error: 'User update failed' });
    next(error);
  }
}

export const deleteUser = async (req, res, next) => {
  try{
    // if(!user) return next(createError('User not found!'));
    await User.findByIdAndDelete(req.user)
    res.
      status(200).
      json('User deleted successfully!');
  } catch (error) {
    next(error)
  }
}
