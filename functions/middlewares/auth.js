const jwt = require("jsonwebtoken");

async function auth (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, result) => {
        req.userId = result?.id;
        next();
      });
    } else {
      res.status(403).send("There is no token");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = auth;
