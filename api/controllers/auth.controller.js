import User, { userValidation } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createError from '../helpers/createError.js';
const secret = process.env.JWT_SECRET;


export const signUp = async (req, res, next) => {
  const {username, email, phone, password, confirmPassword} = req.body;
  
  // Throw a custom error if any required field is missing
  if(!username || !email || !phone || !password || !confirmPassword) {
    return next(createError(400, 'All fields are required!'))
  }

  if (password !== confirmPassword) {
    return next(createError(400, 'Passwords do not match!'));
  }

  try {

    // Validate the user data using Joi
    const {error} = userValidation.validate(req.body);
    if (error) return next(createError(400, error.details[0].message));

    // check if user email exist in the database
    const userExist = await User.findOne({email})
    if(userExist) return next(createError(409, 'This E-mail already exist!'));

    // Create the new user
    const newUser  = new User({ username, email, phone, password });
    await newUser.save();
    
    res.
      status(201).
      json({ message: 'User created successfully', newUser });
  } catch (error) {
    next(error);
    // res.status(500).json({ error: 'User creation failed' });
  }
}

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if(!email || !password) return next(createError(400, 'Email and password are required.')); 
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({message: 'User not found!'});
    
    // Compare user's entered password with the stored hash
    const comparingPassword = await bcrypt.compare(password, user.password);
    if(!comparingPassword) return next(createError(400, 'Invalid Credential!'));

    const token = jwt.sign(
      { id: user._id },
      secret,
      {expiresIn: '1d'}
    );

    res.cookie(
        'access_token', 
        token, 
        { httpOnly: true }
      ).
      status(200).
      header('Authonrization', `Bearer ${token}`).
      json({message: `Welcome ${user.username} to your account!`});

  } catch (error) {
    next(error)
  }
};



export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};