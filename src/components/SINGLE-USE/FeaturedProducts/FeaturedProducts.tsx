import "./featuredproducts.css";
//
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { type CarouselApi } from "@/components/ui/carousel";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyCard from "@/components/REUSABLE/MyCard/MyCard";
import MyButton from "@/components/REUSABLE/MyButton/MyButton";
import loadingStore from "@/zustand/loading.store";

export default function FeaturedProducts() {
  let [products, setProducts] = useState<any[]>([]);
  let { editLoading } = loadingStore((state) => state);
  useEffect(() => {
    editLoading(true);
    axios
      .get("https://fullstack-ecommerce-admin-panel.onrender.com/products")
      .then(({ data }) => setProducts(data))
      .catch((err) => console.log(err))
      .finally(() => editLoading(false));
  }, []);
  return (
    <section className="cc  space-y-[2rem]">
      <article className="flex px-[1rem] justify-between items-center">
        <h1 className="text-[1.5rem] max-sm:text-[1rem]">Featured Products</h1>
        <Link to={`searchResults/`} role="button">
          <MyButton label="View All" color="bg-slate-900 text-white " />
        </Link>
      </article>
      <MyCarousel products={products} />
    </section>
  );
}

const MyCarousel = ({ products }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  if (products.length == 0) {
    return (
      <div className=" grid place-items-center">
        <div className="border-[0.7rem] animate-spin border-transparent border-t-indigo-500 h-[7rem] aspect-square rounded-full" />
      </div>
    );
  }
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{ skipSnaps: true }}
      setApi={setApi}
    >
      <CarouselContent role="list">
        {products.map((e, i) => (
          <CarouselItem
            role="listitem"
            key={i}
            className="xl:basis-1/3 lg:basis-1/2 "
          >
            <MyCard {...e} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </Carousel>
  );
};
