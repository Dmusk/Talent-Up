import express from "express";
import { userMiddleware } from "../middleware/user.js";
import zod, { string } from "zod";
import { Admin, Course, User } from "../db/db.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await User.create({
    username,
    password,
  });
  res.status(200).json({
    msg: "User Created Successfully",
  });
});

router.get("/courses", async (req, res) => {
  const course = await Course.find({});
  res.json({
    course: course,
  });
});

router.post("/courses/:id", userMiddleware, async (req, res) => {
  const courseId = req.params.id;
  const username = req.headers.username;

  try {
    await User.updateOne(
      {
        username,
      },
      {
        $push: {
          purchasedCourse: courseId,
        },
      }
    );
    res.json({
      msg: "Purchased Successfull",
    });
  } catch (e) {
    res.send("Something went worng");
  }
});

router.get("/purchasecourses", userMiddleware, async (req, res) => {
  const user = await User.findOne({
    username: req.headers.username,
  });

  console.log(user.purchasedCourse);

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourse,
    },
  });

  res.send(courses);
});

export default router;
