import { Filter } from "lucide-react";
import { motion } from "framer-motion";

const FilterButtons = ({ filter, setFilter }) => {
    const buttons = ["all", "active", "completed", "important"];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
                ease: "easeOut",
            },
        },
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2 sm:gap-3 mb-6"
        >
            {buttons.map((type) => (
                <motion.button
                    key={type}
                    variants={buttonVariants}
                    onClick={() => setFilter(type)}
                    className={`cursor-pointer px-5 py-2.5 sm:px-5 sm:py-2.5 md:px-5 md:py-2.5 rounded-xl font-medium flex items-center gap-1.5 sm:gap-2 
                    transition-all duration-300 transform 
                    hover:-translate-y-1 hover:shadow-lg 
                    ${filter === type
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    <Filter className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4" />
                    <span className="text-xs sm:text-sm md:text-base">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                </motion.button>
            ))}
        </motion.div>
    );
};

export default FilterButtons;
