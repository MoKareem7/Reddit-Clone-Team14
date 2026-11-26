
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10000
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

// Retrieve top-level comments and replies for a post
commentSchema.index({
  postId: 1,
  parentCommentId: 1,
  createdAt: 1,
  _id: 1
});

// Retrieve comments written by a particular user
commentSchema.index({
  authorId: 1,
  createdAt: -1
});

const Comment = mongoose.model(
  "Comment",
  commentSchema,
  "comments"
);

export default Comment;
