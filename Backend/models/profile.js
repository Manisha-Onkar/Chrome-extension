module.exports = (sequelize, DataTypes) => {

  const Profile = sequelize.define("Profile", {

    name: DataTypes.STRING,
    url: DataTypes.STRING,
    about: DataTypes.TEXT,
    bio: DataTypes.TEXT,
    location: DataTypes.STRING,
    followers: DataTypes.INTEGER,
    connections: DataTypes.INTEGER,

  });
  
  return Profile;
};
