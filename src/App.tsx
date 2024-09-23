import { Outlet } from "react-router-dom";
import "./css/App.css";
import "./css/Chord.css";

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
