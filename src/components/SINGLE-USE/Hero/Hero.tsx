import "./hero.css";
import hero_img from "/simon-daoudi-2wFoa040m8g-unsplash.jpg";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="cc  max-lg:max-w-[35rem] max-sm:w-full max-lg:flex-col-reverse px-[1rem] flex justify-between  gap-[1rem] ">
      <article className="max-md:px-[1rem] space-y-[2rem] lg:w-[50%] max-lg:text-center">
        <h1 className="text-[3rem] font-bold leading-[3.2rem] max-lg:text-[1.8rem]">
          Discover the Perfect Piece
        </h1>
        <p>
          Explore out curated collection of high-quality , stylish products that
          will elevate your everyday life.
        </p>
        <ul role="list" className="flex gap-x-[2rem] max-lg:justify-between">
          <MyBtn txt="Shop Now" color="bg-slate-900 text-white" />
          <MyBtn txt="Learn More" color="border-black border" />
        </ul>
      </article>
      <article className="lg:w-[50%] ">
        <img
          // @ts-ignore
          fetchpriority="high"
          loading="eager"
          // src="https://placehold.co/600x400/png"
          src={hero_img}
          alt="img"
          className="w-full rounded-lg"
        />
      </article>
    </section>
  );
}

const MyBtn = ({ color, txt }: { color: string; txt: string }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    transition={{ duration: 0.1 }}
    role="listitem"
    className={`${color} h-[3rem] w-[9rem] rounded-lg`}
  >
    {txt}
  </motion.button>
);
