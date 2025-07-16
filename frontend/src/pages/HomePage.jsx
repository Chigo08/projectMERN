import React from "react";
import { Link } from "react-router-dom";
import pathLinks from "../store/paths.js";

const HomePage = () => {
  return (
    <div>
      <div className="h-16 text-white font-bold text-3xl text-center">
        <h1>Selamat datang di coffee shop</h1>
      </div>
      <div className="flex items-center justify-around gap-14 flex-wrap pt-4 h-full">
        {pathLinks.map((link) => (
          <div className="bg-blue-500 gap-2 w-1/4 h-24 m-4 min-w-[240px] rounded-2xl">
            <Link
              to={link.path}
              className="flex h-full w-full text-white items-center justify-center"
            >
              {link.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
