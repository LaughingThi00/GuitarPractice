import React, { useContext } from "react";
import { GlobalContext } from "./provider/globalProvider";
import Header from "./pages/outline/Header";
import { Outlet } from "react-router-dom";
import Footer from "./pages/outline/Footer";

const Web = () => {
  const { theme } = useContext(GlobalContext);

  return (
    <div className={`App ${theme}-Background`}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Web;
