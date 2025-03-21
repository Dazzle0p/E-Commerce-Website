import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./Searchbar";
import Cartdrawer from "../Layout/Cartdrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const NavBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openNavBar, setOpenNavBar] = useState(false);

  const toggleNavDrawer = () => {
    setOpenNavBar(!openNavBar);
  };

  const toggleCartDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <nav className="container flex mx-auto items-center justify-between py-4 px-6">
        {/* Left -> Logo */}
        <Link to="/" className="text-2xl font-medium">
          Rabbit
        </Link>
        {/* Cente Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="collections/all"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            MEN
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bottom Wear
          </Link>
        </div>
        {/* Right - Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black "
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1  bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5">
              4
            </span>
          </button>
          {/* Search Icon */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          {/* Menu button for medium and small device */}
          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <Cartdrawer openDrawer={openDrawer} toggleCartDrawer={toggleCartDrawer} />
      {/* Mobile NaviGation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          openNavBar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600 " />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="collections/all"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              MEN
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              WOMEN
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              TOP WEAR
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              BOTTOM WEAR
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};
export default NavBar;
