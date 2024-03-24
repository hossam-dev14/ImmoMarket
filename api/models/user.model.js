import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

const { Schema } = mongoose;
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 50;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 70;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, optional: true, unique: true },
  password: { type: String, required: true, min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH },
  confirmPassword: { type: String, optional: true, min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH }
}, { timestamps: true });

// Joi schema for user validation
const userValidation = Joi.object({
  username: Joi.string().required().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH).alphanum(),
  email: Joi.string().required().email(),
  phone: Joi.number().optional().integer().positive(),
  password: Joi.string().required().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
  confirmPassword: Joi.string().required().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH)
});

// Hash the user's password before saving it
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(13);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});


export default mongoose.model('User', userSchema);
export { userValidation };


// module.exports = mongoose.model('User', userSchema);
