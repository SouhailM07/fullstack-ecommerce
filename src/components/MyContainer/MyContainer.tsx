import { Route, Routes } from "react-router-dom";
import "./mycontainer.css";
// components
import {
  Navbar,
  Hero,
  Categories,
  FeaturedProducts,
  Footer,
  Loading,
} from "@/components";
import ViewProduct from "@/pages/ViewProduct/ViewProduct";

export default function MyContainer() {
  return (
    <>
      <Navbar />
      <Loading />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <main className="mt-[4rem] space-y-[7rem] mb-[7rem]">
                <Hero />
                <Categories />
                <FeaturedProducts />
              </main>
              <Footer />
            </>
          }
        />
        <Route path="viewProduct/:id" element={<ViewProduct />} />
      </Routes>
    </>
  );
}
