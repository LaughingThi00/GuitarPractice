import React, { createContext, useState } from "react";
import { Theme } from "../pages/ChordPage/types/themes";
import { lang } from "../pages/ChordPage/types/language";
import {
  faGuitar,
  faRectangleList,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [theme, setTheme] = useState(Theme.Light.value);
  const [language, setLanguage] = useState(lang.US.name);
  const toggleDarkMode = () =>
    setTheme((prev) =>
      prev === Theme.Dark.value ? Theme.Light.value : Theme.Dark.value
    );
  const toggleLanguage = () =>
    setLanguage(language === lang.US.name ? lang.VN.name : lang.US.name);
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const mov = id === "_ChordPart" ? 0.2 : 0.1;
      const offsetY =
        section.getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight * mov;
      window.scrollTo({ top: offsetY, behavior: "smooth" });
    }
  };

  const [NavItem, setNavItem] = useState(null);
  const NavType = [
    { ic: faSliders, navTo: "_SettingPart" },
    { ic: faGuitar, navTo: "_ChordPart" },
    { ic: faRectangleList, navTo: "_ListPart" },
  ];

  const groupNav = (
    <div className="ScrollBar-container">
      {NavType.map((it, idx) => (
        <div
          key={idx}
          className={`ScrollBar-item ${
            it.navTo === NavItem ? "text-black" : "text-gray-500"
          }`}
          onClick={() => {
            handleScroll(it.navTo);
            setNavItem(it.navTo);
          }}
        >
          <FontAwesomeIcon icon={it.ic} />
        </div>
      ))}
    </div>
  );

  return (
    <GlobalContext.Provider
      value={{
        theme,
        language,
        groupNav,
        NavItem,
        toggleDarkMode,
        toggleLanguage,
        handleScroll,
      }}
    >
      {" "}
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
