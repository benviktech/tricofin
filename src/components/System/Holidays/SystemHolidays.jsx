/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import HolidaySidebar from "./HolidaySideBar";
import "./index.css";
import Loader from "../../Loader/Loader";
import { Button, Input } from "../../_generics/Generics";
import Spinner from "../../Spinner/Spinner";
import "../../../../node_modules/react-simple-tree-menu/dist/main.css";
import axios from "axios";
import * as RiIcons from "react-icons/ri";

const baseUrl = "https://tricofin.azurewebsites.net";

const SystemHolidays = () => {
  const dispatch = useDispatch();

  return true ? (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Public Holidays: Mark Holidays</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <HolidaySidebar />
          </div>
          <div className="submit-form-top-section">
            <h1>View Holidays</h1>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="spinner section">
      <Loader />
    </div>
  );
};

export default SystemHolidays;
