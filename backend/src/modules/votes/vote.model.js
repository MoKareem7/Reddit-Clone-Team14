
import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true
    },

    value: {
      type: Number,
      required: true,
      enum: [1, -1]
    }
  },
  {
    timestamps: true
  }
);

// A user can have only one vote per post
voteSchema.index(
  { userId: 1, postId: 1 },
  { unique: true }
);

// Retrieve all votes associated with a post
voteSchema.index({ postId: 1 });

const Vote = mongoose.model("Vote", voteSchema, "votes");

export default Vote;
