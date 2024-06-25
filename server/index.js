require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require("./db");
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const codeRoutes = require('./routes/compile');

connection();

// Middlewares
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// Configure CORS to allow requests from the frontend origin
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/code", codeRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));
