
import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    communityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true
    },

    joinedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false
  }
);

// A user can join a particular community only once
membershipSchema.index(
  { userId: 1, communityId: 1 },
  { unique: true }
);

// Retrieve members of a particular community
membershipSchema.index({ communityId: 1, joinedAt: -1 });

const Membership = mongoose.model(
  "Membership",
  membershipSchema,
  "memberships"
);

export default Membership;
