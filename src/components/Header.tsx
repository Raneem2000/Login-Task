import React from "react";
import logo from "../assets/navbar-icon.svg";
import image from "../assets/website-icon.svg";
import "./Header.scss"; // Importing the SASS file

const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="Logo" className="header__logo" />
        <span>Black IN Dashboard</span>
      </div>
      <div className="header__right">
        <img src={image} alt="Website" className="header__icon" />
        <span>Go To Website</span>
      </div>
    </header>
  );
};

export default Header;
