import { Link } from "react-router-dom";
import NavCartButton from "./Layout/NavCartButton";

const Navbar = () => {
  return (
    <>
      <nav className="flex flex-col sm:flex-row bg-red-800 sm:justify-center sm:items-center sm:gap-9 gap-0 text-white sm:py-3 sticky top-0 z-10">
        <Link
          to="/"
          className="bg-[#4d1601] border border-red-600 border-x-transparent border-t-0 sm:border-transparent sm:rounded-[25px] hover:bg-[#2c0d00] px-12 py-3 font-bold sm:mb-0"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="bg-[#4d1601] border border-red-600 border-x-transparent border-t-0 sm:border-transparent sm:rounded-[25px] hover:bg-[#2c0d00] px-12 py-3 font-bold sm:mb-0"
        >
          Products
        </Link>
        <Link to="/cart">
          <NavCartButton />
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
