// User
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

const User = mongoose.model("User", userSchema);

export default User;