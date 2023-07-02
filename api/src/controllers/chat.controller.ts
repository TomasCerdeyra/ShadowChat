import { Request, Response } from "express";
import chat from "../services/chat.service";

const createItem = async (req: Request, res: Response) => {
    const { user1, user2 } = req.params;
    try {
        const createItem = await chat.createNewChat(user1, user2);
        if (createItem === "CHAT_CREATED") return res.status(201).json({ message: "Chat created successfully", status: 201 })
        if (createItem === "ERROR_TO_CREATE_CHAT") return res.status(400).json({ message: "Error to create the chat", status: 400 });
    } catch (error: any) {
        console.log(error);
        
        res.status(500).json({ error: error._message });
    }
}

export { createItem };