import "./categories.css";

import { motion } from "framer-motion";

export default function Categories() {
  const categories: string[] = [
    "Clothing",
    "Accessories",
    "Home",
    "Tech",
    "Beauty",
  ];
  return (
    <section className="bg-gray-100 cc px-[1rem] h-[20rem] flex items-center">
      <ul className="grid grid-cols-5 gap-x-[1rem] w-full">
        {categories.map((e, i) => (
          <Category key={i} txt={e} />
        ))}
      </ul>
    </section>
  );
}

const Category = ({ txt }: { txt: string }) => (
  <motion.button
    whileHover={{ y: -15 }}
    transition={{ ease: "anticipate", duration: 0.1 }}
    className="bg-gray-300 shadow-xl h-[8rem] font-bold rounded-lg w-full "
  >
    {txt}
  </motion.button>
);
