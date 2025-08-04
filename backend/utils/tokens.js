const jwt=require('jsonwebtoken');
const User = require('../models/User');

const generateToken =async(user) => {
    try{
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1m' });
        return token;
    } catch (error) {
    console.log('Error generating token:', error);
}   
}
module.exports = { generateToken };