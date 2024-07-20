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
  SearchPanel,
} from "@/components";
import ViewProduct from "@/pages/ViewProduct/ViewProduct";
import SearchResultsPage from "@/pages/SearchResultsPage/SearchResultsPage";
import BillPage from "@/pages/BillPage/BillPage";

export default function MyContainer() {
  return (
    <>
      <Navbar />
      <SearchPanel />
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
        <Route path="searchResults/" element={<SearchResultsPage />} />
        <Route path="billPage/" element={<BillPage />} />
      </Routes>
    </>
  );
}
