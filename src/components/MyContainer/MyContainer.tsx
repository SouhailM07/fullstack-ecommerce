import "./mycontainer.css";
// components
import {
  Navbar,
  Hero,
  Categories,
  FeaturedProducts,
  Footer,
} from "@/components";
import { Routes, Route } from "react-router-dom";

export default function MyContainer() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <main className="mt-[4rem] space-y-[7rem] mb-[7rem]">
              <Hero />
              <Categories />
              <FeaturedProducts />
            </main>
            <Footer />
          </>
        }
      />
      <Route path="login" />
    </Routes>
  );
}
