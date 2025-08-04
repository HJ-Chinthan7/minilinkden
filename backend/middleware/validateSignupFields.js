const User = require('../models/User');

const validateSignupFields = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, bio, gender } = req.body;
    if (!firstName || !lastName || !email || !password || !bio || !gender) {
      return next(new Error('All fields are required'));
    }
    if (password.length < 6) {
      return next(new Error('Password must be at least 6 characters long'));
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return next(new Error('Email already exists'));
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateSignupFields;