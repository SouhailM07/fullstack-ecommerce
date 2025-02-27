import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import shoppingListStore from "@/zustand/shopping_list.store";
import { Link } from "react-router-dom";
import { useShoppingListContext } from "@/context/ShoppingListContext";

export default function ShoppingListUi() {
  const [products, setProducts] = useState<any[]>([]);
  const { removeProductFromShoppingList, addProductToShoppingList } =
    useShoppingListContext();
  let { shoppingList } = shoppingListStore((state) => state);

  useEffect(() => {
    const fetchProducts = async () => {
      const uniqueProducts = Array.from(new Set(shoppingList));
      const productDataPromises = uniqueProducts.map(async (productId) => {
        try {
          const response = await axios.get(
            `https://fullstack-ecommerce-admin-panel.onrender.com/products/${productId}`
          );
          const productLength = shoppingList.filter(
            (id) => id === productId
          ).length;
          return { info: response.data, productLength };
        } catch (error) {
          console.error(`Failed to fetch product ${productId}:`, error);
          return null;
        }
      });

      const productData = await Promise.all(productDataPromises);
      setProducts(productData.filter((product) => product !== null));
    };

    fetchProducts();
  }, [shoppingList]);

  return (
    <Popover>
      <div title="cart" role="listitem" className="navBtn">
        <PopoverTrigger
          aria-label="shopping list btn"
          className="h-full w-full"
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </PopoverTrigger>
        <PopoverContent
          role="list"
          className="translate-y-[1rem]  sm:translate-x-[-2rem] space-y-[1rem]"
        >
          {shoppingList.length !== 0 ? (
            <>
              {products.map((e, i) => (
                <div key={i} className="flex justify-between">
                  <span>{e.info.name}</span>
                  <div className="flex justify-between w-[5rem] items-center ">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      onClick={() => removeProductFromShoppingList(e.info._id)}
                      className="bg-red-500 text-white rounded-full aspect-square grid place-items-center h-[1.5rem]"
                    >
                      -
                    </motion.button>
                    <span>{e.productLength}</span>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      onClick={() => addProductToShoppingList(e.info._id)}
                      className="bg-blue-500 text-white rounded-full aspect-square grid place-items-center h-[1.5rem]"
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              ))}
              <Link
                to="/billPage/"
                role="button"
                className="
                bg-slate-900 hover:bg-slate-800 transition-all duration-200 text-white w-full p-2 block rounded-md text-center
              "
              >
                View list
              </Link>
            </>
          ) : (
            <div className="grid place-items-center h-[4rem]">Empty</div>
          )}
        </PopoverContent>
        <span className="absolute translate-x-[1.2rem] text-[0.9rem] translate-y-[-1rem] font-bold">
          {shoppingList.filter((e) => e !== null).length}
        </span>
      </div>
    </Popover>
  );
}
