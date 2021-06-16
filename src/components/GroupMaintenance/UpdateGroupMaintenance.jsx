/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { GroupMaintenanceSidebar } from '../Sidebar/Sidebar';
import './index.css';
import MoreInfo from './MoreInfo';
import meetingDays from './FormData';
import { getGroupMaintenance, updateGroupMaintenance } from '../../actions/groupMaintenance';
import GroupMaintenanceValidator from '../Validators/GroupMaintenanceValidator';

const UpdateGroupMaintenance = () => {
  const [systemFrequencies, setSystemFrequencies] = useState([]);
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [dataState, setDataState] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = () => {
      axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetSystemFrequencies')
        .then(response => setSystemFrequencies(response.data))
        .catch(error => console.log(error.message));
    };

    fetchData();
  }, []);

  useEffect(() => {
    dispatch(getGroupMaintenance(id));
  }, []);

  const groupDetails = useSelector(state => state.groupMaintenanceReducer);

  useEffect(() => {
    if (Object.keys(groupDetails.groupMaintenance).length > 0) {
      setDataState(groupDetails.groupMaintenance);
    }
  }, [groupDetails.groupMaintenance]);

  const handleChange = e => {
    const { name, value } = e.target;
    setDataState({
      ...dataState,
      [name]: value,
    });
  };

  const updateCustomer = e => {
    e.preventDefault();
    const state = 'Update Group Maintenance';
    const response = GroupMaintenanceValidator(dataState, state);
    setErrors(response);
    if (Object.values(response).includes('Updating')) {
      if (Object.keys(response).length === 1) {
        console.log(dataState, 'new values');
        dispatch(updateGroupMaintenance(dataState, id, history));
      }
    }
  };

  console.log(errors, 'errors');

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
            {
                  Object.keys(dataState).length > 0 ? (
                    <form className="main-form-color boder" onSubmit={updateCustomer}>
                      <div className="left-section">
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
                              value={dataState.groupName}
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
                                value={dataState.formationDate
                                    && new Date(dataState.formationDate)
                                      .toISOString()
                                      .substring(0, 10)}
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
                                  value={dataState.regDate
                                      && new Date(dataState.regDate)
                                        .toISOString()
                                        .substring(0, 10)}
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
                                value={dataState.location}
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
                                  value={dataState.regNo}
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
                              value={dataState.village}
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
                              value={dataState.sourcedBy}
                              onChange={handleChange}
                              type="text"
                            />
                          </div>
                        </div>
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
                              value={dataState.creditOfficer}
                              onChange={handleChange}
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="right-section">
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
                              value={dataState.savingsProductID}
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
                              value={dataState.loanProductID}
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
                                value={dataState.maxMembers}
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
                                  value={dataState.minMembersLoanDisb}
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
                                value={dataState.meetingDay}
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
                                  value={dataState.meetingFreq}
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
                              value={dataState.meetingPlace}
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
                            Update
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : null
              }
            <MoreInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateGroupMaintenance;
