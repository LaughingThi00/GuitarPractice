import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./pages/outline/Header";
import React from "react";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
