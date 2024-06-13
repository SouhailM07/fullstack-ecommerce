import "./featuredproducts.css";
import { motion } from "framer-motion";
//
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import shoppingListStore from "@/zustand/shopping_list.store";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  let [products, setProducts] = useState<any>([]);
  const { user } = useUser();

  let { shoppingList, editShoppingList } = shoppingListStore((state) => state);
  //
  const getUserShoppingList = async () => {
    try {
      const res = await axios.get(`http://localhost:3007/users/${user?.id}`);
      editShoppingList(res.data.shoppingList);
    } catch (err) {
      console.error(err);
    }
  };
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
        {products.map((e, i) => (
          <SwiperSlide role="listitem" key={i}>
            <MyCard
              {...e}
              getUserShoppingList={getUserShoppingList}
              shoppingList={shoppingList}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

const MyCard = ({
  img,
  name,
  price,
  _id,
  shoppingList,
  getUserShoppingList,
}) => {
  const { user } = useUser();

  const addProductToShoppingList = () => {
    axios
      .put(`http://localhost:3007/users/edit/${user?.id}`, {
        clerkId: user?.id,
        shoppingList: [...shoppingList, _id],
      })
      .then(getUserShoppingList);
  };
  const handleClick = () => {
    if (user) {
      axios
        .post("http://localhost:3007/users/create", {
          clerkId: user.id,
          shoppingList: [],
        })
        .then(addProductToShoppingList)
        .catch((err) => console.log(err));
    } else {
      console.log("user is not signed in");
    }
  };
  return (
    <motion.li
      whileHover={{ scale: 1.05 }}
      role="listitem"
      className="select-none w-[17rem] flex flex-col min-h-[20rem]  border-2 rounded-lg mx-auto cursor-pointer"
    >
      <img src={img} alt="product img" className="min-h-[10rem] w-full " />
      <div className="p-[1rem] space-y-[0.8rem] h-full  flex flex-col justify-between">
        <div className="flex justify-between">
          <p className="font-bold text-[1.1rem]">${price}</p>
          <p className="text-[1.1rem] font-medium">{name}</p>
        </div>

        <div className="flex w-full justify-between items-center">
          <Link
            role="button"
            to={`viewProduct/${_id}`}
            className="text-[0.9rem] hover:underline"
          >
            View Product
          </Link>
          <button
            onClick={handleClick}
            className="bg-slate-900 text-white rounded-md p-3 hover:bg-indigo-500"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.li>
  );
};
