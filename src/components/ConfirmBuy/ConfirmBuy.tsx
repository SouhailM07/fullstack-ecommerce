import MyButton from "../MyButton/MyButton";
import confirmBuyStore from "@/zustand/confirm_buy.store";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import shoppingListStore from "@/zustand/shopping_list.store";
import loadingStore from "@/zustand/loading.store";

export default function ConfirmBuy({ products }) {
  let { editConfirmBuy, confirmBuy } = confirmBuyStore();
  let { editShoppingList } = shoppingListStore((state) => state);
  const { editLoading } = loadingStore((state) => state);

  const { user } = useUser();
  const getUserShoppingList = async () => {
    try {
      const res = await axios.get(
        `https://fullstack-ecommerce-admin-panel.onrender.com/users/${user?.id}`
      );
      editShoppingList(res.data.shoppingList);
    } catch (err) {
      console.error(err);
    }
  };
  const handleBuy = () => {
    editConfirmBuy(false);
    editLoading(true);
    axios
      .post(
        "https://fullstack-ecommerce-admin-panel.onrender.com/bills/create/",
        {
          userId: user?.id,
          shoppingListDataExact: products,
        }
      )
      .then(() =>
        axios.put(
          `https://fullstack-ecommerce-admin-panel.onrender.com/users/edit/${user?.id}`,
          {
            clerkId: user?.id,
            shoppingList: [],
          }
        )
      )
      .then(getUserShoppingList)
      .catch((err) => console.log(err))
      .finally(() => editLoading(false));
  };
  return (
    <AnimatePresence>
      {confirmBuy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 h-screen w-full bg-[#00000087] z-[100] gridCenter"
        >
          <div className="bg-white w-[25rem]  p-[1rem] rounded-lg space-y-[1rem]">
            <h1 className="text-[2rem] text-red-500 font-bold">Warning!</h1>
            <p>
              You are about to finish the buy process , are you sure about that
              ?
            </p>
            <div className="flexBetween">
              <MyButton
                label="Cancel"
                color="text-white bg-red-500"
                handler={() => editConfirmBuy(false)}
              />
              <MyButton
                handler={handleBuy}
                label="Buy"
                color="text-white bg-green-500"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
