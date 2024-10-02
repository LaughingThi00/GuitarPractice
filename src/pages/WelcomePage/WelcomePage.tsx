import React, { useContext } from "react";
import { GlobalContext } from "../../provider/globalProvider";
import { Button, Carousel } from "react-bootstrap";
import { Theme } from "../ChordPage/types/themes";
import { useNavigate } from "react-router-dom";

import freedom from "./../../resource/img/welcome/slider/freedom.jpg";
import inband from "./../../resource/img/welcome/slider/inband.jpg";
import maybepro from "./../../resource/img/welcome/slider/maybepro.jpg";
import natural from "./../../resource/img/welcome/slider/natural.jpg";
import street from "./../../resource/img/welcome/slider/street.jpg";

import fchord from "./../../resource/img/welcome/feature/fchord.png";
import fpen from "./../../resource/img/welcome/feature/fpen.jpeg";
import fnote from "./../../resource/img/welcome/feature/fnote.png";

import lonely from "./../../resource/img/welcome/intro/lonely.jpg";
import { lang } from "../ChordPage/types/language";


const WelcomePage = () => {
  const { theme, language } = useContext(GlobalContext);
  const navigate = useNavigate();
  return (
    <div className={`min-h-screen ${theme}-Background pt-[7vh]`}>
      {" "}
      {/* Phần Carousel Trang trí */}
      <div className="mb-10 relative flex justify-center items-center">
        <div className="text-center absolute flex justify-center items-center  z-50 opacity-100">
          <button
            className="
          inline-flex items-center justify-center h-10 
          px-8 py-4 
          border-none border-gray-300 rounded-full shadow-custom 
          font-bold text-2xl text-gray-800 bg-white-200 hover:bg-gray-100 "
            onClick={() => {
              navigate("/chord");
            }}
          >
            {lang[language].WelcomePage.letstart}
          </button>
        </div>
        <Carousel
          interval={5000}
          className=" overflow-hidden shadow-lg max-h-[85vh] opacity-90 z-20"
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={freedom}
              alt="Guitar Practice 1"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={inband}
              alt="Guitar Practice 2"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={maybepro}
              alt="Guitar Practice 3"
            />
          </Carousel.Item>{" "}
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={natural}
              alt="Guitar Practice 3"
            />
          </Carousel.Item>{" "}
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={street}
              alt="Guitar Practice 3"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="flex flex-col items-center mb-16">
        <h1 className="text-4xl font-bold mb-5 text-gray-700 text-center">
{lang[language].WelcomePage.welcome}        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="lg:w-1/2 p-4">
            <p className="text-lg text-gray-600 leading-relaxed">
              {lang[language].WelcomePage.intro}
            </p>
          </div>
          <div className="lg:w-1/2 p-4">
            <img
              className="rounded-lg shadow-lg"
              src={lonely}
              alt="Guitar Illustration"
            />
          </div>
        </div>
      </div>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-700">{lang[language].WelcomePage.feature.label}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 space-content-evenly">
          <div className="p-4 shadow-md rounded-lg bg-white">
            <img
              className="w-full h-40 object-cover rounded-lg mb-4"
              src={fchord}
              alt="Feature 1"
            />
            <h3 className="text-xl font-semibold">
              {lang[language].WelcomePage.feature.chord}
            </h3>
          </div>
          <div className="p-4 shadow-md rounded-lg bg-white">
            <img
              className="w-full h-40 object-cover rounded-lg mb-4"
              src={fpen}
              alt="Feature 2"
            />
            <h3 className="text-xl font-semibold">{lang[language].WelcomePage.feature.pentatonic}</h3>
          </div>
          <div className="p-4 shadow-md rounded-lg bg-white">
            <img
              className="w-full h-40 object-cover rounded-lg mb-4"
              src={fnote}
              alt="Feature 3"
            />
            <h3 className="text-xl font-semibold">{lang[language].WelcomePage.feature.note}</h3>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button
          className={`
          inline-flex items-center justify-center h-10 
          px-8 py-4 mt-10 mb-20
          border-none border-gray-300 rounded-full shadow-custom 
          font-bold text-2xl text-gray-800 ${
            theme === Theme.Dark.value ? "bg-blue-200" : "bg-yellow-200"
          } hover:bg-gray-100 `}
          onClick={() => {
            navigate("/chord");
          }}
        >
          {lang[language].WelcomePage.letstart}
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
