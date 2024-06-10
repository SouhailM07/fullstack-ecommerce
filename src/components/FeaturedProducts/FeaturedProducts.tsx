import "./featuredproducts.css";
import { featuredProducts } from "@/data";
import { featuredProducts_t } from "@/types";
import { motion } from "framer-motion";
//
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function FeaturedProducts() {
  return (
    <section className="cc  space-y-[2rem]">
      <article className="flex px-[1rem] justify-between items-center">
        <h1 className="text-[1.5rem] max-sm:text-[1rem]">Featured Products</h1>
        <button className="bg-slate-900 text-white rounded-md p-3">
          View All
        </button>
      </article>
      <Swiper
        style={{ direction: "rtl" }}
        spaceBetween={30}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        role="list"
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="py-[1rem] mySwiper"
      >
        {featuredProducts.map((e, i) => (
          <SwiperSlide role="listitem" key={i}>
            <MyCard {...e} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

const MyCard = ({ img, name, price }: featuredProducts_t) => (
  <motion.li
    whileHover={{ scale: 1.05 }}
    role="listitem"
    className="w-[16rem] flex flex-col min-h-[20rem]  border-2 rounded-lg mx-auto cursor-pointer"
  >
    <img src={img} alt="product img" />
    <div className="p-[1rem] space-y-[0.8rem] h-full  flex flex-col justify-between">
      <p className="text-[1.1rem] font-medium">{name}</p>

      <div className="flex justify-between items-center">
        <p className="font-bold text-[1.1rem]">${price}</p>
        <button className="bg-slate-900 text-white rounded-md p-3">
          Add to Cart
        </button>
      </div>
    </div>
  </motion.li>
);
