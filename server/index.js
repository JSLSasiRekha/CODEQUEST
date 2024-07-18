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
const submissionRoutes=require('./routes/submission');

connection();

// Middlewares
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// Configure CORS to allow requests from the frontend origin
const corsOptions = {
  origin: process.env.ORIGIN,
  // origin:"http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/code", codeRoutes);
app.use("/api/problems",problemRoutes);
app.use("/api/submissions",submissionRoutes)

const port = process.env.PORT || 8000;
app.listen({port,host: '0.0.0.0'}, () => console.log(`Listening on port ${port}`));
