import { Model } from "mongoose";
import User from "../interface/user.interface";
import userModel from "../models/user.model";
import { checkPassword, hashPassword } from "../utils/bcrypt";
import LoginTypes from "../interface/loginTypes.interface";
import { generateJWT } from "../utils/jwt.utils";

class Users {
    collection: Model<User>
    constructor() {
        this.collection = userModel;
    }

    async getUserByEmail(email: string) {
        const getUser = await this.collection.findOne({ email }).select("-_id -createdAt -updatedAt -password");
        if (!getUser) return "USER_NOT_FOUND";
        return getUser;
    }

    async createUser(user: User) {
        const checkIsUser = await this.collection.findOne({ name: user.name });

        if (checkIsUser) return "USER_ALREADY_EXISTS";

        const { name, email, password } = user;

        // Respuesta y hashear password antes de guardar en Mongo
        const response = {
            name,
            email,
            password: await hashPassword(password),
            chats: [],
            groups: []
        }    
        const newUser = await this.collection.create(response);
        return newUser;
    }

    async makeLogin(body: LoginTypes) {
        const { email, password } = body;

        const findUser = await this.collection.findOne({ email }).select('-_id -createdAt -updatedAt');
        if (!findUser) return "USER_NOT_FOUND";

        const verifyPassword = await checkPassword(password, findUser.password);
        const token = await generateJWT(findUser?.email);

        if (token) {
            if (findUser.session_active === false) {
                const sessionStatus = { session_active: true };
                await this.collection.findOneAndUpdate({ email }, sessionStatus, { new: true });
                findUser.session_active = true;
            }
        }

        const finalResponse = {
            user: {
                name: findUser.name,
                email: findUser.email,
                session_active: findUser.session_active
            },
            access_token: token,
            status: 200
        };

        if (verifyPassword) return finalResponse;
        else return "PASSWORD_INCORRECT";
    }
}

const users = new Users();
export default users;