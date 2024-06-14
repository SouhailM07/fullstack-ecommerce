import "./navbar.css";
import { UserButton, useAuth, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStore, faUser } from "@fortawesome/free-solid-svg-icons";
import shoppingListStore from "@/zustand/shopping_list.store";
import ShoppingListUi from "../ShoppingList/ShoppingListUi";

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  let { editShoppingList } = shoppingListStore((state) => state);
  // ! handlers
  const getUserShoppingList = async (id: string) => {
    try {
      const res = await axios.get(
        `https://fullstack-ecommerce-admin-panel.onrender.com/users/${id}`
      );
      editShoppingList(res.data.shoppingList);
    } catch (err) {
      console.error(err);
    }
  };
  // ? side effects on component mount
  useEffect(() => {
    if (user) {
      getUserShoppingList(user.id);
      console.log("check render from navbar");
    }
  }, [user]);

  return (
    <header className="sticky top-0 bg-white z-[99] py-[0.7rem] max-sm:px-[1rem] px-[2rem] max-w-[80rem] mx-auto">
      <nav className="flex justify-between items-center gap-x-[1rem]">
        <h1 className="flex md:min-w-[9rem] lg:min-w-[11rem]  gap-x-[1rem] items-center ">
          <FontAwesomeIcon icon={faStore} />
          <span className=" text-[1rem] lg:text-[1.3rem]  font-medium">
            Online Store
          </span>
        </h1>
        <SearchBar />
        <ul role="list" className="flex gap-x-[1rem] max-sm:gap-x-[0.4rem]">
          <button title="search" role="listitem" className="md:hidden navBtn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <ShoppingListUi />
          <button title="profile" role="listitem" className="navBtn">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <Link to="login">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            )}
          </button>
        </ul>
      </nav>
    </header>
  );
}

const SearchBar = () => {
  return (
    <div className="bg-gray-200 px-[1rem] rounded-md h-[2.5rem] flex items-center gap-x-[1rem] w-[35rem] max-md:hidden">
      <FontAwesomeIcon icon={faSearch} color="gray" />
      <input
        placeholder="Search products..."
        className="text-[0.9rem] bg-transparent w-full h-full outline-none"
      />
    </div>
  );
};
