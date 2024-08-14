import express from "express";

import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";
import bodyParser from "body-parser";

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.get("/home", (req, res) => {
  res.send("HOME PAGE");
});

app.use("/user", userRouter);

app.use("/admin", adminRouter);

app.listen(PORT, (req, res) => {
  console.log(`Port is running on ${PORT}`);
});
