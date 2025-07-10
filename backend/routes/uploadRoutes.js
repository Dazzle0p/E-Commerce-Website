const express = require("express");
const multer = require("multer"); /*Multer is a Node.js middleware designed to handle multipart/form-data, which is primarily used for file uploads in web applications*/
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const router = express.Router();

require("dotenv").config();

// Cloudinary Configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup using memory storage

const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route POST /api/upload
// @desc Upload single image
// @access Private

router.post("/", upload.single("image"), async (req, res) => {
  console.log("Headers:", req.headers); // check for Content-Type
  console.log("File:", req.file);

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file Uploaded" });
    }

    // Function to handle the stream upload to Cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        // Use streamifier to convert file buffer to a stream
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };
    // Call the streamUpload function to upload the file
    const result = await streamUpload(req.file.buffer);

    // Respond with the uploaded image URL
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
