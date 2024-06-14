import "./styles.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { MyCard, MyButton } from "@/components";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function SearchResultsPage() {
  const { search } = useParams();
  let [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("https://fullstack-ecommerce-admin-panel.onrender.com/products/")
      .then(({ data }) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <main>
      <section className="flexBetween px-[2rem] my-2">
        <article>Search Results : {products.length}</article>
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
        className="cc p-3 grid grid-cols-3 gap-y-[2rem]"
      >
        {products.map((e, i) => (
          <MyCard key={i} {...e} />
        ))}
      </section>
    </main>
  );
}
