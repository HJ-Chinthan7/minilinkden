const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { signup, login,logout } = require('../controllers/auth.controller');
const validateSignupFields = require('../middleware/validateSignupFields');

router.post('/register',validateSignupFields, signup);

router.post('/login', login);

router.get('/logout',logout);

module.exports = router;