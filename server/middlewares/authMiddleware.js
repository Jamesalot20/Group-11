const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.headers && req.headers['x-auth-token'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided, access denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

exports.authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied.' });
    }
    next();
  };
};
