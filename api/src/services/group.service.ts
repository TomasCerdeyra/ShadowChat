import mongoose, { Model } from "mongoose";
import group from "../interface/group.interface";
import groupModel from "../models/group.model";
import User from "../interface/user.interface";
import userModel from "../models/user.model";

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

    async getAddUserGroup(idGroup: string, email: string) {
  const userInvited = await this.users.findOne({ email });
  console.log(userInvited);
  

  const group = await this.collection.findOne({ _id: idGroup });

  if (group) {
    if (userInvited) {

      group.users?.push(`${userInvited._id}`)
      group.save()

      return 'USER_ADDED';
    } else {
      return 'USER_NOT_FOUND';
    }
  } else {
    return 'GROUP_NOT_FOUND';
  }
}

}

const groupService = new Group();

export default groupService