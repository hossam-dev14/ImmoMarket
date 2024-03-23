import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;

export const signUp = async (req, res) => {
  const {username, email, phone, password} = req.body;
  if(!username || !email || !phone || !password) {
    return res.status(400).json({message: 'All fields are required!'})
  }
  
  try {
    // check if user email exist in the database
    const userExist = await User.findOne({email})
    if(userExist) return res.status(409).json({ error: 'This E-mail already exist!' });

    const user = new User({ username, email, phone, password });
    await user.save();
    res.setHeader('Content-Type', 'text/plain');
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'User creation failed' });
  }
}

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if(!email || !password) res.status(400).json({message: 'Email and password are required.'}); 
  
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({message: 'User not found!'});
    
    // Compare user's entered password with the stored hash
    const comparingPassword = await bcrypt.compare(password, user.password);
    if(!comparingPassword) return res.status(400).json({message: 'Invalid Credential!'});

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
      header('Authonrization', `Bearer ${token}`)
      .json({message: `Welcome ${user.username} to your account!`});

  } catch (error) {
    next(error);
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