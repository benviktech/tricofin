/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import NavbarData from './NavbarData';

const Navbar = () => (
  <div className="nav-section">
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto d-flex align-items-center w-100">
          <li>
            <Link to="/" className="nav-link company-logo text-white">
              TricoFin
            </Link>
          </li>
          {
                NavbarData.map(navdata => (
                  <li key={navdata.mainText} className="nav-item dropdown">
                    <Link
                      to="#"
                      className="nav-link dropdown-toggle-style text-white"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {navdata.mainText}
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      {
                        navdata.innerLinks.map((link, index) => (
                          <Link
                            key={index}
                            to={link.to}
                            className="dropdown-item item-text-size"
                          >
                            { link.linkText }
                          </Link>

                        ))
                      }
                    </div>
                  </li>
                ))
              }
          <li className="nav-item dropdown link-fa-user">
            <i
              className="fas fa-user nav-link text-white"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            />
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to="#" className="dropdown-item item-text-size">Settings</Link>
              <Link to="#" className="dropdown-item item-text-size border-icon">Log Out</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Navbar;
