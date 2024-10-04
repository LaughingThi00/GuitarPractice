import React, { useContext } from "react";
import { GlobalContext } from "../../provider/globalProvider";
import { lang } from "../ChordPage/types/language";

const Footer: React.FC = () => {
  const { theme, language } = useContext(GlobalContext);
  return (
    <footer className={`${theme}-Footer text-white py-8`}>
      <div
        className="text-4xl font-bold mt-5 mb-40 mini:mb-20 "
        style={{ fontFamily: "Dancing Script, cursive" }}
      >
        {lang[language].Footer.label}
      </div>
      <div
        className=" 
        Footer-Content-Container 
        mini:flex-col"
      >
        {lang[language].Footer.content.map((ct, ind) => {
          return (
            <div
              key={ind}
              className="flex flex-col items-start justify-start 

              mini:justify-center 
              mini:items-center 
              mini:space-content-between 
              mini:mb-10"
            >
              <h5 className="text-2xl font-bold  h-1/3">{ct.label}</h5>
              <ul className="list-disc list-inside flex flex-col items-start h-2/3">
                {ct.item.map((element, index) => {
                  return (
                    <li
                      key={index}
                      className=" p-1 opacity-50 hover:opacity-100 text-white-200 text-xl"
                    >
                      <a
                        className={`no-underline text-inherit focus:outline-none cursor-pointer transition-all duration-300 ${theme}-Footer-Item-Hover `}
                      >
                        {element}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>{" "}
      <div className="text-center mt-20 mb-2">
        <p className="opacity-50 text-sm">© Laughing Thi</p>
      </div>
    </footer>
  );
};

export default Footer;
