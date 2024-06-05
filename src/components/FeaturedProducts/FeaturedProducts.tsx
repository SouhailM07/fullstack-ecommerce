import "./featuredproducts.css";
import { featuredProducts } from "@/data";
import { featuredProducts_t } from "@/types";
import { motion } from "framer-motion";

export default function FeaturedProducts() {
  return (
    <section className="cc  space-y-[2rem]">
      <div className="flex px-[1rem] justify-between">
        <h1 className="text-[1.5rem]">Featured Products</h1>
        <button className="bg-slate-900 text-white rounded-md p-3">
          View All
        </button>
      </div>
      <ul role="list" className="grid grid-cols-3  gap-y-[2rem] gap-x-[1rem]">
        {featuredProducts.map((e, i) => (
          <MyCard key={i} {...e} />
        ))}
      </ul>
    </section>
  );
}

const MyCard = ({ img, description, name, price }: featuredProducts_t) => (
  <motion.li
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.04 }}
    role="listitem"
    className="w-[18rem] border-2 rounded-lg mx-auto cursor-pointer"
  >
    <img src={img} alt="product img" />
    <div className="p-[1rem] space-y-[0.8rem]">
      <p className="text-[1.2rem] font-medium">{name}</p>
      <p>{description}</p>
      <div className="flex justify-between items-center">
        <p className="font-bold text-[1.1rem]">${price}</p>
        <button className="bg-slate-900 text-white rounded-md p-3">
          Add to Cart
        </button>
      </div>
    </div>
  </motion.li>
);
