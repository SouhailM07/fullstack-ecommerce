import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewProduct() {
  const { id } = useParams();
  let [viewProduct, setViewProduct]: any = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:3007/products/${id}`)
      .then((res) => setViewProduct(res.data));
  }, []);
  return (
    <main className="cc p-[2rem]">
      <section className="flex-row-reverse flex justify-between">
        <img
          src={viewProduct?.img}
          alt="product img"
          className="h-[12rem] aspect-video "
        />
        <article className="flex-col flex gap-y-[1rem] md:w-[26rem]">
          <span className="text-[3rem] font-bold">{viewProduct?.name}</span>
          <span className="text-[1.2rem] font-bold">
            price ${viewProduct?.price}
          </span>
          <div className="space-y-[1rem]">
            <h1 className="text-[1.5rem] underline underline-offset-[0.7rem]">
              Description
            </h1>
            <p>{viewProduct?.description}</p>
          </div>
          <button className="p-3 bg-slate-900 text-white rounded-lg">
            Buy now
          </button>
        </article>
      </section>
    </main>
  );
}
