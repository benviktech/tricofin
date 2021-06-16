/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GroupMaintenanceSidebar } from '../Sidebar/Sidebar';
import './index.css';
import MoreInfo from './MoreInfo';
import UseForm from './UseForm';
import meetingDays from './FormData';
import GroupMaintenanceValidator from '../Validators/GroupMaintenanceValidator';

const GroupMaintenance = () => {
  const [systemFrequencies, setSystemFrequencies] = useState([]);
  const {
    handleChange, values, handleSubmit,
  } = UseForm(GroupMaintenanceValidator);

  useEffect(() => {
    const fetchData = () => {
      axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetSystemFrequencies')
        .then(response => setSystemFrequencies(response.data))
        .catch(error => console.log(error.message));
    };

    fetchData();
  }, []);

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Customer Information</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <GroupMaintenanceSidebar />
          </div>
          <div className="submit-form-top-section">
            <form className="main-form-color boder" onSubmit={handleSubmit}>
              <div className="left-section">
                <div className="horizontal-section">
                  <div className="left-horizontal-section">Search Group Name:</div>
                  <div className="right-horizontal-section">
                    <input type="text" />
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">
                    Group Name
                    <span className="text-danger mx-1">
                      *
                    </span>
                    :
                  </div>
                  <div className="right-horizontal-section">
                    <input
                      name="groupName"
                      value={values.groupName}
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">
                    Formation Date
                    <span className="text-danger mx-1">
                      *
                    </span>
                    :
                  </div>
                  <div className="right-horizontal-section">
                    <div className="inner-left-section">
                      <input
                        name="formationDate"
                        value={values.formationDate}
                        onChange={handleChange}
                        type="date"
                      />
                    </div>
                    <div className="inner-right-section">
                      <div className="inner-right-label">
                        Reg Date
                        <span className="text-danger mx-1">
                          *
                        </span>
                        :
                      </div>
                      <div className="inner-right-input">
                        <input
                          name="regDate"
                          value={values.regDate}
                          onChange={handleChange}
                          type="date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">
                    Location
                    <span className="text-danger mx-1">
                      *
                    </span>
                    :
                  </div>
                  <div className="right-horizontal-section">
                    <div className="inner-left-section">
                      <input
                        name="location"
                        value={values.location}
                        onChange={handleChange}
                        type="text"
                      />
                    </div>
                    <div className="inner-right-section">
                      <div className="inner-right-label">
                        Reg No
                        <span className="text-danger mx-1">
                          *
                        </span>
                        :
                      </div>
                      <div className="inner-right-input">
                        <input
                          name="regNo"
                          value={values.regNo}
                          onChange={handleChange}
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">
                    Village
                    <span className="text-danger mx-1">
                      *
                    </span>
                    :
                  </div>
                  <div className="right-horizontal-section">
                    <input
                      name="village"
                      value={values.village}
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">Sourced By :</div>
                  <div className="right-horizontal-section">
                    <input
                      name="sourcedBy"
                      value={values.sourcedBy}
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="right-section">
                <div className="horizontal-section">
                  <div className="left-horizontal-section">
                    Credit Officer
                    <span className="text-danger mx-1">
                      *
                    </span>
                    :
                  </div>
                  <div className="right-horizontal-section">
                    <input
                      name="creditOfficer"
                      value={values.creditOfficer}
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">
                    Savings Product
                    <span className="text-danger mx-1">
                      *
                    </span>
                    :
                  </div>
                  <div className="right-horizontal-section">
                    <input
                      name="savingsProductID"
                      value={values.savingsProductID}
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">
                    Loan Product
                    <span className="text-danger mx-1">
                      *
                    </span>
                    :
                  </div>
                  <div className="right-horizontal-section">
                    <input
                      name="loanProductID"
                      value={values.loanProductID}
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">
                    Max Members Allowed
                    <span className="text-danger mx-1">
                      *
                    </span>
                    :
                  </div>
                  <div className="right-horizontal-section">
                    <div className="inner-left-section">
                      <input
                        name="maxMembers"
                        value={values.maxMembers}
                        onChange={handleChange}
                        type="text"
                      />
                    </div>
                    <div className="inner-right-section">
                      <div className="inner-right-label members-number">
                        Min Members for Loan Disburesment
                        <span className="text-danger mx-1">
                          *
                        </span>
                        :
                      </div>
                      <div className="inner-right-input">
                        <input
                          name="minMembersLoanDisb"
                          value={values.minMembersLoanDisb}
                          onChange={handleChange}
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">
                    Meeting Day
                    <span className="text-danger mx-1">
                      *
                    </span>
                    :
                  </div>
                  <div className="right-horizontal-section">
                    <div className="inner-left-section select-section">
                      <select
                        className="form-control-input"
                        name="meetingDay"
                        value={values.meetingDay}
                        onChange={handleChange}
                      >
                        <option value="" disabled selected hidden>Select</option>
                        {
                          meetingDays.map((meeting, index) => (
                            <option
                              key={index}
                              value={meeting.value}
                            >
                              {meeting.day}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="inner-right-section select-section-two">
                      <div className="inner-right-label">
                        Meeting Frequency
                        <span className="text-danger mx-1">
                          *
                        </span>
                        :
                      </div>
                      <div className="inner-right-input">
                        <select
                          className="form-control-input"
                          name="meetingFreq"
                          value={values.meetingFreq}
                          onChange={handleChange}
                        >
                          <option value="" disabled selected hidden>Select</option>
                          {
                          systemFrequencies.map((frequency, index) => (
                            <option
                              key={index}
                              value={frequency.freqID}
                            >
                              {frequency.frequency}
                            </option>
                          ))
                        }
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">
                    Meeting Place
                    <span className="text-danger mx-1">
                      *
                    </span>
                    :
                  </div>
                  <div className="right-horizontal-section">
                    <input
                      name="meetingPlace"
                      value={values.meetingPlace}
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                </div>

                <div className="submit-button-section">
                  <button
                    type="submit"
                    className="add-customer-btn"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="add-customer-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
            <MoreInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupMaintenance;
