import express from "express";
import { adminMiddleware } from "../middleware/admin.js";
import { Admin, Course } from "../db/db.js";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const router = express.Router();

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await Admin.findOne({
    username: username,
    password: password,
  });

  if (!user) {
    await Admin.create({
      username: username,
      password: password,
    });

    res.status(200).json({
      msg: "Admin Created Successfully",
    });
  } else {
    res.send("Admin Already Exists");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Admin.findOne({ username, password });

  if (user) {
    const token = jwt.sign({ username }, process.env.JWT_KEY);

    res.status(200).json({
      msg: "Admin Logged In Successfully",
      token,
    });
  } else {
    res.status(401).send("Admin Not Authenticated");
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const imgLink = req.body.imgLink;
  const price = req.body.price;

  const course = await Course.create({
    title,
    description,
    imgLink,
    price,
  });

  res.json({
    msg: "Course Added Successfully",
    courseId: course._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const course = await Course.find({});
  res.json({
    course: course,
  });
});

export default router;
