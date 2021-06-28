/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import HolidaySidebar from "./HolidaySideBar";
import "./index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../Loader/Loader";
import { Button, Input } from "../../_generics/Generics";
import Spinner from "../../Spinner/Spinner";
import axios from "axios";
import * as RiIcons from "react-icons/ri";

const baseUrl = "https://tricofin.azurewebsites.net";

const SystemHolidays = () => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(dates);
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

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
            <div className="set-holiday-section">
              <div className="calender-section">
                <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  filterDate={isWeekday}
                />
              </div>

              <div className="holiday-remarks">
                <h3>Remarks</h3>
              </div>
              <div className="buttons-add-holiday">
                <h3>buttons</h3>
              </div>
            </div>
            <div className="view-holidays-section">
              <h3>View Holidays</h3>
            </div>
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
