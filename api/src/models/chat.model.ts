import mongoose from "mongoose";
import ChatTypes from "../interface/chat.interface";

const messagesSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  messages: {
    type: String,
    trim: true,
  },
});

const schema = new mongoose.Schema<ChatTypes>(
  {
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: true,
      ref: "Users",
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: true,
      ref: "Users",
    },
    messages: [messagesSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const MessagesModel = mongoose.model('chats', schema);
export default MessagesModel;