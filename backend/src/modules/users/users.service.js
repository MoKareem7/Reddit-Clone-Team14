import mongoose from "mongoose";
import User from "./user.model.js";
import { AppError } from "../../shared/utils/AppError.js";

// The ONLY fields a user is allowed to change on their own profile
const EDITABLE_FIELDS = ["bio", "avatarUrl"];

// Find a user by id OR username, so the frontend can use /user/:username like Reddit
export async function getById(idOrUsername) {
  const value = String(idOrUsername).trim();

  const user = mongoose.isValidObjectId(value)
    ? await User.findById(value) // looks like a MongoDB id -> search by _id
    : await User.findOne({ username: value }); // otherwise -> search by username

  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
}

// Update the logged-in user's profile (only bio and avatarUrl)
export async function updateProfile(userId, data = {}) {
  // 1. Copy ONLY the allowed fields; everything else (username, email, passwordHash, _id...) is ignored
  const updates = {};
  for (const field of EDITABLE_FIELDS) {
    if (data[field] !== undefined) {
      if (typeof data[field] !== "string") {
        throw new AppError(400, `${field} must be text`, { field });
      }
      updates[field] = data[field].trim();
    }
  }

  // 2. Nothing to change? Tell them what they CAN change
  if (Object.keys(updates).length === 0) {
    throw new AppError(400, `Nothing to update. You can edit: ${EDITABLE_FIELDS.join(", ")}`);
  }

  // 3. Save and return the updated user
  const user = await User.findByIdAndUpdate(userId, updates, {
    new: true, // return the user AFTER the update (default is before)
    runValidators: true, // check the model's rules (bio max length, avatar URL format)
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
}