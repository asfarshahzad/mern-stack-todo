import TodoItem from "./TodoItem";
import { motion } from "framer-motion";

const TodoList = ({ todos, setTodos, filter, loading }) => {
    const getEmptyMessage = () => {
        switch (filter) {
            case "completed":
                return {
                    title: "No completed tasks found",
                    desc: "Mark a task as completed to see it here",
                };
            case "active":
                return {
                    title: "No active tasks found",
                    desc: "All tasks are completed or marked important",
                };
            case "important":
                return {
                    title: "No important tasks found",
                    desc: "Mark a task as important to see it here",
                };
            default:
                return {
                    title: "No tasks found",
                    desc: "Add a new task to get started",
                };
        }
    };

    const { title, desc } = getEmptyMessage();

    const SkeletonLoader = () => (
        <div className="rounded-2xl bg-gray-200 animate-pulse h-32 sm:h-40 w-full"></div>
    );

    if (loading) {
        return (
            <div className="rounded-2xl bg-gray-50 flex justify-center items-center p-3 sm:p-8">
                <SkeletonLoader />
            </div>
        );
    }

    if (!loading && todos.length === 0) {
        return (
            <motion.div
                className="rounded-2xl p-4 sm:p-12 text-center bg-gray-100 mx-2 shadow-md sm:mx-0"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="text-gray-700 bg text-sm sm:text-lg mb-2 font-medium">{title}</div>
                <div className="text-gray-500 text-xs sm:text-base">{desc}</div>
            </motion.div>
        );
    }

    return (
        <div className="space-y-2 sm:space-y-4 mx-2 sm:mx-0">
            {todos.map((todo, index) => (
                <motion.div
                    key={todo._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: index * 0.1,
                    }}
                    className="rounded-2xl"
                >
                    <TodoItem todo={todo} setTodos={setTodos} />
                </motion.div>
            ))}
        </div>
    );
};

export default TodoList;