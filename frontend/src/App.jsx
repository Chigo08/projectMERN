import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateOrder from "./pages/CreateOrder";
import CreateMenu from "./pages/CreateMenu";
import Order from "./pages/Order";
import Menu from "./pages/Menu";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="bg-gray-700 h-full w-full min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/create-menu" element={<CreateMenu />} />
        <Route path="/order" element={<Order />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </div>
  );
};

export default App;
