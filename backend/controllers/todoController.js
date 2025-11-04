import todoModel from "../models/todoModel.js";


// add date for testing
export const testing = (req, res) => {
    res.send((new Date).toLocaleString())
}

// fetch all todos
export const getTodos = async (req, res) => {
    try {
        const todos = await todoModel.find();
        res.status(201).json(todos)
    } catch (error) {
        console.log("Error fetching todos.", error.message)
    }
}


// add new todo
export const addTodo = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(404).json({ message: "input field required." })
        }

        const todo = await todoModel.create({ text })
        res.status(201).json({ message: "todo added successfully.", data: todo })
    } catch (error) {
        console.log("Error adding todo.", error.message)
    }
}


// delete todo by id 
export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await todoModel.findByIdAndDelete(id);
        if (!deleteTodo) {
            return res.status(404).json({ message: "Todo not found" })
        }
        res.status(201).json({ message: "Todo deleted successfully", deletedTodo: deletedTodo })

    } catch (error) {
        console.log("Error deleting todo.", error.message)
    }
}

// update todo by id 
export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedTodo = await todoModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({
            message: "Todo updated successfully",
            updatedTodo: updatedTodo,
        });
    } catch (error) {
        console.error("Error updating todo:", error.message);
        res.status(500).json({ message: "Server error updating todo" });
        console.error("Error updating todo:", error.message);
        res.status(500).json({ message: "Server error updating todo" });
    }
};


// delete all todos
export const deleteAllTodos = async (req, res) => {
    try {
        await todoModel.deleteMany({})
        res.status(201).json({ message: "All todos deleted successfully" })

    } catch (error) {
        console.error("Error deleting all todos:", error.message);
        res.status(500).json({ message: "Server error updating todo" });
    }
}