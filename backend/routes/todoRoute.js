import express from "express";
import { addTodo, deleteAllTodos, deleteTodo, getTodos, testing, updateTodo, } from "../controllers/todoController.js";

const router = express.Router();

router.get('/', testing)
router.post('/add', addTodo)
router.get('/todos', getTodos)
router.delete('/todos', deleteAllTodos)
router.delete('/delete/:id', deleteTodo)
router.patch('/update/:id', updateTodo)

export default router