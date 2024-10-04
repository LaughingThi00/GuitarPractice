import "./css/index.css";
import React from "react";
import GlobalProvider from "./provider/globalProvider";
import Web from "./Web";

const App: React.FC = () => {
  return (
    <GlobalProvider>
      <Web />
    </GlobalProvider>
  );
};

export default App;
