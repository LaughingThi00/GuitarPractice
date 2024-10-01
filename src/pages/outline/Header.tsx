import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./../../css/Header.css";
import "./../../css/Theme.css";
import { Theme } from "../ChordPage/types/themes";
import { GlobalContext } from "../../provider/globalProvider";
import { lang } from "../ChordPage/types/language";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Header = () => {
  const { theme, toggleDarkMode, toggleLanguage, language } =
    useContext(GlobalContext);
  const [showHeader, setShowHeader] = useState(true);
  let lastScrollTop = 0;

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > lastScrollTop) {
      setShowHeader(false); 
    } else {
      setShowHeader(true);
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); 
    };
  }, []);

  return (
    <header
      className={`header ${
        Theme[theme].Header
      } transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className={`logo ${theme}-Logo`}>Móc's</div>

      <nav className="nav-tabs">
        <ul>
          <li>
            <NavLink to="/chord">{lang[language].Header.tabs.chord}</NavLink>
          </li>
          <li>
            <NavLink to="/pentatonic">
              {lang[language].Header.tabs.pentatonic}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="https://www.oolimo.com/en/guitar-chords/analyze"
            >
              {lang[language].Header.tabs.note}
            </NavLink>
          </li>
          <li>
            <NavLink to="/song">{lang[language].Header.tabs.song}</NavLink>
          </li>
          <li>
            <NavLink to="/introduce">
              {lang[language].Header.tabs.introduce}
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="header-controls w-1/4 place-content-end">
        <div className={`flex items-center justify-center    w-1/4 `}>
          <input
            type="checkbox"
            id="darkmode-toggle"
            checked={theme === Theme.Dark.value}
            onChange={toggleDarkMode}
            className="hidden"
          />
          <label
            htmlFor="darkmode-toggle"
            className={`flex flex-row place-content-around rounded-full cursor-pointer w-30 transition-all duration-300`}
          >
            <FontAwesomeIcon
              icon={faSun}
              className={`font-bold text-2xl p-2 ${
                theme === Theme.Dark.value ? "text-gray-400" : "text-white"
              } transition-colors duration-300`}
            />
            <FontAwesomeIcon
              icon={faMoon}
              className={`font-bold text-2xl p-2  ${
                theme === Theme.Dark.value ? "text-white" : "text-gray-400"
              } transition-colors duration-300`}
            />
          </label>
        </div>
        <button
          className="button-Header w-1/4"
          role="button"
          onClick={toggleLanguage}
        >
          {language}{" "}
        </button>
        <button className="button-Header w-1/4" role="button">
          {lang[language].Header.login}
        </button>
      </div>
    </header>
  );
};

export default Header;
