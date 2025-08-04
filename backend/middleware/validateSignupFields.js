const User = require('../models/User');

const validateSignupFields = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, bio, gender } = req.body;
    
    if (!firstName || !lastName || !email || !password || !bio || !gender) {
     throw new Error( 'All fields are required' );
    }
    
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error(' Please provide a valid email address'  );
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long' );
    }
    
    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error('Password must contain at least one uppercase letter, one lowercase letter, and one number' );
    }
    
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = validateSignupFields;
