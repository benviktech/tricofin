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
import Loader from "./Loader/Loader";
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
  // const [remarks, setRemarks] = useState("");
  const [errors, setErrors] = useState({});
  const initialHolidate = {
    holidayDate: startDate,
    remarks: "",
    createdOn: "2021-06-30T15:06:28.108Z",
    modifiedBy: "BENEVIK",
    createdBy: "BENEVIK",
    modifiedOn: "2021-06-30T15:06:28.108Z",
  };
  const [holidate, setHolidate] = useState(initialHolidate);

  const fetchSystemHolidays = async () => {
    axios
      .get(`${baseUrl}/api/System/GetSystemHolidays`)
      .then(function (response) {
        setHolidays(response.data);
      })
      .catch(function (error) {});
  };

  const createSystemHolidays = async () => {
    const response = HolidayValidator(workingDates);
    setErrors(response);
    if (Object.keys(response).length === 0) {
      console.log(workingDates);
      axios
        .post(`${baseUrl}/api/System/SaveSystemHolidays`, workingDates)
        .then(function (response) {
          setHolidays(response.data);
          toast.success(`Holiday set Successfully`);
        })
        .catch(function (error) {
          toast.error(`Failed to create holiday`);
        });
    }
  };

  const clearDate = () => {
    setWorkingDates([]);
    setStartDate("");
    setEndDate(null);
    setHolidate(initialHolidate);
  };

  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  function getDates(startDate, stopDate) {
    let dateArray = new Array();
    let currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push({ ...holidate, holidayDate: currentDate.toISOString() });
      currentDate = currentDate.addDays(1);
    }
    return dateArray;
  }

  useEffect(() => {
    console.log(workingDates);
  }, [workingDates]);

  const HolidayValidator = (datesArray) => {
    const result = {};
    if (datesArray.length <= 0) {
      result.date = "Choose a Date";
    }
    if (!holidate.remarks.trim("")) {
      result.remarks = "A holiday Date must have a remark";
    }
    return result;
  };

  useEffect(() => {
    if (endDate !== null) {
      setWorkingDates(getDates(startDate, endDate));
      return;
    } else if (startDate) {
      setWorkingDates((previousStates) => [
        ...previousStates,
        { ...holidate, holidayDate: startDate.toISOString() },
      ]);
    }
  }, [startDate, endDate]);

  const onChange = (dates) => {
    const [start, end] = dates;
    const { date, ...newErrors } = errors;
    setErrors(newErrors);
    setStartDate(start);
    setEndDate(end);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const { remarks, ...newErrors } = errors;
    setErrors(newErrors);
    if (workingDates.length > 0) {
      workingDates.forEach((holiday) => {
        holiday.remarks = value;
      });
    }
    setHolidate({ ...holidate, [name]: value });
  };

  return holidays.length > 0 ? (
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
                  <div
                    className={
                      errors.date ? "required label-holiday" : "label-holiday"
                    }
                  >
                    Choose a Day(s)
                  </div>
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
                      errors.remarks
                        ? "required label-holiday"
                        : "label-holiday"
                    }
                  >
                    Remarks
                  </div>
                  <div className="input-box">
                    <Input
                      name="remarks"
                      type="text"
                      value={holidate.remarks}
                      className="text-input-holiday"
                      handleChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="buttons-add-holiday">
                <div className="holiday-buttons-section">
                  <div className="holiday-buttons-section-container">
                    <Button
                      // disabled={workingDates.length <= 0}
                      onClick={createSystemHolidays}
                      name="Add"
                    />
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
      <Loader headerText="Public Holidays: Holidays" />
    </div>
  );
};

export default SystemHolidays;
