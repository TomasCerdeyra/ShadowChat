import mongoose, { Model } from "mongoose";
import group from "../interface/group.interface";
import groupModel from "../models/group.model";
import User from "../interface/user.interface";
import userModel from "../models/user.model";
import { ObjectId } from "mongodb";

class Group {
    collection: Model<group>
    users: Model<User>
    constructor() {
        this.collection = groupModel
        this.users = userModel
    }

    async getCreateGroup(mainUser: string) {

        const group = await this.collection.create({
            mainUser,
            users: [],
            messages: []
        })

        if (group) return 'GROUP_CREATE'
        else return 'ERROR_TO_CREATE_GROUP'
    }

    async postAddUserGroup(idGroup: string, email: string) {
        const userInvited = await this.users.findOne({ email });
        const group = await this.collection.findOne({ _id: idGroup });

        const userId = new ObjectId(userInvited?._id);

        if (group?.users?.some(user => new ObjectId(user).equals(userId))) return 'USER_ALREADY_IN_GROUP'

        if (group) {
            if (userInvited) {
                //Verifico que el usuario a ingresar no este en el grupo
                if (group?.users?.includes(`${userInvited._id}`)) return 'USER_ALREADY_IN_GROUP'

                group.users?.push(`${userInvited._id}`)
                group.save()

                userInvited.groups?.push(`${group._id}`)
                userInvited.save()

                return 'USER_ADDED';
            } else {
                return 'USER_NOT_FOUND';
            }
        } else {
            return 'GROUP_NOT_FOUND';
        }
    }

    async postDeleteUser(idGroup: string, email: string) {
        const userDelete = await this.users.findOne({ email });
        const group = await this.collection.findOne({ _id: new ObjectId(idGroup) });

        if (!userDelete) return 'USER_NOT_FOUND'

        const users = await this.collection.updateMany(
            { _id: new ObjectId(idGroup) },
            { $pull: { users: { _id: new ObjectId(userDelete?._id) } } }
        );

        return 'USER_DELETED'
    }

}

const groupService = new Group();

export default groupService