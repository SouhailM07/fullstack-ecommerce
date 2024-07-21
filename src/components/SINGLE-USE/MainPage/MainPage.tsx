import Categories from "../Categories/Categories";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";

export default function MainPage() {
  return (
    <>
      <main className="mt-[4rem] space-y-[7rem] mb-[7rem]">
        <Hero />
        <Categories />
        <FeaturedProducts />
      </main>
      <Footer />
    </>
  );
}
