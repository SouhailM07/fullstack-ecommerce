import "./mycontainer.css";
// components
import {
  Navbar,
  Hero,
  Categories,
  FeaturedProducts,
  Footer,
} from "@/components";

export default function MyContainer() {
  return (
    <>
      <Navbar />
      <main className="mt-[4rem] space-y-[7rem] mb-[7rem]">
        {/* <Hero /> */}
        <Categories />
        <FeaturedProducts />
      </main>
      <Footer />
    </>
  );
}
