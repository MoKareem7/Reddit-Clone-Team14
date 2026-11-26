
import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      match: /^[a-z0-9_]+$/
    },

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500
    },

    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    iconUrl: {
      type: String,
      default: ""
    },

    bannerUrl: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

// Find communities created by a particular user
communitySchema.index({ creatorId: 1, createdAt: -1 });

const Community = mongoose.model(
  "Community",
  communitySchema,
  "communities"
);

export default Community;
