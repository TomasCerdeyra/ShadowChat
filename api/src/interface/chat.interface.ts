import mongoose from "mongoose";

interface ChatTypes {
    user1: mongoose.Schema.Types.ObjectId;
    user2: mongoose.Schema.Types.ObjectId;
    messages?: [string]
}

export default ChatTypes;