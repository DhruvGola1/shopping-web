import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true },
  lastName: { type: String },
  email: { type: String, trim: true },
  password: { type: String, trim: true },
});

const userModel = mongoose.model("registorFrom", userSchema);

export default userModel;

// Task 3 Schema

const task3Schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const userTask3 = mongoose.model("UserTask3", task3Schema);

export { userTask3 };
