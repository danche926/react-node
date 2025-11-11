"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ type = "info", message, onClose }) {
  if (!message) return null;

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-gray-700";

  return (
    <AnimatePresence>
      <motion.div
        key="toast"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50`}
      >
        {message}
        <button onClick={onClose} className="ml-3 text-sm opacity-75 hover:opacity-100">
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
