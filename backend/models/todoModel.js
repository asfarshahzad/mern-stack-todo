import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
        toLowerCase: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    important: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const todoModel = mongoose.model("Todo", todoSchema)

export default todoModel;