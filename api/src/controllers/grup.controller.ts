import { Request, Response } from "express";
import groupService from "../services/group.service";


const getCreateItem = async (req: Request, res: Response) => {
    try {
        const newGroup = await groupService.getCreateGroup(req.params.mainUser)

        if (newGroup === 'ERROR_TO_CREATE_GROUP') return res.status(400).json({ mesagge: 'Group not found', status: 400 })

        if (newGroup === 'GROUP_CREATE') return res.status(201).json({ mesagge: 'Group created', status: 201 })
    } catch (error: any) {
        res.status(500).json({ error: error._message, status: 500 });
    }
}

const getAddItem = async (req: Request, res: Response) => {
    const { idGroup } = req.params;
    try {
        const addUser = await groupService.postAddUserGroup(idGroup, req.body.email)

        if (addUser === 'GROUP_NOT_FOUND') return res.status(404).json({ message: 'Group not found', status: 404 })

        if (addUser === 'USER_NOT_FOUND') return res.status(404).json({ message: 'User not found', status: 404 })

        if (addUser === 'USER_ALREADY_IN_GROUP') return res.status(400).json({ mesagge: 'User already in group', status: 400 })

        if (addUser === 'USER_ADDED') return res.status(201).json({ message: 'User added', status: 201 })
    } catch (error: any) {
        console.log(error);

        return res.status(500).json({ error: error._mesagge })
    }
}

const postDeleteItem = async (req: Request, res: Response) => {
    const { idGroup } = req.params;
    try {
        const userDeleted = await groupService.postDeleteUser(idGroup, req.body.email)

        if(userDeleted === 'USER_NOT_FOUND')return res.status(404).json({ message: 'User not found' })
        if (userDeleted === 'USER_DELETED') return res.json({ message: 'User Deleted' })
    } catch (error: any) {
        return res.status(500).json({ error: error._mesagge })
    }
}


export {
    getCreateItem,
    getAddItem,
    postDeleteItem

}