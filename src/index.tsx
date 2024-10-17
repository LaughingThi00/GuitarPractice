import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pentatonic from "./pages/Pentatonic";
import ChordPage from "./pages/ChordPage/Chord";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import NotePage from "./pages/NotePage/Note";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        
        <Route path="/" element={<WelcomePage />} />
        <Route path="/chord" element={<ChordPage />} />
        <Route path="/pentatonic" element={<Pentatonic />} />
        <Route path="/note" element={<NotePage />} />
      {/* <Route path="song" element={<Song />} />
      <Route path="introduce" element={<Introduce />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>

  // </React.StrictMode>
);
