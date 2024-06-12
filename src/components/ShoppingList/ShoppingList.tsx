
import { UserButton, useAuth, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faSearch,
  faStore,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import shoppingListStore from "@/zustand/shopping_list.store";



export default function ShoppingList({ shoppingList }) {
    const [products, setProducts] = useState<any[]>([]);
    const { user } = useUser();
    let { editShoppingList } = shoppingListStore((state) => state);
  
    const getUserShoppingList = async () => {
      try {
        const res = await axios.get(`http://localhost:3007/users/${user?.id}`);
        editShoppingList(res.data.shoppingList);
      } catch (err) {
        console.error(err);
      }
    };
    const addProductToShoppingList = (productId) => {
      axios
        .put(`http://localhost:3007/users/edit/${user?.id}`, {
          clerkId: user?.id,
          shoppingList: [...shoppingList, productId],
        })
        .then(getUserShoppingList);
    };
    const removeProductFromShoppingList = (productId) => {
      let DELETE_SAME_ITEM = shoppingList.filter((e) => e == productId);
      console.log(DELETE_SAME_ITEM);
      // axios
      //   .put(`http://localhost:3007/users/edit/${user?.id}`, {
      //     clerkId: user?.id,
      //     shoppingList: [...shoppingList, productId],
      //   })
      //   .then(getUserShoppingList);
    };
  
    useEffect(() => {
      const fetchProducts = async () => {
        const uniqueProducts = Array.from(new Set(shoppingList));
        const productDataPromises = uniqueProducts.map(async (productId) => {
          try {
            const response = await axios.get(
              `http://localhost:3007/products/${productId}`
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
          <PopoverTrigger className="h-full w-full">
            <FontAwesomeIcon icon={faCartShopping} />
          </PopoverTrigger>
          <PopoverContent
            role="list"
            className="translate-y-[1rem] translate-x-[-2rem] space-y-[1rem]"
          >
            {products.map((e, i) => (
              <div key={i} className="flex justify-between">
                <span>{e.info.name}</span>
                <div className="flex justify-between w-[5rem] items-center ">
                  <button
                    onClick={() => removeProductFromShoppingList(e.info._id)}
                    className="bg-red-500 text-white rounded-full aspect-square grid place-items-center h-[1.5rem]"
                  >
                    -
                  </button>
                  <span>{e.productLength}</span>
                  <button
                    onClick={() => addProductToShoppingList(e.info._id)}
                    className="bg-blue-500 text-white rounded-full aspect-square grid place-items-center h-[1.5rem]"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </PopoverContent>
          <span className="absolute translate-x-[1.2rem] text-[0.9rem] translate-y-[-1rem] font-bold">
            {products.length}
          </span>
        </div>
      </Popover>
    );
  };
  