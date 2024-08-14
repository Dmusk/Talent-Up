import express from "express";
import { User } from "../db/db.js";

export const userMiddleware = async (req, res, next) => {
  // take the username as the input from the header and then make the authentication
  const username = req.headers.username;
  const password = req.headers.password;

  try {
    const user = await User.findOne({
      username,
      password,
    });

    if (!user) {
      res.status(404).json({
        msg: "Username and password is wrong",
      });
    }
  } catch (e) {
    res.send("Server Not Responding");
  }

  next();
};
