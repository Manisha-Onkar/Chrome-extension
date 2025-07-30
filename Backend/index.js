
const express = require("express");
const cors = require("cors");
const { DataTypes } = require("sequelize");
const sequelize = require("./database");
const ProfileModel = require("./models/profile");

const app = express();
app.use(cors());
app.use(express.json());


const Profile = ProfileModel(sequelize, DataTypes);


sequelize.sync().then(() => {
  console.log("Database synced");
});

app.post("/api/profile", async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json({ success: true, data: profile });
  } catch (err) {
    console.error("POST /api/profile failed:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
