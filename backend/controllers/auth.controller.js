const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const signup=async ()=>{
      console.log("signup called");
      try {
        const { firstName,lastName, email, password, bio,gender } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName,lastName, email, password: hashedPassword, bio, gender });

        await user.save();
        res.status(201).json({'message':'User registered',"user":{"id":user._id,"name":user.name,"email":user.email}});   
      } catch (err) {
        res.status(500).json(err.message);
      }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json('Invalid credentials');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json(err.message);
}
};

module.exports = { signup, login };