import React from "react";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header-text">Móc's</div>

      <ul>
        <li>
          <NavLink to="chord">Chord</NavLink>
        </li>
        <li>
          <NavLink to="pentatonic">Pentatonic</NavLink>
        </li>
        <li>
          <NavLink to="note">Note</NavLink>
        </li>
        <li>
          <NavLink to="song">Song</NavLink>
        </li>
        <li>
          <NavLink to="introduce">Introduce</NavLink>
        </li>
       

      </ul>
    </div>
  );
};

export default Header;
