const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Products = require("./data/products");

dotenv.config();

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed Data

const seedData = async () => {
  try {
    //Clear Existing Data
    await Product.deleteMany();
    await User.deleteMany();

    //Create a Default Admin User
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    // Assign Default User Id to each product

    const userID = createdUser._id;

    const sampleProducts = Products.map((product) => {
      return { ...product, user: userID };
    });

    await Product.insertMany(sampleProducts);
    console.log("Product data seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding the data:", error);
    process.exit(1);
  }
};

seedData();
