import mongoose from "mongoose";
import group from "../interface/group.interface";


const userSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }
    }
)

const messageSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true
        },
        message: {
            type: String,
            required: true,
            trim: true
        }
    }
)

const schema = new mongoose.Schema<group>(
    {
        mainUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        users: [userSchema],
        messages: [messageSchema]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const groupModel = mongoose.model("Groups", schema)

export default groupModel;