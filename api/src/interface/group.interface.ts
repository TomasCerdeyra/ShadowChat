import mongoose from "mongoose"

interface group {
    mainUser: mongoose.Schema.Types.ObjectId
    users?: [string],
    messages?: [string]
}

export default group