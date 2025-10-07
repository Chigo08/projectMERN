import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateOrder from "./pages/CreateOrder";
import CreateMenu from "./pages/CreateMenu";
import Order from "./pages/Order";
import Menu from "./pages/Menu";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div className="w-full h-screen min-h-screen">
      <Sidebar />
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
