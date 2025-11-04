import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    const url = process.env.DB_URL;
    try {
        await mongoose.connect(url)
        console.log("DB Connected Successfully.")
    } catch (err) {
        console.log("DB Connection Error.", err.message)
    }
}

export default connectDB