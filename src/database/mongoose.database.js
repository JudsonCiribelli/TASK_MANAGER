const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://judsonciribelli:32351022@taskmanagercluster.vgcoy.mongodb.net/?retryWrites=true&w=majority&appName=TaskManagerCluster"
    ),
      () => {
        console.log("Connect to MongoDB");
      };
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectToDatabase;
