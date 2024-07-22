import MyButton from "@/components/REUSABLE/MyButton/MyButton";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import loadingStore from "@/zustand/loading.store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useShoppingListContext } from "@/context/ShoppingListContext";
import { useToast } from "@/components/ui/use-toast";

export default function ConfirmBuy({ products }) {
  const { editLoading } = loadingStore((state) => state);
  const { toast } = useToast();
  const { user } = useUser();
  const { getUserShoppingList } = useShoppingListContext();
  const handleBuy = () => {
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
      .then(() =>
        toast({
          title: "Bill Confirmed",
          description: "Thank you for buying from Online store . ",
          duration: 2000,
        })
      )
      .catch((err) => console.log(err))
      .finally(() => editLoading(false));
  };
  return (
    <Dialog>
      <DialogTrigger>
        <MyButton color="bg-orange-500 w-[10rem] text-white" label="$ Buy" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Warning ?</DialogTitle>
          <DialogDescription>
            You are about to finish the buy process , are you sure about that ?
          </DialogDescription>
        </DialogHeader>
        <div className="flexBetween">
          <DialogClose>
            <MyButton label="Cancel" color="text-white bg-red-500" />
          </DialogClose>
          <DialogClose>
            <MyButton
              handler={handleBuy}
              label="Buy"
              color="text-white bg-green-500"
            />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
