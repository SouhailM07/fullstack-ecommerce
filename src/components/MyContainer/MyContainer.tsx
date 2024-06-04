import "./mycontainer.css";
// components
import { Navbar, Hero, Categories } from "@/components";
export default function MyContainer() {
  return (
    <>
      <Navbar />
      <main className="mt-[4rem] space-y-[7rem]">
        <Hero />
        <Categories />
      </main>
    </>
  );
}
