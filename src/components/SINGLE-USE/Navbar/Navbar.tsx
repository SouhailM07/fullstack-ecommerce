import "./navbar.css";
import { UserButton, useAuth, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStore, faUser } from "@fortawesome/free-solid-svg-icons";
import shoppingListStore from "@/zustand/shopping_list.store";
import searchStore from "@/zustand/search.store";
import ShoppingListUi from "../ShoppingList/ShoppingListUi";

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  let { editShoppingList } = shoppingListStore((state) => state);
  let { editSearchToggle } = searchStore((state) => state);
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
  const handleSearch = () => {
    editSearchToggle(true);
    setTimeout(() => {
      let focusInput = document.querySelector(
        "#search_input"
      ) as HTMLInputElement;
      focusInput.focus();
    }, 100);
  };
  // ? side effects on component mount
  useEffect(() => {
    if (user) {
      getUserShoppingList(user.id);
      console.log("check render from navbar");
    }
  }, [user]);

  return (
    <header className="sticky top-0 bg-white z-[20] py-[0.7rem] max-sm:px-[1rem] px-[2rem] max-w-[80rem] mx-auto">
      <nav className="flex justify-between items-center gap-x-[1rem]">
        <h1 className="flex md:min-w-[9rem] lg:min-w-[11rem]  gap-x-[1rem] items-center ">
          <FontAwesomeIcon icon={faStore} />
          <span className=" text-[1rem] lg:text-[1.3rem]  font-medium">
            Online Store
          </span>
        </h1>
        <ul role="list" className="flex gap-x-[1rem] max-sm:gap-x-[0.4rem]">
          <li role="listitem">
            <button
              onClick={handleSearch}
              title="search"
              aria-label="search btn"
              className=" navBtn"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </li>
          <ShoppingListUi />
          <button title="profile" role="listitem" className="navBtn">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <Link to="login" aria-label="sign up btn">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            )}
          </button>
        </ul>
      </nav>
    </header>
  );
}
