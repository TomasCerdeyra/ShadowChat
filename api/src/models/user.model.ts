import mongoose from "mongoose";
import user from "../interface/user.interface";

const schema = new mongoose.Schema<user> ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    messages: [
        {
            userName: String,
            message: String,
            trim: true
        }
    ],
    password: {
        type: String,
        required: true,
        trim: true
    }
})

const userModel = mongoose.model('Users', schema)

export default userModel