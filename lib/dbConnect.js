import mongoose from "mongoose";
const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/test");
        console.log("MongoDB connected 🚀");
    } catch (error) {
        console.error("DB Connection Error:", error.message);
    }
};

export default dbConnect;
