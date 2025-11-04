import { useState, useEffect } from "react";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import AddTodo from "./components/AddTodo";
import FilterButtons from "./components/FilterButtons";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`);
      const data = await res.json();
      if (Array.isArray(data)) setTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    if (filter === "important") return todo.important === true;
    return true;
  });

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <Header />
        <StatsCards todos={todos} loading={loading} />
        <AddTodo todos={todos} setTodos={setTodos} />
        <FilterButtons filter={filter} setFilter={setFilter} />
        <TodoList
          todos={filteredTodos}
          setTodos={setTodos}
          filter={filter}
          loading={loading}
        />
        <Footer />
      </div>

      {/* ✅ Global Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        toastStyle={{
          backgroundColor: "#ffffff",
          color: "#000000",
          fontSize: "15px",
          fontWeight: 500,
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
        }}
      />
    </div>
  );
};

export default App;