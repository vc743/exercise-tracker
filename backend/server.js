require("dotenv").config();

const express = require("express");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const app = express();
const mongoose = require("mongoose");
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
