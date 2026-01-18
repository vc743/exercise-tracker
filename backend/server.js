require("dotenv").config();

const express = require("express");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const app = express();
const mongoose = require("mongoose");

// Configure CORS
const allowedOrigins = [
  "http://localhost:5173", // Desarrollo local
];

// Agregar URL del frontend desde variable de entorno si existe
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

// Permitir cualquier subdominio de vercel.app
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (como Postman o mobile apps)
    if (!origin) return callback(null, true);

    // Permitir localhost
    if (origin.startsWith("http://localhost")) {
      return callback(null, true);
    }

    // Permitir cualquier subdominio de vercel.app
    if (origin.includes(".vercel.app")) {
      return callback(null, true);
    }

    // Permitir orígenes específicos configurados
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Permitir origen personalizado si está configurado
    if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));
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
