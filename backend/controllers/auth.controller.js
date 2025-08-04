const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const signup=async (req,res)=>{
      console.log("signup called");
      try {
        const { firstName,lastName, email, password, bio,gender } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName,lastName, email, password: hashedPassword, bio, gender });

        await user.save();
        res.status(201).json({
          'message': 'User registered successfully',
          "user": {
            "id": user._id,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "bio": user.bio,
            "gender": user.gender
          }
        });   
      } catch (err) {
        res.status(500).json(err.message);
      }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    res.json({ 
      message: 'Login successful',
      token, 
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        gender: user.gender
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
}
};

module.exports = { signup, login };