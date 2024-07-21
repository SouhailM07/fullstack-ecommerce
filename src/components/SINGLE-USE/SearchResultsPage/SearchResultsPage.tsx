import "./styles.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import { MyCard, MyButton } from "@/components";
import MyCard from "@/components/REUSABLE/MyCard/MyCard";
import MyButton from "@/components/REUSABLE/MyButton/MyButton";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import searchStore from "@/zustand/search.store";

export default function SearchResultsPage() {
  let [products, setProducts] = useState<any[]>([]);
  let { searchText, searchToggle } = searchStore((state) => state);
  useEffect(() => {
    axios
      .get("https://fullstack-ecommerce-admin-panel.onrender.com/products/")
      .then(({ data }) =>
        setProducts(
          data.filter((e) =>
            e?.name.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      )
      .catch((err) => console.log(err));
  }, [searchToggle]);
  return (
    <main>
      <section className="flexBetween px-[2rem] my-2 max-sm:flex-col max-sm:gap-y-[1rem]">
        <article>
          <span className="font-bold">"{searchText}" </span> Search Results :{" "}
          {products.length}
        </article>
        <Link to="/">
          <MyButton
            icon={faArrowRight}
            label="Back"
            color="border-2 border-primaryColor "
          />
        </Link>
      </section>
      <section
        id="searchResults"
        style={{ direction: "rtl" }}
        className="cc  sm:p-3 grid  gap-y-[2rem]"
      >
        {products.map((e, i) => (
          <MyCard key={i} {...e} />
        ))}
      </section>
    </main>
  );
}
