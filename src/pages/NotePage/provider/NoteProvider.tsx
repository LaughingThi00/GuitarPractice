import React, { createContext } from "react";

export const NotePageContext = createContext(null);

const NoteProvider = ({ children }) => {
  return (
    <NotePageContext.Provider value={{}}>{children}</NotePageContext.Provider>
  );
};

export default NoteProvider;
