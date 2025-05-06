import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("MongoDB connected");
        
    } catch (error) {
        console.log("MongoDB connection error", error);
    }
}