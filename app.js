require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// connect DB

const connectDB = require("./db/connect.js");
const authenticateUser = require("./middleware/authentication.js");

// routers
const AuthRouter = require("./routes/auth.js");
const JobsRouter = require("./routes/jobs.js");

// error handler
const notFoundMiddleware = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");

// middleware

app.use(express.json());

// routes

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/jobs", authenticateUser, JobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port : ${port} `));
  } catch (error) {
    console.log(error);
  }
};

start();
