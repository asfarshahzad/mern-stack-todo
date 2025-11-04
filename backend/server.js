import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/todoRoute.js";
import cors from "cors"

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors())

connectDB();

app.use('/api', router)

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on PORT", PORT)
})