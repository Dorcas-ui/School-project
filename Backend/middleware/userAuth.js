// middleware/userAuth.js
const jwt = require('jsonwebtoken');

function userAuth(req, res, next) {
  console.log('--- userAuth middleware called ---');
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  const authHeader = req.header('Authorization');
  console.log('Authorization header:', authHeader);
  const token = authHeader?.replace('Bearer ', '');
  console.log('Extracted token:', token);
  if (!token) {
    console.log('No token provided.');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('JWT decoded successfully:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = userAuth; // ✅ default export