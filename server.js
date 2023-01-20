const mongoose = require("mongoose");
const { app } = require("./app");

const dotenv = require("dotenv");
dotenv.config();

mongoose.set("strictQuery", false);

const { HOST_URL } = process.env;
const PORT = 3000;

async function main() {
  try {
    await mongoose.connect(HOST_URL);
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
