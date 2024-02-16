// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

UserSchema.pre("save", async function (next) {
  // Hash the password before saving the user
});

UserSchema.methods.verifyPassword = function (password) {
  // Verify the password
};

const User = mongoose.model("User", UserSchema);
export default User;
