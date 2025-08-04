const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { signup, login } = require('../controllers/auth.controller');
const validateSignupFields = require('../middleware/validateSignupFields');

router.post('/register',validateSignupFields, signup);

router.post('/login', login);

module.exports = router;