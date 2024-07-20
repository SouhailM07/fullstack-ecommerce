import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
//
import searchStore from "@/zustand/search.store";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SearchPanel() {
  let { searchText, searchToggle, editSearchText, editSearchToggle } =
    searchStore((state) => state);
  let [products, setProducts] = useState<any>("");
  let navigate = useNavigate();
  let location = useLocation();
  // ! handlers
  let getData = () =>
    axios
      .get("https://fullstack-ecommerce-admin-panel.onrender.com/products/")
      .then(({ data }) => setProducts(data))
      .catch((err) => console.log(err));

  // ? side effects on mount
  useEffect(() => {
    let body = document.body as HTMLBodyElement;
    body.className = searchToggle && "no-scroll";
    getData();
  }, [searchToggle]);

  return (
    <AnimatePresence>
      {searchToggle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed h-screen py-[0.7rem] top-0 flex flex-col items-center bg-[#0000009e] w-full z-[100]"
        >
          <div className="max-md:w-[90%] space-y-[1rem]  w-[35rem] z-[1]">
            <div className="bg-gray-200 px-[1rem] rounded-md h-[2.5rem] flex items-center gap-x-[1rem] w-full">
              <FontAwesomeIcon icon={faSearch} color="gray" />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editSearchToggle(false);
                  navigate("searchResults/");
                }}
              >
                <input
                  id="search_input"
                  value={searchText}
                  onChange={(e) => editSearchText(e.target.value)}
                  placeholder="Search products..."
                  className="text-[0.9rem] bg-transparent w-full h-full outline-none"
                />
              </form>
            </div>
            <div className="w-full bg-white   ">
              {searchText.length == 0 ? (
                <div className=" min-h-[4rem] w-full  grid place-items-center">
                  <span>No Results</span>
                </div>
              ) : (
                products
                  .filter((e) =>
                    e?.name.toLowerCase().includes(searchText.toLowerCase())
                  )
                  .map((e, i) => (
                    <div
                      onClick={() => {
                        editSearchToggle(false);
                        editSearchText(e.name);
                        navigate("searchResults/");
                      }}
                      key={i}
                      className={` border-black hover:bg-gray-200 transition-all duration-100 cursor-pointer h-[3rem] pl-[2rem] pr-[1rem] py-2 flexBetween text-[0.8rem] font-bold`}
                    >
                      <span>{e.name}</span>
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                  ))
              )}
            </div>
          </div>
          <div
            onClick={() => {
              editSearchToggle(false);
              // check if you are not in the searchResults route
              if (location.pathname !== "/searchResults/") {
                editSearchText("");
              }
            }}
            className="h-full w-full absolute top-0 "
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
