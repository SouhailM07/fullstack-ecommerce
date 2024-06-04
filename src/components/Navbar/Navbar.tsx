import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navbar.css";
import {
  faCartShopping,
  faSearch,
  faStore,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
export default function Navbar() {
  let links = [
    { icon: faCartShopping, title: "cart" },
    { icon: faUser, title: "profile" },
  ];
  return (
    <header className="py-[0.7rem] px-[2rem] max-w-[80rem] mx-auto">
      <nav className="flex justify-between items-center">
        <h1 className="flex gap-x-[1rem] items-center ">
          <FontAwesomeIcon icon={faStore} />
          <p className="text-[1.3rem] font-medium">Online Store</p>
        </h1>
        <FontAwesomeIcon icon="coffee" />
        <SearchBar />
        <ul role="list" className="flex gap-x-[3rem] ">
          {links.map((e, i) => (
            <button
              key={i}
              title={e.title}
              role="listitem"
              className="cursor-pointer hover:bg-gray-200 h-[3rem] aspect-square rounded-full"
            >
              <FontAwesomeIcon icon={e.icon} size="lg" />
            </button>
          ))}
        </ul>
      </nav>
    </header>
  );
}

const SearchBar = () => {
  return (
    <div className="bg-gray-200 px-[1rem] rounded-md h-[2.5rem] flex items-center gap-x-[1rem] w-[35rem]">
      <FontAwesomeIcon icon={faSearch} color="gray" />
      <input
        placeholder="Search products..."
        className="text-[0.9rem] bg-transparent w-full h-full outline-none"
      />
    </div>
  );
};
