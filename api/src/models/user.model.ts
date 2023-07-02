import mongoose from "mongoose";
import User from "../interface/user.interface";

const chatsSchema = new mongoose.Schema({
  chats: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chats"
  }
});

const groupsSchema = new mongoose.Schema({
  groups: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Groups"
  }
})

const schema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    chats: [chatsSchema],
    groups: [groupsSchema],
    session_active: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const userModel = mongoose.model("Users", schema);

export default userModel;
