const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.ensureAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    
    token = token.split(' ')[1];
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token not valid' });
  }
};