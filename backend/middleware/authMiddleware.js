const jwt = require("jsonwebtoken"); 
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
    // Get token from header or cookie
    let token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    if (token) token = token.trim();

    console.log('Cookies:', req.cookies);
    console.log('Authorization Header:', req.headers.authorization);
    console.log('Token to verify:', token);

    // Check if not token
    if (!token) return res.status(401).json({message: "Unauthorized"});

    // Verify token
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //decoded token
        req.user = decoded; 
        next();
    } catch(error){
        console.error("JWT verification error:", error);
        res.status(403).json({message: "Invalid token"})
    }
}
const protect = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(403).json({ message: "Invalid token" });
  }
};


// 🛡️ restrictTo: restrict access based on user role
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission' });
    }
    next();
  };
};

module.exports = {authMiddleware, protect, restrictTo};
