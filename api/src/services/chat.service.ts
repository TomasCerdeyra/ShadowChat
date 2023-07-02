import { Model } from "mongoose";
import ChatTypes from "../interface/chat.interface";
import MessagesModel from "../models/chat.model";

class Chat {
    collection: Model<ChatTypes>
    constructor() {
        this.collection = MessagesModel;
    }

    async createNewChat(user1: string, user2: string) {
        const newChat = await this.collection.create({
            user1,
            user2,
            messages: []
        });

        if (newChat) return "CHAT_CREATED";
        else return "ERROR_TO_CREATE_CHAT";
    }
}

const chat = new Chat();
export default chat;