import loadingStore from "@/zustand/loading.store";
import { AnimatePresence, motion } from "framer-motion";

export default function Loading() {
  let { loading } = loadingStore((state) => state);
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="gridCenter bg-[#00000087] fixed z-[100] h-screen w-full top-0"
        >
          <div className="h-[7rem] aspect-square animate-spin border-transparent border-t-indigo-500 border-[0.7rem] rounded-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
