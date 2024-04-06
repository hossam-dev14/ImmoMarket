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

// Retrive user porfile by ID
export const getUser = async (req, res, next) => {
  
  try{
    const user = await User.findById(req.userId).select('-password');
    if(!user) return next(createError(404, 'User not found!'));

    res.status(200).json(user)

  } catch (error) {
    next(createError(500, 'Server error!'));
  }
};

export const updateUser = async (req, res, next) => {
  const {username, email, phone} = req.body;

  try {

    // // Validate the user data using Joi
    // const {error} = userValidation.validate(req.body);
    // if (error) return next(createError(400, error.details[0].message));
    // find and Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      req.body,
      { new: true }
      ).select("-password");
      // const newUser = new User({ username, email, phone, password });
      // await updatedUser.save();
      
      console.log(updatedUser);
    res.
      status(200).json({ 
        message: 'User updated successfully.',
        updatedUser
      });

  } catch (error) {
    next(error);
    res.status(500).json({ error: 'User update failed' });
  }
}

export const deleteUser = async (req, res, next) => {
  try{
    // if(!user) return next(createError('User not found!'));
    await User.findByIdAndDelete({_id: req.params.id})
    res.
      status(200).
      json('User deleted successfully!');
 
  } catch (error) {
    next(error)
  }
}
