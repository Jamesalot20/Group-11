const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Headers:', req.headers);
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided, access denied.' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token:', token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log('Decoded:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
console.error('Error:', error);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

exports.authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. You do not have permission to perform this action.' });
    }
    next();
  };
};
