import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://Dadu:DaduMDB%402003@cluster0.mzwtfbm.mongodb.net/Udemy"
);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourse: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  imgLink: String,
  price: Number,
});

export const User = mongoose.model("User", userSchema);

export const Admin = mongoose.model("Admin", adminSchema);

export const Course = mongoose.model("Course", courseSchema);
