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
  if (err.status) {
    res.status(err.status).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: "Internal server error",
  });
});

// app.listen(3000, () => {
//   console.log("server is listening on port 3000");
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, function () {
//   console.log(`Server running. Use our API on port: ${PORT}`);
// });

module.exports = app;
