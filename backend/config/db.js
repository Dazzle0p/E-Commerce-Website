const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB Connected SuccessFully");
  } catch {
    console.error("Mongo db CONNECTION FAILED");
    process.exit(1);
  }
};

module.exports = connectDB;
