export const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("Authorization header is missing");
    }

    const words = token.split(" ");
    if (words[0] !== "Bearer" || !words[1]) {
      return res.status(401).send("Invalid token format");
    }

    const jwtToken = words[1];
    const decoded = jwt.verify(jwtToken, process.env.JWT_KEY);

    if (decoded.username) {
      next();
    } else {
      res.status(401).send("User is not Authenticated");
    }
  } catch (error) {
    res.status(401).send("Invalid token or user not authenticated");
  }
};
