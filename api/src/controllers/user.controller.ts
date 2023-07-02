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
        res.status(500).json({ error: error._message, status: 500 });
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const loginUser = await users.makeLogin(req.body);
        if (loginUser === "USER_NOT_FOUND") return res.status(404).json({ message: 'User not found', status: 404 })
        if (loginUser === "PASSWORD_INCORRECT") return res.status(400).json({ message: "Incorrect password", status: 400 });
        return res.json({ message: "Logged in", response: loginUser });
    } catch (error: any) {        
        res.status(500).json({ error: error._message, status: 500 })
    }
}

const getItem = async (req: Request, res: Response) => {
    try {
        const getUniqueItem = await users.getUserByEmail(req.params.email);
        if (getUniqueItem === "USER_NOT_FOUND") return res.status(404).json({ message: "User not found", status: 404 });
        return res.json({ user: getUniqueItem });
    } catch (error: any) {
        res.status(500).json({ error: error._message, status: 500 });
    }
}

export { postItem, login, getItem };