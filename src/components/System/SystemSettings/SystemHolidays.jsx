/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import SetingsSidebar from "./SettingsSideBar";
import "./index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "./Loader/Loader";
import { Button, Input } from "../../_generics/Generics";
import axios from "axios";
import * as RiIcons from "react-icons/ri";

const baseUrl = "https://tricofin.azurewebsites.net";

const SystemHolidays = () => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null)
  const [holidays, setHolidays] = useState([]);
  const [errors, setErrors] = useState({});
  const initialHolidate = {
    holidayDate: startDate,
    remarks: "",
    createdOn: formatDateTime(new Date()),
    modifiedBy: "BENEVIK",
    createdBy: "BENEVIK",
    modifiedOn: formatDateTime(new Date()),
  };
  const [workingDates, setWorkingDates] = useState(initialHolidate);
  const [hasSelectedDate, setHasSelectedDate] = useState(false);
  const [selected, setSelected] = useState(false);

  const fetchSystemHolidays = async () => {
    axios
      .get(`${baseUrl}/api/System/GetSystemHolidays`)
      .then(function (response) {
        console.log(response.data)
        setHolidays([...response.data.map(holiday=>({
          ...holiday,
          holidayDate: formatDateTime(holiday.holidayDate),
          createdOn: formatDateTime(holiday.createdOn),
          modifiedOn: formatDateTime(holiday.modifiedOn),
        }))]);
      })
      .catch(function (error) {});
  };

  useEffect(() => {
    fetchSystemHolidays();
  }, []);
  function formatDateTime (datevalue){
    if(typeof datevalue === 'object') {
      console.log(typeof datevalue)
      let currentDate = datevalue;
      let date = currentDate.getDate();
      let month = currentDate.getMonth();
      let year = currentDate.getFullYear();
      return currentDate.toISOString().split("T")[0];
    }
    if(typeof datevalue === 'string'){
      return datevalue.split("T")[0];
    }
  };

  function formatDisplayTime (datevalue){
    if(typeof datevalue === 'string'){
      let date = (parseInt(datevalue.split("T")[0].split("-")[2],10) + 1).toString()
      let dateArray = datevalue.split("T")[0].split("-");
      dateArray[2] = date;
      return dateArray.join("-");
    }
  };

  const createSystemHolidays = async () => {
    const response = HolidayValidator(workingDates);
    setErrors(response);
    if (Object.keys(response).length === 0) {
      console.log(workingDates)
      axios
        .post(`${baseUrl}/api/System/SaveSystemHolidays`, workingDates)
        .then(function (response) {
          setHolidays([...response.data.map(holiday=>({
            ...holiday,
            holidayDate: formatDateTime(holiday.holidayDate),
            createdOn: formatDateTime(holiday.createdOn),
            modifiedOn: formatDateTime(holiday.modifiedOn),
          }))]);
          toast.success(`Holiday set Successfully`);
        })
        .catch(function (error) {
          toast.warn(`Holiday Already Exists`);
        });
    }
  };

  const removeSystemHolidays = async () => {
    axios
      .delete(`${baseUrl}/api/System/DeleteSystemHoliday`, {
        data: { ...workingDates },
      })
      .then(function (response) {
        setHolidays([...response.data.map(holiday=>({
          ...holiday,
          holidayDate: formatDateTime(holiday.holidayDate),
          createdOn: formatDateTime(holiday.createdOn),
          modifiedOn: formatDateTime(holiday.modifiedOn),
        }))]);
        toast.success(`Holiday Removed Successfully`);
        setWorkingDates(initialHolidate);
        setSelectedDate(null)
        setSelected(false);
      })
      .catch(function (error) {
        toast.error(`Failed to Remove holiday!!`);
      });
  };

  const clearDate = () => {
    setWorkingDates({});
    setSelected(false);
    setSelectedDate(null)
    // setHolidate(initialHolidate);
    cancelAlert();
  };

  const cancelAlert = () => {
    setSelected(false);
    setSelectedDate(null)
    setWorkingDates(initialHolidate);
    setStartDate(new Date())
  };

  const HolidayValidator = (datesObject) => {
    const result = {};
    if (Object.keys(datesObject).length === 0) {
      result.date = "Choose a Date";
    }
    if (!workingDates.remarks.trim("")) {
      result.remarks = "A holiday Date must have a remark";
    }
    return result;
  };

  function dateExists(holidayDate, arr) {
    return arr.some(function (el) {
      return el.holidayDate === holidayDate;
    });
  }

  // useEffect(() => {
  //   setWorkingDates({ ...holidate, holidayDate: formatDateTime(startDate) });
  // }, [startDate]);

  const onChange = (dates) => {
    // const { date, ...newErrors } = errors;
    // setErrors(newErrors);
    // console.log(formatDateTime(dates))
    // console.log(typeof dates)
    setStartDate(dates);
    console.log(dates)
    setWorkingDates(currentWorkingDates =>({ ...currentWorkingDates, holidayDate: formatDateTime(dates) }));
    // cancelAlert();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // const { remarks, ...newErrors } = errors;
    // console.log(name,value)
    // setErrors(newErrors);
    setWorkingDates(currentState =>({ ...currentState, [name]: value.toUpperCase() }));
  };

  return holidays.length >= 0 ? (
    <div className="system-individual-customer-form">
      <div className="system-lower-form-section">
        <div className="system-maintenance-customer-info">
          <span>Public Holidays: Mark Holidays</span>
        </div>
        <div className="settings-lower-downer-section">
          <div className="settings-left-inner-form-section ">
            <SetingsSidebar/>
          </div>
          <div className="security-submit-form-top-section">
            {selected && (
              <div className="alert-bunner">
                <p className="indicator">
                  {`${workingDates.holidayDate}`} <br /> {`${workingDates.remarks}`}{" "}
                  <br />
                </p>
                <div className="span-container">
                  <span className="cancel-span" onClick={cancelAlert}>
                    X
                  </span>
                </div>
              </div>
            )}
            <div className="set-holiday-section">
              <div className="calender-section">
                <div className="input-div">
                  <div
                    className={
                      errors.date ? "required label-holiday" : "label-holiday"
                    }
                  >
                    Choose a Day
                  </div>
                  <div className="input-box">
                    <DatePicker
                      startDate={startDate }
                      selected={selectedDate}
                      onChange={onChange}
                      inline
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
                      value={workingDates.remarks}
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
                      disabled={workingDates.length <= 0}
                      onClick={createSystemHolidays}
                      name="Add"
                    />
                    <Button
                      onClick={clearDate}
                      // disabled={workingDates.length <= 0}
                      name="clear"
                    />
                    <Button name="Remove" onClick={removeSystemHolidays} />
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
                {holidays.map((holiday) => (
                  <div className="holidays-rows-section">
                    <div
                      className="column-two"
                      onClick={() => {
                        setWorkingDates(holiday);
                        setSelectedDate(null)
                        setSelectedDate(new Date(formatDisplayTime(holiday.holidayDate)))
                        setSelected(true);
                      }}
                    >
                      {formatDisplayTime(holiday.holidayDate)}
                    </div>
                    <div
                      className="column-three"
                      onClick={() => {
                        setWorkingDates(holiday);
                        setSelectedDate(null)
                        setSelectedDate(new Date(formatDisplayTime(holiday.holidayDate)))
                        setSelected(true);
                      }}
                    >
                      {holiday.remarks}
                    </div>
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
