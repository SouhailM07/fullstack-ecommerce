import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import shoppingListStore from "@/zustand/shopping_list.store";
import MyButton from "@/components/REUSABLE/MyButton/MyButton";
import ConfirmBuy from "../ConfirmBuy/ConfirmBuy";
import { Link } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useShoppingListContext } from "@/context/ShoppingListContext";

export default function BillPage() {
  const [products, setProducts] = useState<any[]>([]);

  let { shoppingList } = shoppingListStore((state) => state);
  // ! handlers
  const { addProductToShoppingList, removeProductFromShoppingList } =
    useShoppingListContext();

  const getAllBills = (): number => {
    return products.length
      ? products
          .map((e) => e.info.price * e.productLength)
          .reduce((a, e) => a + e)
      : 0;
  };

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
    <>
      <main
        id="billPage"
        className="cc p-[2rem] flex justify-between flex-col "
      >
        <section className="flexBetween  ">
          <article>Products : {products.length}</article>
          <Link to="/">
            <MyButton
              icon={faArrowRight}
              label="Back"
              color="border-2 border-primaryColor "
            />
          </Link>
        </section>
        {shoppingList.length !== 0 ? (
          <section className="space-y-[2rem] my-[2rem]">
            {products.map((e, i) => (
              <ProductBillRenderItem
                key={i}
                e={e}
                addProductToShoppingList={addProductToShoppingList}
                removeProductFromShoppingList={removeProductFromShoppingList}
              />
            ))}
          </section>
        ) : (
          <div className="grid place-items-center h-[8rem] w-full">Empty</div>
        )}
        <section className="flexBetween max-sm:flex-col gap-y-[1rem]">
          <p className="font-bold text-[1.2rem]">
            Total Bill :{" "}
            <span className="text-green-500">${getAllBills()}</span>
          </p>
          {shoppingList.length !== 0 && <ConfirmBuy products={products} />}
        </section>
      </main>
    </>
  );
}

const ProductBillRenderItem = ({
  e,
  removeProductFromShoppingList,
  addProductToShoppingList,
}) => {
  return (
    <div className="grid max-md:grid-rows-[1fr_3rem_3rem_3rem] max-md:h-[20rem]   md:grid-cols-4 place-items-center ">
      <img
        src={e.info.img}
        alt="product img"
        className=" md:w-full  aspect-video rounded-md max-md:h-[9rem]"
      />
      <span className="font-medium">{e.info.name}</span>
      <article className="flex justify-between gap-x-[1rem] items-center ">
        <MyButton
          label="-"
          color="bg-red-500 text-white w-[3rem]"
          handler={() => removeProductFromShoppingList(e.info._id)}
        />
        <span>{e.productLength}</span>
        <MyButton
          label="+"
          color="bg-blue-500 text-white w-[3rem]"
          handler={() => addProductToShoppingList(e.info._id)}
        />
      </article>
      <div className="text-green-500 font-bold">
        ${e.info.price * e.productLength}
      </div>
    </div>
  );
};
