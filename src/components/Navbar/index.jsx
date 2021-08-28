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
                          <div key={index}>
                            { link.subNavList && link.subNavList.length > 0 ? (
                              <div className="dropdown-item sub-nav-dropdown dropright">
                                <div className="dropbtn dropdown-toggle dropdown-toggle-split p-0">
                                  <span className="mr-4">{ link.linkText }</span>
                                </div>
                                <div className="dropdown-content">
                                  {
                                    link.subNavList.map((subData, index) => (
                                      <Link
                                        className="nav-link dropdown-toggle-style"
                                        key={index}
                                        to={subData.to}
                                      >
                                        {subData.linkText}
                                      </Link>
                                    ))
                                    }
                                </div>
                              </div>
                            ) : (
                              <Link
                                to={link.to}
                                className="dropdown-item item-text-size"
                              >
                                { link.linkText }
                              </Link>
                            )}
                          </div>
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
