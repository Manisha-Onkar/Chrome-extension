const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(cors());
app.use(express.json());


const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "profiles.db"
});


const Profile = sequelize.define("Profile", {
  name: DataTypes.STRING,
  url: DataTypes.STRING,
  about: DataTypes.TEXT,
  bio: DataTypes.TEXT,
  location: DataTypes.STRING,
  followers: DataTypes.INTEGER,
  connections: DataTypes.INTEGER,
});


sequelize.sync();


app.post("/api/profile", async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json({ success: true, data: profile });
  } catch (err) {
    console.error("POST failed:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
