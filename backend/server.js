const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const feedbackRoutes = require("./routes/feedbackRoutes"); // ✅ correct path

const app = express();
app.use(cors());
app.use(express.json());

// ✅ use the imported variable, not require() again
app.use("/api/feedbacks", feedbackRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/feedbackDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(5000, () => console.log("✅ Server running on port 5000"));
