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
    <section className="bg-gray-100 px-[1rem] min-h-[20rem] flex items-center">
      <ul
        role="list"
        className="max-sm:flex-col flex justify-center flex-wrap gap-[1rem] mx-auto w-full max-sm:items-center"
      >
        {categories.map((e, i) => (
          <Category key={i} txt={e} />
        ))}
      </ul>
    </section>
  );
}

const Category = ({ txt }: { txt: string }) => (
  <motion.li
    role="listitem"
    whileHover={{ y: -15 }}
    transition={{ ease: "anticipate" }}
    className="bg-gray-300 grid place-items-center shadow-xl max-sm:h-[3rem] h-[8rem] font-bold rounded-lg max-sm:w-[90%] w-[12rem] "
  >
    {txt}
  </motion.li>
);
