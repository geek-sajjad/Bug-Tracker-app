const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  try {
    if(!req.headers.token) return res.status(400).json({message: 'token must be provided'});
    const token = req.headers.token;
    const decoded= jwt.verify(token, process.env.JWT_TOKEN, {
      algorithm: 'HS256',
    });
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.status(401).json({message:'token is not valid'})
  }
};
