/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */

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
import SearchOneCustomer from '../Customer/SearchCustomer';
import SetSearchCustomer from './SetSearchCustomer';

const UpdateGroupMaintenance = () => {
  const [systemBranches, setSystemBranches] = useState([]);
  const [systemFrequencies, setSystemFrequencies] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [currentID, setCurrentID] = useState('');
  const [currentCreditor, setCurrentCreditor] = useState('');
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
    axios.get('https://tricofin.azurewebsites.net/api/System/GetBranches')
      .then(response => setSystemBranches(response.data))
      .catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/Customers/GetIndividualCustomers')
      .then(response => setUsersList(response.data))
      .catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    dispatch(getGroupMaintenance(id));
  }, []);

  const {
    searchIndividualCustomer,
    searchedCustomer,
    finalSortedList,
    setSearchedCustomer,
  } = SearchOneCustomer();

  const groupDetails = useSelector(state => state.groupMaintenanceReducer);

  useEffect(() => {
    if (Object.keys(groupDetails.groupMaintenance).length > 0) {
      setDataState(groupDetails.groupMaintenance);
      setCurrentID(groupDetails.groupMaintenance.sourcedBy);
      setCurrentCreditor(groupDetails.groupMaintenance.creditOfficer);
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
        console.log(dataState, 'datastate');
        const re = /^[0-9]+$/;
        if (re.test(dataState.sourcedBy)) {
          dispatch(updateGroupMaintenance(dataState, id, history, 'newSource'));
        } else {
          dispatch(updateGroupMaintenance(dataState, id, history, 'emptySource'));
        }
      }
    }
  };

  const displayCreditedBy = customerId => {
    let result = '';
    usersList.forEach(customer => {
      if (customer.custID === customerId) {
        result = `${`${customer.custID.trim()},`} ${(customer.title).trim()} ${customer.surName.trim()} ${customer.foreName1.trim()}`;
      }
    });
    return result;
  };

  const {
    searchIndividualCustomerSet,
    searchedCustomerSet,
    finalSortedListSet,
    setSearchedCustomerSet,
  } = SetSearchCustomer();

  const cutomerDataFunction = (custData, type) => {
    if (type === 'source') {
      setSearchedCustomer('');
      dataState.sourcedBy = custData.custID;
    }
    if (type === 'credit') {
      setSearchedCustomerSet('');
      dataState.creditOfficer = custData.custID;
    }
  };

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
                        <div className="horizontal-section error-container-section">
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
                          <div className="error-display-section">
                            {errors.groupName && errors.groupName}
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
                          <div className="right-horizontal-section error-container-section">
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
                            <div className="inner-right-section ">
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
                            <div className="error-display-section-left">
                              {errors.formationDate && errors.formationDate}
                            </div>
                            <div className="error-display-section">
                              {errors.regDate && errors.regDate}
                            </div>
                          </div>
                        </div>
                        <div className="horizontal-section">
                          <div className="left-horizontal-section">
                            Branch ID
                            <span className="text-danger mx-1">
                              *
                            </span>
                            :
                          </div>
                          <div className="right-horizontal-section error-container-section">
                            <div className="inner-left-section">
                              <select
                                name="branchID"
                                value={dataState.branchID}
                                onChange={handleChange}
                              >
                                <option value="" disabled selected hidden>Select</option>
                                {
                                  systemBranches.map((branch, index) => (
                                    <option
                                      key={index}
                                      value={branch.branchID}
                                    >
                                      {branch.branchName}
                                    </option>
                                  ))
                                }
                              </select>
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
                            <div className="error-display-section-left">
                              {errors.location && errors.location}
                            </div>
                            <div className="error-display-section">
                              {errors.regNo && errors.regNo}
                            </div>
                          </div>
                        </div>
                        <div className="horizontal-section error-container-section">
                          <div className="left-horizontal-section">
                            Location
                            <span className="text-danger mx-1">
                              *
                            </span>
                            :
                          </div>
                          <div className="right-horizontal-section">
                            <input
                              name="location"
                              value={dataState.location}
                              onChange={handleChange}
                              type="text"
                            />
                          </div>
                          <div className="error-display-section">
                            {errors.location && errors.location}
                          </div>
                        </div>
                        <div className="horizontal-section error-container-section">
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
                          <div className="error-display-section">
                            {errors.village && errors.village}
                          </div>
                        </div>
                        <div className="horizontal-section manage-drop-down-two">
                          <div className="left-horizontal-section">Sourced By :</div>
                          <div className="right-horizontal-section">
                            {
                              Object.keys(dataState).length > 0
                              && dataState.sourcedBy.length === currentID.length
                              && dataState.sourcedBy.length > 0
                                ? (
                                  <input
                                    autoComplete="off"
                                    value={((displayCreditedBy(dataState.sourcedBy)).split(','))[1]}
                                    name="sourcedBy"
                                    onChange={handleChange}
                                    type="text"
                                  />
                                )
                                : Object.keys(dataState).length > 0
                                  && currentID.length === 0
                                  && dataState.sourcedBy.length > 0
                                  ? (
                                    <input
                                      autoComplete="off"
                                      value={((displayCreditedBy(dataState.sourcedBy)).split(','))[1]}
                                      name="sourcedBy"
                                      onChange={handleChange}
                                      type="text"
                                    />
                                  ) : (
                                    <input
                                      autoComplete="off"
                                      name="searchcustomer"
                                      value={searchedCustomer}
                                      onChange={searchIndividualCustomer}
                                      type="text"
                                    />
                                  )
                            }
                          </div>
                          {
                            searchedCustomer === '' ? (
                              <div className="modal-hide-section" />
                            ) : (
                              <div className="names-drop-down-section">
                                <div className="names-drop-down-section-inner">
                                  {
                                    Array.from(new Set(finalSortedList)).map(customer => (
                                      <div
                                        className="names-drop-down-section-inner-section"
                                        key={customer.custID}
                                        onClick={() => cutomerDataFunction(customer, 'source')}
                                      >
                                        <div className="mr-1">
                                          { customer.title }
                                        </div>
                                        <div className="mr-1">
                                          { customer.surName }
                                        </div>
                                        <div>
                                          { customer.foreName1 }
                                        </div>
                                      </div>
                                    ))
                                  }
                                </div>
                              </div>
                            )
                          }
                        </div>
                      </div>
                      <div className="right-section">
                        <div className="horizontal-section manage-drop-down-two">
                          <div className="left-horizontal-section">Credit Officer :</div>
                          <div className="right-horizontal-section">
                            {
                              Object.keys(dataState).length > 0
                              && dataState.creditOfficer.length === currentCreditor.length
                                ? (
                                  <input
                                    autoComplete="off"
                                    value={((displayCreditedBy(dataState.creditOfficer)).split(','))[1]}
                                    name="creditOfficer"
                                    onChange={handleChange}
                                    type="text"
                                  />
                                ) : (
                                  <input
                                    autoComplete="off"
                                    name="searchcustomer"
                                    value={searchedCustomerSet}
                                    onChange={searchIndividualCustomerSet}
                                    type="text"
                                  />
                                )
                            }
                          </div>
                          {
                            searchedCustomerSet === '' ? (
                              <div className="modal-hide-section" />
                            ) : (
                              <div className="names-drop-down-section">
                                <div className="names-drop-down-section-inner">
                                  {
                                    Array.from(new Set(finalSortedListSet)).map(customer => (
                                      <div
                                        className="names-drop-down-section-inner-section"
                                        key={customer.custID}
                                        onClick={() => cutomerDataFunction(customer, 'credit')}
                                      >
                                        <div className="mr-1">
                                          { customer.title }
                                        </div>
                                        <div className="mr-1">
                                          { customer.surName }
                                        </div>
                                        <div>
                                          { customer.foreName1 }
                                        </div>
                                      </div>
                                    ))
                                  }
                                </div>
                              </div>
                            )
                          }
                        </div>
                        <div className="horizontal-section error-container-section">
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
                          <div className="error-display-section">
                            {errors.savingsProductID && errors.savingsProductID}
                          </div>
                        </div>
                        <div className="horizontal-section error-container-section">
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
                          <div className="error-display-section">
                            {errors.loanProductID && errors.loanProductID}
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
                          <div className="right-horizontal-section error-container-section">
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
                            <div className="error-display-section-left">
                              {errors.maxMembers && errors.maxMembers}
                            </div>
                            <div className="error-display-section">
                              {errors.minMembersLoanDisb && errors.minMembersLoanDisb}
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
                          <div className="right-horizontal-section error-container-section">
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
                            <div className="error-display-section-left">
                              {errors.meetingDay && errors.meetingDay}
                            </div>
                            <div className="error-display-section">
                              {errors.meetingFreq && errors.meetingFreq}
                            </div>
                          </div>
                        </div>
                        <div className="horizontal-section error-container-section">
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
                          <div className="error-display-section">
                            {errors.meetingPlace && errors.meetingPlace}
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
