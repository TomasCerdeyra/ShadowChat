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

    async sendMessages(id: string, message: string) {
        console.log(message);
        
        const findChat = await this.collection.findOne({ _id: id });
        
        if (!findChat) return "CHAT_NOT_FOUND"
        
        const sendMessage = await this.collection.updateOne({ _id: id}, { $push: { messages: message } }, { new: true })
            
        if (sendMessage.modifiedCount === 1) return "MESSAGE_SENDED"
    }
}

const chat = new Chat();
export default chat;