import { Request, Response } from "express";
import users from "../services/user.service";

const postItem = async (req: Request, res: Response) => {
    try {
        const postUser = await users.createUser(req.body);        
        if (postUser === "USER_ALREADY_EXISTS") return res.status(400).json({ message: 'User already exists', status: 400 });
        const finalResponse = {
            name: postUser.name,
            email: postUser.email,
        }
        res.status(201).json({ message: 'User created', newUser: finalResponse, status: 201 });
    } catch (error: any) {
        console.log(error);
        
        res.status(500).json({ error: error._message });
    }
}

export { postItem };