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

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [holidays, setHolidays] = useState([]);
  const [workingDates, setWorkingDates] = useState([]);

  const fetchSystemHolidays = async () => {
    axios
      .get(`${baseUrl}/api/System/GetSystemHolidays`)
      .then(function (response) {
        setHolidays(response.data);
      })
      .catch(function (error) {});
  };

  const clearDate = () => {
    setWorkingDates([]);
    setStartDate("");
    setEndDate(null);
  };

  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push({ holidate: new Date(currentDate), remarks: "" });
      currentDate = currentDate.addDays(1);
    }
    return dateArray;
  }

  useEffect(() => {
    console.log(workingDates);
  }, [workingDates]);

  useEffect(() => {
    if (endDate !== null) {
      setWorkingDates(getDates(startDate, endDate));
      return;
    } else if (startDate) {
      const holidate = {
        holidate: startDate,
        remarks: "",
      };
      setWorkingDates((previousStates) => [holidate]);
    }
  }, [startDate, endDate]);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
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
                <div className="input-div">
                  <div className="label-holiday">Choose a Day(s)</div>
                  <div className="input-box">
                    <DatePicker
                      selected={startDate}
                      onChange={onChange}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      inline
                    />
                    <Button
                      onClick={clearDate}
                      disabled={workingDates.length <= 0}
                      name="clear"
                    />
                  </div>
                </div>
              </div>

              <div className="holiday-remarks">
                {/* <h3>Remarks</h3> */}
                <div className="input-div">
                  <div
                    className={
                      false ? "required label-holiday" : "label-holiday"
                    }
                  >
                    Remarks
                  </div>
                  <div className="input-box">
                    <Input
                      name="roleID"
                      type="text"
                      className="text-input-holiday"
                    />
                  </div>
                </div>
              </div>
              <div className="buttons-add-holiday">
                <div className="holiday-buttons-section">
                  <div className="holiday-buttons-section-container">
                    <Button disabled={workingDates.length <= 0} name="Add" />
                    <Button name="Edit" />
                    <Button name="Remove" />
                  </div>
                </div>
              </div>
            </div>
            <div className="view-holidays-section">
              <div className="holidays-listings p-2">SYSTEM HOLIDAYS</div>
              <div className="holidays-listing-table">
                <div className="holidays-header-section">
                  <div className="column-two">Holidate</div>
                  <div className="column-three">Remarks</div>
                </div>
                {holidays.map((role) => (
                  <div className="holidays-rows-section">
                    <div className="column-two">Role ID</div>
                    <div className="column-three">Description</div>
                  </div>
                ))}
              </div>
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
