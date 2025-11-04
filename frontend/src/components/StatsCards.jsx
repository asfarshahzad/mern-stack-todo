import { motion } from "framer-motion";

const StatsCards = ({ todos, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl p-4 sm:p-6 text-center bg-gray-100 animate-pulse"
          >
            <div className="text-2xl sm:text-3xl font-bold text-gray-400 mb-2">--</div>
            <div className="text-sm sm:text-base text-gray-400">Loading...</div>
          </div>
        ))}
      </div>
    );
  }

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const important = todos.filter((t) => t.important).length;

  const cards = [
    { label: "Total Tasks", value: total, color: "text-purple-600" },
    { label: "Completed", value: completed, color: "text-green-600" },
    { label: "Important", value: important, color: "text-yellow-600" },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8"
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          transition={{ type: "spring", stiffness: 200 }}
          className="rounded-2xl p-4 sm:p-6 text-center bg-white shadow-md
                     transition-transform duration-300 ease-in-out
                     hover:-translate-y-1 hover:shadow-lg"
        >
          <div className={`text-xl sm:text-2xl md:text-2xl font-bold ${card.color} mb-2`}>
            {card.value}
          </div>
          <div className="text-sm sm:text-base md:text-md text-gray-600 font-medium">
            {card.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsCards;