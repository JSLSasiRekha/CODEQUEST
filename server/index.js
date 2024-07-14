require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require("./db");
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const codeRoutes = require('./routes/compile');
const problemRoutes=require('./routes/problem');

connection();

// Middlewares
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// Configure CORS to allow requests from the frontend origin
const corsOptions = {
  origin: 'https://codequest-sasirekha.onrender.com',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/code", codeRoutes);
app.use("/api/problems",problemRoutes);
if (process.env.MODE === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "build", "index.html")));
} else {
  app.get("/", (req, res) => {
    res.send("Welcome to the home page");
  });
}

const port = process.env.PORT || 8000;
app.listen({port,host: '0.0.0.0'}, () => console.log(`Listening on port ${port}`));
