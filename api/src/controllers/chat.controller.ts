import { Request, Response } from "express";
import chat from "../services/chat.service";
import { ObjectId } from "mongodb";

const createItem = async (req: Request, res: Response) => {
    const { user1, user2 } = req.params;
    try {
        const createItem = await chat.createNewChat(user1, user2);
        if (createItem === "CHAT_CREATED") return res.status(201).json({ message: "Chat created successfully", status: 201 })
        if (createItem === "ERROR_TO_CREATE_CHAT") return res.status(400).json({ message: "Error to create the chat", status: 400 });
    } catch (error: any) {
        console.log(error);
        
        res.status(500).json({ error: error.message });
    }
}

const postItems = async (req: Request, res: Response) => {
    const { id_chat } = req.params;

    try {
        const findChat = await chat.sendMessages(id_chat, req.body)

        if (findChat === "CHAT_NOT_FOUND") return res.status(404).json({ message: "Chat not found", status: req.statusCode })

        if (findChat === "MESSAGE_SENDED") return res.json({ message: "Message sended", status: 200 })
    } catch (error: any) {
        console.log(error.message);
        
        res.status(500).json({ error: error.message });
    }
}

export { createItem, postItems };