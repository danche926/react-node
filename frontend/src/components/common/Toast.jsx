// src/components/common/Toast.jsx
"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearToast } from "@/store/slices/uiSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast() {
  const dispatch = useDispatch();
  const toastMessage = useSelector((state) => state.ui.toastMessage);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        dispatch(clearToast());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, dispatch]);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 
            bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm`}
        >
          {toastMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
