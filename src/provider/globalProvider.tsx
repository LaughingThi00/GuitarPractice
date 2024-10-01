import React, { createContext, useState } from "react";
import { Theme } from "../pages/ChordPage/types/themes";
import { lang } from "../pages/ChordPage/types/language";

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

  return (
    <GlobalContext.Provider
      value={{
        theme,
        language,
        toggleDarkMode,
        toggleLanguage,
      }}
    >
      {" "}
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
