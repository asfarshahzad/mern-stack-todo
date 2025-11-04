import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { motion } from "framer-motion"; // 🟣 Animation library

const AddTodo = ({ todos, setTodos }) => {
    const [inputValue, setInputValue] = useState("");

    const addTodo = async () => {
        if (!inputValue.trim()) {
            toast.error("Please enter a task before adding!", { autoClose: 1500 });
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: inputValue }),
            });

            const result = await res.json();

            if (res.ok && result.data) {
                setTodos((prev) => [...prev, result.data]);
                toast.success("Task added successfully!", { autoClose: 1500 });
            } else {
                toast.error("Failed to add task. Please try again!", { autoClose: 1500 });
                console.log("Server response:", result);
            }
        } catch (err) {
            console.log("Error adding todo:", err.message);
            toast.error("Something went wrong while adding the task!", { autoClose: 1500 });
        }

        setInputValue("");
    };

    const deleteAll = async () => {
        if (!todos.length) {
            toast.info("There are no tasks to delete!", { autoClose: 1500 });
            return;
        }

        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This will delete all your tasks permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete all!",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
                method: "DELETE",
            });

            const result = await res.json();

            if (res.ok) {
                setTodos([]);
                toast.success("All todos have been deleted.", { autoClose: 1500 });
            } else {
                console.error("Delete failed:", result);
                toast.error("Failed to delete all todos!", { autoClose: 1500 });
            }
        } catch (err) {
            console.log("Error deleting all todos:", err.message);
            toast.error("Something went wrong while deleting all todos!", { autoClose: 1500 });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative rounded-2xl p-[2px] mb-8"
        >
            <div className="rounded-2xl p-4 sm:p-6 bg-white shadow-md">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
                    {/* Input Field */}
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTodo()}
                        placeholder="What needs to be done?"
                        className="w-full sm:flex-1 bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 sm:py-3.5 md:py-3 text-sm sm:text-base md:text-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    />

                    {/* Add Button */}
                    <button
                        onClick={addTodo}
                        className="cursor-pointer w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 sm:px-5 sm:py-3 md:px-6 md:py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-102 flex justify-center items-center gap-2 text-sm sm:text-base md:text-md"
                    >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" />
                        Add
                    </button>

                    {/* Delete All Button */}
                    <button
                        onClick={deleteAll}
                        className="cursor-pointer w-full sm:w-auto bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-3 sm:px-5 sm:py-3 md:px-6 md:py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-102 flex justify-center items-center gap-2 text-sm sm:text-base md:text-md"
                    >
                        Delete All
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default AddTodo;