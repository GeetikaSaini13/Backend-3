const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const transferRoutes = require("./routes/transferRoutes");

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/bankDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed", err));

// Routes
app.use("/", transferRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
