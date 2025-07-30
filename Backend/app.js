const express = require("express");
const cors = require("cors");
const path = require("path");
const { sequelize, Profile } = require("./models");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.post("/api/profile", async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json({ success: true, data: profile });
  } catch (err) {
    console.error("POST /api/profile failed:", err);
    res.status(500).json({ success: false, message: "Failed to save profile." });
  }
});


app.get("/api/profile", async (req, res) => {
  try {
    const profiles = await Profile.findAll();
    res.status(200).json({ success: true, data: profiles });
  } catch (err) {
    console.error("GET /api/profile failed:", err);
    res.status(500).json({ success: false, message: "Failed to fetch profiles." });
  }
});


app.get("/view", (req, res) => {
  res.sendFile(path.join(__dirname, "Chrome Extension", "view-profiles.html"));
});


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
