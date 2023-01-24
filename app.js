const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { contactsRouter } = require("./routes/api/contacts");
const { authRouter } = require("./routes/api/auth");
const { userRouter } = require("./routes/api/user");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// middlewares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// routes
app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// error handling
app.use((error, req, res, next) => {
  if (error.message === "ValidationError") {
    return res.status(400).json({
      message: error.message,
    });
  }

  if (error.message.includes("Cast to ObjectId failed for value")) {
    return res.status(400).json({
      message: "id is invalid",
    });
  }

  res.status(error.status || 500).json({
    message: error.message || "Internal server error",
  });
});

module.exports = {
  app,
};
