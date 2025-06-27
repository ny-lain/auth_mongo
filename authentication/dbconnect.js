// STEP-1 : IMPORT MONGOOSE PACKAGE
const mongoose = require('mongoose');

// STEP-2 : SET CONNECTION URL FOR LOCAL MONGODB CONTAINER
const uri = "mongodb://mongo:27017/auppdb"; // 'mongo' is the Docker service name

// STEP-3 : CONNECT TO MONGODB USING MONGOOSE
mongoose.connect(uri)
.then(() => {
  console.log("Connected to MongoDB container successfully!");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

// STEP-4 : EXPORT THE CONNECTION
module.exports = mongoose;
