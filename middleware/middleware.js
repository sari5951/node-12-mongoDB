const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    return next();
    const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.headers['authorization'].split(' ').pop();

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    // TODO: check it payload is valid - belongs to existing user & didnt expired
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}

module.exports = authMiddleware;