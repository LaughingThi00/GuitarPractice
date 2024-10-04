import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Theme } from "../ChordPage/types/themes";
import { GlobalContext } from "../../provider/globalProvider";
import { lang } from "../ChordPage/types/language";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faMoon,
  faRightToBracket,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { Offcanvas } from "react-bootstrap";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);  

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
  const navigate = useNavigate();

  const navList = (
    <nav className="nav-tabs  med:hidden ">
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
          <NavLink to="https://www.oolimo.com/en/guitar-chords/analyze">
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
  );
  const logo = (
    <div
      className={`logo ${theme}-Logo cursor-pointer`}
      onClick={() => {
        navigate("/");
      }}
    >
      Móc's
    </div>
  );
  const buttonList = (
    <div className="header-controls w-1/4 place-content-end med:w-1/2">
      <div className={` flex items-center justify-center w-1/2 `}>
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
            className={`font-bold text-2xl p-2 max-w-1/2 ${
              theme === Theme.Dark.value ? "text-gray-400" : "text-white"
            } transition-colors duration-300`}
          />
          <FontAwesomeIcon
            icon={faMoon}
            className={`font-bold text-2xl p-2 max-w-1/2 ${
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
        <FontAwesomeIcon icon={faRightToBracket} />{" "}
      </button>
    </div>
  );
  const smallScreenList = (
    <div
      className="hidden cursor-pointer med:block relative"
      onClick={() => {
        setMenuOpen(!menuOpen);
      }}
    >
      <FontAwesomeIcon icon={faList} className="text-2xl" />
      <Offcanvas
        show={menuOpen}
        onHide={() => setMenuOpen(!menuOpen)}
        placement="end"
        backdropClassName="bg-gray-500"
      >
        <Offcanvas.Header className={`${theme}-Header p-2`}></Offcanvas.Header>
        <Offcanvas.Body className={`${theme}-Background p-0 max-w-1/2`}>
          <ul className="flex-col">
            <li
              className={`p-4 hover:bg-white font-bold text-3xl ${theme}-Header-Item-Color flex `}
            >
              <NavLink
                className={`w-full hover:${theme}-Header-Item-Color hover:opacity-80`}
                to="/chord"
              >
                {lang[language].Header.tabs.chord}
              </NavLink>
            </li>
            <li
              className={`p-4 hover:bg-white font-bold text-3xl ${theme}-Header-Item-Color flex `}
            >
              <NavLink
                className={`w-full hover:${theme}-Header-Item-Color hover:opacity-80`}
                to="/pentatonic"
              >
                {lang[language].Header.tabs.pentatonic}
              </NavLink>
            </li>
            <li
              className={`p-4 hover:bg-white font-bold text-3xl ${theme}-Header-Item-Color flex `}
            >
              <NavLink
                className={`w-full hover:${theme}-Header-Item-Color hover:opacity-80`}
                to="https://www.oolimo.com/en/guitar-chords/analyze"
              >
                {lang[language].Header.tabs.note}
              </NavLink>
            </li>
            <li
              className={`p-4 hover:bg-white font-bold text-3xl ${theme}-Header-Item-Color flex `}
            >
              <NavLink
                className={`w-full hover:${theme}-Header-Item-Color hover:opacity-80`}
                to="/song"
              >
                {lang[language].Header.tabs.song}
              </NavLink>
            </li>
            <li
              className={`p-4 hover:bg-white font-bold text-3xl ${theme}-Header-Item-Color flex `}
            >
              <NavLink
                className={`w-full hover:${theme}-Header-Item-Color hover:opacity-80`}
                to="/introduce"
              >
                {lang[language].Header.tabs.introduce}
              </NavLink>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );

  return (
    <header
      className={`header ${
        Theme[theme].Header
      } transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {logo}
      {navList}
      {buttonList}
      {smallScreenList}
    </header>
  );
};

export default Header;
