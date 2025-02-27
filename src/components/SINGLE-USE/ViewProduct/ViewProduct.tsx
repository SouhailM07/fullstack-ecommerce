import MyButton from "@/components/REUSABLE/MyButton/MyButton";
import { useUser } from "@clerk/clerk-react";
import {
  faArrowRight,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "@/components/ui/use-toast";
import { useShoppingListContext } from "@/context/ShoppingListContext";

export default function ViewProduct() {
  const { id } = useParams();
  const { user } = useUser();
  const { toast } = useToast();
  let [viewProduct, setViewProduct]: any = useState({});
  const { addProductToShoppingList } = useShoppingListContext();
  // ! handlers

  const handleClick = async (_id) => {
    try {
      if (user) {
        await axios.post(
          "https://fullstack-ecommerce-admin-panel.onrender.com/users/create",
          {
            clerkId: user.id,
            shoppingList: [],
          }
        );
        await addProductToShoppingList(_id);
      } else {
        toast({
          variant: "destructive",
          description: "User is not signed in !",
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    axios
      .get(
        `https://fullstack-ecommerce-admin-panel.onrender.com/products/${id}`
      )
      .then((res) => setViewProduct(res.data));
  }, []);
  return (
    <main className="cc py-[1rem] px-[1rem] sm:px-[2rem] ">
      <section className="flexBetween mb-[1rem] max-md:justify-end">
        <span className="text-[3rem] max-md:hidden font-bold">
          {viewProduct?.name}
        </span>

        <Link to="/searchResults/">
          <MyButton
            icon={faArrowRight}
            label="Back"
            color="border-2 border-primaryColor "
          />
        </Link>
      </section>
      <section className="flex-row-reverse flex justify-between  gap-y-[1rem] gap-x-[2rem] max-lg:flex-col">
        <img
          src={viewProduct?.img}
          alt="product img"
          className="h-[10rem] sm:h-[12rem] aspect-video rounded-lg max-lg:w-[20rem]"
        />
        <article className="flex-col flex gap-y-[1rem] ">
          <span className="text-[1.8rem] max-md:inline hidden font-bold">
            {viewProduct?.name}
          </span>
          <span className="text-[1.2rem] font-bold">
            Price : ${viewProduct?.price}
          </span>
          <div className="space-y-[1rem]">
            <h1 className="text-[1.5rem] underline underline-offset-[0.7rem]">
              Description
            </h1>
            <p>{viewProduct?.description}</p>
          </div>
          <button
            onClick={() => handleClick(viewProduct?._id)}
            className="p-3 w-full rounded-lg space-x-[1rem] bg-slate-900 text-white  hover:bg-slate-700"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>Add to Cart</span>
          </button>
        </article>
      </section>
    </main>
  );
}
