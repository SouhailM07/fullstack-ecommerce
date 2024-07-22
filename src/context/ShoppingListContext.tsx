import { useUser } from "@clerk/clerk-react";
import { createContext, ReactNode, useContext } from "react";
import loadingStore from "@/zustand/loading.store";
import shoppingListStore from "@/zustand/shopping_list.store";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const ShoppingListContext = createContext<any>("");

export default function ShoppingListContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  // ! handlers
  const { user } = useUser();
  const { editLoading } = loadingStore((state) => state);
  const { toast } = useToast();
  let { shoppingList, editShoppingList } = shoppingListStore((state) => state);
  // ! handlers
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

  const addProductToShoppingList = async (productId) => {
    editLoading(true);
    try {
      await axios.put(
        `https://fullstack-ecommerce-admin-panel.onrender.com/users/edit/${user?.id}`,
        {
          clerkId: user?.id,
          shoppingList: [...shoppingList, productId],
        }
      );
      await getUserShoppingList();
      toast({ description: "The item was added to your shopping list" });
    } catch (error) {
      console.log(error);
    } finally {
      editLoading(false);
    }
  };
  const removeProductFromShoppingList = (productId) => {
    let DELETE_ITEM_INDEX = shoppingList.lastIndexOf(productId);
    let NEW_SHOPPING_LIST = shoppingList.filter(
      (_, i) => i !== DELETE_ITEM_INDEX
    );
    editLoading(true);
    axios
      .put(
        `https://fullstack-ecommerce-admin-panel.onrender.com/users/edit/${user?.id}`,
        {
          clerkId: user?.id,
          shoppingList: [...NEW_SHOPPING_LIST],
        }
      )
      .then(getUserShoppingList)
      .catch((err) => console.log(err))
      .finally(() => editLoading(false));
  };
  return (
    <ShoppingListContext.Provider
      value={{
        getUserShoppingList,
        addProductToShoppingList,
        removeProductFromShoppingList,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}

export const useShoppingListContext = () => useContext(ShoppingListContext);
