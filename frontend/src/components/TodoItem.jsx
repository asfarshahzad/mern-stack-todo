import { useState } from "react";
import { Trash2, Edit2, Check, Star, Calendar, Clock, Save, X } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const TodoItem = ({ todo, setTodos }) => {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(todo.text);
    const [loading, setLoading] = useState(false);

    const patchTodo = async (patch, showToast = false) => {
        setTodos((prev) => prev.map((t) => (t._id === todo._id ? { ...t, ...patch } : t)));
        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/update/${todo._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patch),
            });
            const result = await res.json();
            const updated = result?.updatedTodo || result?.data || null;
            if (res.ok && updated) {
                setTodos((prev) => prev.map((t) => (t._id === todo._id ? updated : t)));
                if (showToast) toast.success("Todo updated successfully!", { autoClose: 1500 });
            } else {
                console.error("Server rejected update:", result);
                toast.error("Failed to update todo!", { autoClose: 1500 });
            }
        } catch (err) {
            console.error("Network/error updating todo:", err);
            toast.error("Network error while updating!", { autoClose: 1500 });
        } finally {
            setLoading(false);
        }
    };

    const toggleCompleted = () => patchTodo({ completed: !todo.completed });
    const toggleImportant = () => patchTodo({ important: !todo.important });
    const saveEdit = async () => {
        if (!text.trim()) {
            toast.error("Please enter some text before saving!", { autoClose: 1500 });
            return;
        }
        await patchTodo({ text: text.trim() }, true);
        setEditing(false);
    };

    const deleteTodo = async () => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This task will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });
        if (!confirm.isConfirmed) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/delete/${todo._id}`, { method: "DELETE" });
            const result = await res.json();
            if (res.ok) {
                setTodos((prev) => prev.filter((t) => t._id !== todo._id));
                toast.success("Todo deleted successfully.", { autoClose: 1500 });
            } else {
                console.error("Delete failed:", result);
                toast.error("Failed to delete todo!", { autoClose: 1500 });
            }
        } catch (err) {
            console.error("Delete error:", err);
            toast.error("Network error while deleting!", { autoClose: 1500 });
        }
    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });

    return (
        <div className="relative bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-md">
            {/* Gradient left border */}
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-2xl"></div>

            <div className="flex flex-wrap sm:flex-nowrap items-center sm:items-center gap-3">
                {/* Checkbox */}
                <button
                    onClick={() => !loading && toggleCompleted()}
                    disabled={loading}
                    className={`cursor-pointer w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center ${todo.completed ? "bg-green-500 border-green-500" : "border-gray-400"} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {todo.completed && <Check size={12} className="text-white sm:text-[14px]" />}
                </button>

                {/* Text / Edit Field */}
                <div className="flex-1 min-w-[150px]">
                    {editing ? (
                        <div className="flex flex-wrap sm:flex-row gap-2">
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                                className="flex-1 bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base text-gray-800 focus:outline-none"
                            />
                            <div className="flex gap-2 mt-2 sm:mt-0">
                                <button onClick={saveEdit} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                                    <Save size={16} />
                                </button>
                                <button onClick={() => { setEditing(false); setText(todo.text); }} className="p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-wrap sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <span
                                onDoubleClick={() => setEditing(true)}
                                className={`text-base sm:text-lg cursor-pointer ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}
                            >
                                {todo.text}
                            </span>
                            {todo.important && <Star size={16} className="text-yellow-500 fill-yellow-500" />}
                        </div>
                    )}

                    {/* Date + Status */}
                    <div className="flex flex-wrap sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(todo.createdAt)}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={12} />
                            {todo.completed ? "Completed" : "Active"}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                {!editing && (
                    <div className="flex gap-2 mt-2 sm:mt-0 flex-wrap">
                        <button onClick={toggleImportant} className={`p-2 transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5 ${todo.important ? "text-yellow-600" : "text-gray-500"}`}>
                            <Star size={18} className={`cursor-pointer ${todo.important ? "fill-current" : ""}`} />
                        </button>
                        <button onClick={() => setEditing(true)} className="p-2 text-blue-500 transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5">
                            <Edit2 size={18} />
                        </button>
                        <button onClick={deleteTodo} className="p-2 text-red-500 transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5">
                            <Trash2 size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoItem;