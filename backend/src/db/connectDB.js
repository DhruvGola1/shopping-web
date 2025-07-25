import mongoose from "mongoose";

const connectDB = async (DATA_URI) => {
  try {
    const DBName = {
      dbname: "userLoginData",
    };
    const result = await mongoose.connect(DATA_URI, DBName);
    console.log("Data is Connect successfully");
  } catch (error) {
    console.log("Error:MongoDB Is not Connected", error);
  }
};

export default connectDB;
