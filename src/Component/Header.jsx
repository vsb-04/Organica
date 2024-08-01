import React, { useState } from "react"; // Removed useEffect as it is not used
import { useNavigate } from "react-router-dom";
import * as Scroll from 'react-scroll';

// Or Access Link, Element, etc as follows
let Link = Scroll.Link;

export const Header = () => {
  const [islogin, setislogin] = useState(sessionStorage.getItem("token"));
  const navigate = useNavigate();

  const handalRedirect = () => {
    if (islogin) {
      navigate(`/cart`);
    } else {
      navigate(`/login`);
    }
  };

  const handalLogout = () => {
    sessionStorage.removeItem("token");
    setislogin(false);
    navigate(`/`);
  };

  return (
    <header className="header" data-header="">
      <div className="nav-wrapper">
        <div className="container">
          <h1 className="h1">
            <a href="/" className="logo">
              Organ<span className="span">ica</span>
            </a>
          </h1>
          <button
            className="nav-open-btn"
            aria-label="Open Menu"
            data-nav-open-btn=""
          >
            <ion-icon name="menu-outline" />
          </button>
          <nav className="navbar" data-navbar="">
            <button
              className="nav-close-btn"
              aria-label="Close Menu"
              data-nav-close-btn=""
            >
              <ion-icon name="close-outline" />
            </button>
            <ul className="navbar-list">
              <li>
                <a href="/" className="navbar-link" style={{ cursor: 'pointer' }}>
                  Home
                </a>
              </li>
              <li>
                <Link
                  activeClass="active"
                  className="navbar-link"
                  smooth="linear"
                  spy
                  to="contact"
                  offset={-30}
                  style={{ cursor: 'pointer' }}
                >
                  About
                </Link>
              </li>
              <li>
                <a href="/shop" className="navbar-link" style={{ cursor: 'pointer' }}>
                  Shop
                </a>
              </li>
              <li>
                <Link
                  activeClass="active"
                  className="navbar-link"
                  smooth="linear"
                  spy
                  to="blog"
                  offset={-30}
                  style={{ cursor: 'pointer' }}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  activeClass="active"
                  className="navbar-link"
                  smooth="linear"
                  spy
                  to="products"
                  offset={-30}
                  style={{ cursor: 'pointer' }}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  activeClass="active"
                  className="navbar-link"
                  smooth="linear"
                  spy
                  to="contact"
                  offset={-30}
                  style={{ cursor: 'pointer' }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header-action">
            <div className="search-wrapper" data-search-wrapper="">
              <button
                className="header-action-btn"
                aria-label="Toggle search"
                data-search-btn=""
              >
                <ion-icon name="search-outline" className="search-icon" />
              </button>
              <div className="input-wrapper">
                <input
                  type="search"
                  name="search"
                  placeholder="Search here"
                  className="search-input"
                />
                <button className="search-submit" aria-label="Submit search">
                  <ion-icon name="search-outline" />
                </button>
              </div>
            </div>
            {!islogin ? (
              <button
                className="header-action-btn"
                aria-label="Open shopping cart"
                data-panel-btn="cart"
                onClick={handalRedirect}
              >
                <ion-icon name="person-circle-outline"></ion-icon>
              </button>
            ) : (
              <>
                <button
                  className="header-action-btn"
                  aria-label="Open shopping cart"
                  data-panel-btn="cart"
                  onClick={handalRedirect}
                >
                  <ion-icon name="basket-outline" />
                  <data className="btn-badge" value={2}>
                    02
                  </data>
                </button>
                <button
                  className="header-action-btn"
                  aria-label="Logout"
                  data-panel-btn="logout"
                  onClick={handalLogout}
                >
                  <ion-icon name="log-out-outline"></ion-icon>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
