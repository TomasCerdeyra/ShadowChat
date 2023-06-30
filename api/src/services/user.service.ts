import { Model } from "mongoose";
import User from "../interface/user.interface";
import userModel from "../models/user.model";
import { hashPassword } from "../utils/bcrypt";

class Users {
    collection: Model<User>
    constructor() {
        this.collection = userModel;
    }

    async createUser(user: User) {
        const checkIsUser = await this.collection.findOne({ name: user.name });

        if (checkIsUser) return "USER_ALREADY_EXISTS";

        const { name, email, password } = user;

        // Respuesta y hashear password antes de guardar en Mongo
        const response = {
            name,
            email,
            password: await hashPassword(password)
        }    
        const newUser = await this.collection.create(response);
        return newUser;
    }
}

const users = new Users();
export default users;