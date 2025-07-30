import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterLine } from "react-icons/ri";
import React from "react";

const Topbar = () => {
  return (
    <div className="bg-rabbit-red text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="hidden md:flex items-center space-x-4 ">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <RiTwitterLine className="h-5 w-5" />
          </a>
        </div>

        <div className="text-sm text-center flex-grow">
          <span>
            IMPORTANT : Currently appication is running on PicSum URL that's why
            there is Random Images
          </span>
        </div>
        <div className="text-sm hidden md:block">
          <a href="tel:+1234567890" className="hover:text-gray-300">
            +91 3456 7890 00
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
