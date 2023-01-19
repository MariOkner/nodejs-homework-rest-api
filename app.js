const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// middlewares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// routes
app.use("/api/contacts", contactsRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

// app.use((error, req, res, next) => {
//   if (error.status) {
//     return res.status(error.status).json({
//       message: error.message,
//     });
//   }

//   if (error.message.includes("Cast to ObjectId failed for value")) {
//     return res.status(400).json({
//       message: "id is invalid",
//     });
//   }

//   return res.status(500).json({
//     message: "Internal server error",
//   });
// });

module.exports = {
  app,
};
