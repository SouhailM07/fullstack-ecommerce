import "./hero.css";
export default function Hero() {
  return (
    <section className="cc px-[1rem] grid grid-cols-2  gap-x-[1rem]">
      <article className="space-y-[2rem]">
        <h1 className="text-[3rem] font-bold leading-[3.2rem]">
          Discover the Perfect Piece
        </h1>
        <p>
          Explore out curated collection of high-quality , stylish products that
          will elevate your everyday life.
        </p>
        <ul role="list" className="space-x-[2rem]">
          <MyBtn txt="Shop Now" color="bg-slate-900 text-white" />
          <MyBtn txt="Learn More" color="border-black border" />
        </ul>
      </article>
      <article>
        <img
          src="https://placehold.co/600x400/png"
          alt="img"
          className="w-full"
        />
      </article>
    </section>
  );
}

const MyBtn = ({ color, txt }: { color: string; txt: string }) => (
  <button role="listitem" className={`${color} h-[3rem] w-[9rem] rounded-lg`}>
    {txt}
  </button>
);
