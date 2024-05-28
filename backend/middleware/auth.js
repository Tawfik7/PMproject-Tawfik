// middleware/auth.js
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Authentication token missing or invalid');
      throw new Error('Authentication token missing or invalid');
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Token received:', token);

    const tokenRecord = await Token.findOne({ token });
    if (!tokenRecord) {
      console.log('Invalid token');
      throw new Error('Invalid token');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decodedToken);

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      console.log('User not found');
      throw new Error('User not found');
    }

    req.user = { userId: user._id, role: user.role };
    next();
  } catch (error) {
    let errorMessage = 'Authentication failed';
    if (error.name === 'JsonWebTokenError') {
      errorMessage = 'Invalid token';
    } else if (error.name === 'TokenExpiredError') {
      errorMessage = 'Token expired';
    }
    console.log('Error: ', error.message);
    res.status(401).json({ message: errorMessage });
  }
};
