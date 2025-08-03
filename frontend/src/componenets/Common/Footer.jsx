import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiCopyrightLine, RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" border-t py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className=" text-lg text-gray-800 mb-4">News Letter</h3>
          <p className="text-gray-600 mb-4">
            Be the first to hear about the products, exclusive event and online
            offers.
          </p>
          <p className="font-medium text-gray-600 text-sm mb-6">
            Signup and get 10% of on first order
          </p>

          {/* News letter form */}
          <form className="flex">
            <input
              type="text"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border-t border-b border-l border-gray-300 rounded-l-md focus:outline-none focus:ring-2 ring-gray-500 transition-all"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-r-md hover:bg-green-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Shop Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link
                to="/collections/all?gender=Men&category=Top Wear"
                className="hover:text-gray-500 transition-colors"
              >
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link
                to="/collections/all?gender=Women&category=Top Wear"
                className="hover:text-gray-500 transition-colors"
              >
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link
                to="/collections/all?gender=Men&category=Bottom Wear"
                className="hover:text-gray-500 transition-colors"
              >
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link
                to="/collections/all?gender=Women&category=Bottom Wear"
                className="hover:text-gray-500 transition-colors"
              >
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>
        {/* Support Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>
        {/* Follow us */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
          <div className=" flex items-center space-x-4 mb-6">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener norefferrer"
              className="hover:text-gray-300"
            >
              <TbBrandMeta />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener norefferrer"
              className="hover:text-gray-300"
            >
              <IoLogoInstagram />
            </a>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noopener norefferrer"
              className="hover:text-gray-300"
            >
              <RiTwitterXLine />
            </a>
          </div>
          <p className="text-gray-500">Call US</p>
          <p>
            <FiPhone className="inline-block mr-2" />
            +91 2345 5432 99
          </p>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 tex-sm tracking-tighter text-center">
          <RiCopyrightLine className="inline-block h-5 w-5" /> 2025 All right's
          reserved by @Sushant Jha
        </p>
      </div>
    </footer>
  );
};

export default Footer;
