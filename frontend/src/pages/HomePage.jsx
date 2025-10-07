import React, { useState } from "react";
import { Link } from "react-router-dom";
import pathLinks from "../store/paths.js";

const HomePage = () => {
  const [data, setData] = useState([]);

  return (
    <div className="h-[90%] mt-4">
      <div className="flex justify-center items-center h-[15%] font-bold">
        <h1 className="inline ml-4 sm:ml-0 text-2xl transition-all duration-300 hover:shadow-2xl hover:text-4xl sm:text-3xl">
          Aplikasi Point of Sale Kumo Coffee Shop
        </h1>
      </div>
      <div className="h-[82%] w-full flex flex-col">
        {pathLinks.map((link) => (
          <Link
            to={link.path}
            className="flex items-center ml-4 my-4 w-[98%] h-1/4 rounded-2xl shadow-lg border-4 border-blue-400
              transition-all duration-300 hover:shadow-xl hover:font-bold hover:bg-blue-300 hover:-translate-y-2
            "
          >
            <span className="ml-4 font-semibold text-lg">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
