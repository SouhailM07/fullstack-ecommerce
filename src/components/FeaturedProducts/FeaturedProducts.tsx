import "./featuredproducts.css";
//
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import axios from "axios";
import { useEffect, useState } from "react";
import { MyCard } from "@/components";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  let [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3007/products")
      .then(({ data }) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <section className="cc  space-y-[2rem]">
      <article className="flex px-[1rem] justify-between items-center">
        <h1 className="text-[1.5rem] max-sm:text-[1rem]">Featured Products</h1>
        <Link
          to={`searchResults/test`}
          role="button"
          className="bg-slate-900 text-white rounded-md p-3"
        >
          View All
        </Link>
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
        {products.length == 0 ? (
          <div className=" grid place-items-center">
            <div className="border-[0.7rem] animate-spin border-transparent border-t-indigo-500 h-[7rem] aspect-square rounded-full"></div>
          </div>
        ) : (
          products.map((e, i) => (
            <SwiperSlide role="listitem" key={i}>
              <MyCard {...e} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  );
}
