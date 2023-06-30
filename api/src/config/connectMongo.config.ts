import mongoose from "mongoose";
import "dotenv/config";

const connectMongodb = async () => {
    try {
        const uri = <string>process.env.MONGO_URI;
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
    }
}

export default connectMongodb;