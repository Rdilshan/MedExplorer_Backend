const jwt = require("jsonwebtoken");

const secret = "your_jwt_secret";

exports.authMiddleware = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid authorization' });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.sendStatus(403);
  }
};
