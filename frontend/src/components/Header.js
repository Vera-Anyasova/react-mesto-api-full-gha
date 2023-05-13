import React from "react";
import logo from "../images/header-logo.svg";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

function Header({ email, handleSignout }) {
  return (
    <header className="header">
      <img src={logo} alt="Место Россия" className="header__logo" />
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__menu">
              <p className="header__email">{email}</p>
              <button
                type="button"
                onClick={handleSignout}
                className="header__button"
                value="Выйти"
              >
                Выйти
              </button>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
