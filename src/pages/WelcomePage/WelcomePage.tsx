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
    <div className={`min-h-screen pt-[7vh] ${theme}-Background`}>
      <div className="relative flex justify-center items-center mb-10">
        <div className="absolute flex justify-center items-center text-center z-50 opacity-100">
          <button
            className="
              inline-flex items-center justify-center 
              h-10 px-8 py-4 
              text-2xl font-bold text-gray-800 
              border-none border-gray-300 
              bg-white-200 hover:bg-gray-100 
              rounded-full shadow-custom"
            onClick={() => {
              navigate("/chord");
            }}
          >
            {lang[language].WelcomePage.letstart}
          </button>
        </div>
        <Carousel
          interval={5000}
          className="overflow-hidden max-h-[85vh] opacity-90 z-20 shadow-lg"
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
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={natural}
              alt="Guitar Practice 3"
            />
          </Carousel.Item>
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
        <h1 className="text-4xl font-bold text-center text-gray-700 mb-5">
          {lang[language].WelcomePage.welcome}
        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="w-full lg:w-1/2 p-4 flex">
            <p className="w-full text-lg text-justify leading-relaxed text-gray-600">
              {lang[language].WelcomePage.intro}
            </p>
          </div>
          <div className="w-full lg:w-1/2 p-4 flex">
            <img
              className="w-full rounded-lg shadow-lg"
              src={lonely}
              alt="Guitar Illustration"
            />
          </div>
        </div>
      </div>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-700 mb-8">
          {lang[language].WelcomePage.feature.label}
        </h2>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 space-content-evenly">
          <div className="p-2 bg-white shadow-md rounded-lg">
            <img
              className="w-full h-40 object-cover rounded-lg mb-4"
              src={fchord}
              alt="Feature 1"
            />
            <h3 className="text-xl font-semibold">
              {lang[language].WelcomePage.feature.chord}
            </h3>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <img
              className="w-full h-40 object-cover rounded-lg mb-4"
              src={fpen}
              alt="Feature 2"
            />
            <h3 className="text-xl font-semibold">
              {lang[language].WelcomePage.feature.pentatonic}
            </h3>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <img
              className="w-full h-40 object-cover rounded-lg mb-4"
              src={fnote}
              alt="Feature 3"
            />
            <h3 className="text-xl font-semibold">
              {lang[language].WelcomePage.feature.note}
            </h3>
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
          <div className="p-4 bg-white shadow-md rounded-lg w-full ">
            <img
              className="w-full h-40 object-cover rounded-lg mb-4"
              src={fchord}
              alt="Feature 1"
            />
            <h3 className="text-xl font-semibold">
              {lang[language].WelcomePage.feature.chord}
            </h3>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg w-full ">
            <img
              className="w-full h-40 object-cover rounded-lg mb-4"
              src={fpen}
              alt="Feature 2"
            />
            <h3 className="text-xl font-semibold">
              {lang[language].WelcomePage.feature.pentatonic}
            </h3>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg w-full ">
            <img
              className="w-full h-40 object-cover rounded-lg mb-4"
              src={fnote}
              alt="Feature 3"
            />
            <h3 className="text-xl font-semibold">
              {lang[language].WelcomePage.feature.note}
            </h3>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button
          className={`
            inline-flex items-center justify-center 
            h-10 px-8 py-4 mt-10 mb-20 
            text-2xl font-bold text-gray-800 
            border-none border-gray-300 
            ${
              theme === Theme.Dark.value ? "bg-blue-200" : "bg-yellow-200"
            } hover:bg-gray-100 
            rounded-full shadow-custom
          `}
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
