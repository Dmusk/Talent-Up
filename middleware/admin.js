import { Admin } from "../db/db.js";

export const adminMiddleware = async (req, res, next) => {
  // this is the adminMiddleware
  const username = req.headers.username;
  const password = req.headers.password;

  try {
    const admin = await Admin.findOne({
      username,
      password,
    });

    if (!admin) {
      res.status(404).json({
        msg: "Username and password is wrong",
      });
    }
  } catch (e) {
    res.send({
      msg: "Server Not Responding",
    });
  }

  next();
};
