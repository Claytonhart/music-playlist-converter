import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__item header__logo">
        Playlist Converter
      </Link>
      <div>
        <Link to="/convert" className="header__item header__convert">
          Convert a playlist
        </Link>
      </div>
    </header>
  );
};

export default Header;
