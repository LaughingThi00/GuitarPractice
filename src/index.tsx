import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pentatonic from "./pages/Pentatonic";
import ChordPage from "./pages/ChordPage/Chord";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/chord" element={<ChordPage />} />
        <Route path="/pentatonic" element={<Pentatonic />} />
        {/* <Route path="note" element={<Note />} />
      <Route path="song" element={<Song />} />
      <Route path="introduce" element={<Introduce />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
);
