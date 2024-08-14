import express from "express";
import { adminMiddleware } from "../middleware/admin.js";
import { Admin, Course } from "../db/db.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({
    username: username,
    password: password,
  });
  res.status(200).json({
    msg: "Admin Created Successfully",
  });
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
    msg: "Course Added Successfully" + course._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const course = await Course.find({});
  res.json({
    course: course,
  });
});

export default router;
