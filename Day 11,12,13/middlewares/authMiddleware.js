const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
  const auth = req.headers["authorization"];
  const bearer = auth.split(" ")[0];
  const token = auth.split(" ")[1];

  if (!auth || bearer !== "Bearer") {
    return res.status(401).json({ error: "no token" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: `Welcome to your dashboard, ${user.username}!` });
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
