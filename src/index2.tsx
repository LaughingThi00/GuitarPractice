import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Pentatonic from "./pages/Pentatonic";
import ChordPage from "./pages/ChordPage/Chord";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import { motion, AnimatePresence } from "framer-motion";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.key}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <App />
            </motion.div>
          }
        >
          {" "}
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                <WelcomePage />{" "}
              </motion.div>
            }
          />
          <Route
            path="/chord"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                <ChordPage />{" "}
              </motion.div>
            }
          />
          <Route
            path="/pentatonic"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                <Pentatonic />{" "}
              </motion.div>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
root.render(
  <BrowserRouter>
    <AnimatePresence />
  </BrowserRouter>
);
