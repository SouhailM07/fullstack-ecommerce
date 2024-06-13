import MyButton from "../MyButton/MyButton";
import confirmBuyStore from "@/zustand/confirm_buy.store";
import { AnimatePresence, motion } from "framer-motion";

export default function ConfirmBuy() {
  let { editConfirmBuy, confirmBuy } = confirmBuyStore();
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
                handler={() => {
                  // todo ==================================
                  // add an end point to send the buy history {userId,shoppingListDataExact}
                  // clean shoppingList
                  // add loading
                  editConfirmBuy(false);
                }}
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
