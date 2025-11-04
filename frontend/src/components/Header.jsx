import { ListTodo } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => (
    <motion.div
        className="text-center mb-10 flex flex-col items-center px-4 sm:px-6 lg:px-0"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
    >
        {/* 🔹 Icon + Heading */}
        <motion.div
            className="flex justify-center gap-3 mb-2 items-center flex-wrap sm:flex-nowrap"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
            <ListTodo
                className="text-purple-500 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-11 lg:h-11"
            />
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text leading-none">
                TO-DO LIST
            </h1>
        </motion.div>

        {/* 🔹 Subtitle */}
        <motion.p
            className="text-gray-600 text-base sm:text-md md:text-lg lg:text-lg px-2 sm:px-0"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
            Organize your life with style and efficiency
        </motion.p>
    </motion.div>
);

export default Header;