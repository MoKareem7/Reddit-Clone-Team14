
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    communityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 300
    },

    content: {
      type: String,
      trim: true,
      default: "",
      maxlength: 40000
    },

    imageUrl: {
      type: String,
      default: ""
    },

    score: {
      type: Number,
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: "Post score must be an integer"
      }
    },

    status: {
      type: String,
      enum: ["active", "deleted", "removed"],
      default: "active"
    },

    removedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Global feed: New
postSchema.index({
  status: 1,
  createdAt: -1,
  _id: -1
});

// Global feed: Top
postSchema.index({
  status: 1,
  score: -1,
  createdAt: -1,
  _id: -1
});

// Community feed: New
postSchema.index({
  communityId: 1,
  status: 1,
  createdAt: -1,
  _id: -1
});

// Community feed: Top
postSchema.index({
  communityId: 1,
  status: 1,
  score: -1,
  createdAt: -1,
  _id: -1
});

// Posts created by a particular user
postSchema.index({
  authorId: 1,
  createdAt: -1
});

const Post = mongoose.model("Post", postSchema, "posts");

export default Post;
