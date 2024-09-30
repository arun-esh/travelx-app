const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

mongoose.set("strictQuery", false);
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1); // Exit the process if the DB connection fails
  });

const port = process.env.PORT || 7473;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
