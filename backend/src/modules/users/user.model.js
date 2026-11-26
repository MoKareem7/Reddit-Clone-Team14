
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 25,
      match: /^[a-z0-9_]+$/
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    passwordHash: {
      type: String,
      required: true,
      select: false
    },

    displayName: {
      type: String,
      trim: true,
      default: "",
      maxlength: 50
    },

    bio: {
      type: String,
      trim: true,
      default: "",
      maxlength: 300
    },

    avatarUrl: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema, "users");

export default User;
