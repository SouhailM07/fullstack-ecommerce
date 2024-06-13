import loadingStore from "@/zustand/loading.store";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import shoppingListStore from "@/zustand/shopping_list.store";
import { Link } from "react-router-dom";

export default function MyCard({ img, name, price, _id }) {
  const { user } = useUser();
  let { shoppingList, editShoppingList } = shoppingListStore((state) => state);
  const getUserShoppingList = async () => {
    try {
      const res = await axios.get(`http://localhost:3007/users/${user?.id}`);
      editShoppingList(res.data.shoppingList);
    } catch (err) {
      console.error(err);
    }
  };
  const { editLoading } = loadingStore((state) => state);
  const addProductToShoppingList = () => {
    editLoading(true);
    axios
      .put(`http://localhost:3007/users/edit/${user?.id}`, {
        clerkId: user?.id,
        shoppingList: [...shoppingList, _id],
      })
      .then(getUserShoppingList)
      .catch((err) => console.log(err))
      .finally(() => editLoading(false));
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
    <li
      // whileHover={{ scale: 1.05 }}
      role="listitem"
      className="select-none shadow-lg w-[17rem] flex flex-col min-h-[20rem]  border-2 rounded-lg mx-auto cursor-pointer"
    >
      <img
        src={img}
        alt="product img"
        className="min-h-[10rem] w-full rounded-lg"
      />
      <div className="p-[1rem] space-y-[0.8rem] h-full  flex flex-col justify-between">
        <div className="flex justify-between">
          <p className="font-bold text-[1.1rem]">${price}</p>
          <p className="text-[1.1rem] font-medium">{name}</p>
        </div>

        <div className="flex w-full justify-between items-center">
          <Link
            role="button"
            to={`/viewProduct/${_id}`}
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
    </li>
  );
}
