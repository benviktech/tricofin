/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GroupMaintenanceSidebar } from '../Sidebar/Sidebar';
import './index.css';
import MoreInfo from './MoreInfo';
import UseForm from './UseForm';
import meetingDays from './FormData';
import GroupMaintenanceValidator from '../Validators/GroupMaintenanceValidator';
import SearchCustomer from './SearchCustomer';
import SeeachOneCustomer from '../Customer/SearchCustomer';
import SetSearchCustomer from './SetSearchCustomer';

const GroupMaintenance = () => {
  const [systemFrequencies, setSystemFrequencies] = useState([]);
  const [systemBranches, setSystemBranches] = useState([]);
  const [numErrors, setNumErrors] = useState({});
  const {
    handleChange, values, handleSubmit, errors, setErrors,
  } = UseForm(GroupMaintenanceValidator);

  useEffect(() => {
    const fetchData = () => {
      axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetSystemFrequencies')
        .then(response => {
          setSystemFrequencies(response.data);
          axios.get('https://tricofin.azurewebsites.net/api/System/GetBranches')
            .then(response => setSystemBranches(response.data))
            .catch(error => console.log(error.message));
        })
        .catch(error => console.log(error.message));
    };

    fetchData();
  }, []);

  const {
    searchIndividualCustomerGroup,
    searchedCustomerGroup,
    finalSortedListGroup,
    setSearchedCustomerGroup,
  } = SearchCustomer();

  const {
    searchIndividualCustomer,
    searchedCustomer,
    finalSortedList,
    setSearchedCustomer,
  } = SeeachOneCustomer();

  const {
    searchIndividualCustomerSet,
    searchedCustomerSet,
    finalSortedListSet,
    setSearchedCustomerSet,
  } = SetSearchCustomer();

  console.log(setSearchedCustomerGroup);
  const clearErrors = () => {
    setErrors({});
  };

  const cutomerDataFunction = (custData, type) => {
    if (type === 'source') {
      setSearchedCustomer('');
      values.sourcedBy = `${`${custData.custID},`} ${custData.title} ${custData.surName} ${custData.foreName1}`;
    }
    if (type === 'credit') {
      setSearchedCustomerSet('');
      values.creditOfficer = `${`${custData.custID},`} ${custData.title} ${custData.surName} ${custData.foreName1}`;
    }
  };

  useEffect(() => {
    const state = 'Type session';
    setNumErrors(GroupMaintenanceValidator(values, state));
  }, [values]);

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
                <div className="horizontal-section manage-drop-down ">
                  <div className="left-horizontal-section">Search Group Name:</div>
                  <div className="right-horizontal-section">
                    <input
                      autoComplete="off"
                      type="text"
                      name="searchcustomer"
                      value={searchedCustomerGroup}
                      onChange={searchIndividualCustomerGroup}
                    />
                  </div>
                  {
                    searchedCustomerGroup === '' ? (
                      <div className="modal-hide-section" />
                    ) : (
                      <div className="modal-popup-section">
                        <div className="inner-section-modal-section">
                          {
                            Array.from(new Set(finalSortedListGroup)).map(customer => (
                              <Link
                                exact
                                to={{
                                  pathname: `/groupmaintenanceview/${customer.groupID}`,
                                }}
                                className="inner-section-modal-section-inner border"
                                key={customer.groupID}
                              >
                                <div className="modal-customer-name-section mr-2">
                                  { customer.groupName }
                                </div>
                                <div className="modal-customer-name-section mr-2">
                                  { customer.location}
                                </div>
                              </Link>
                            ))
                          }
                        </div>
                      </div>
                    )
                }
                </div>

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
                      value={values.groupName}
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
                        value={values.branchID}
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
                          value={values.regNo}
                          onChange={handleChange}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="error-display-section-left">
                      {errors.branchID && errors.branchID}
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
                      value={values.location}
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
                      value={values.village}
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                  <div className="error-display-section">
                    {errors.village && errors.village}
                  </div>
                </div>
                <div className="horizontal-section manage-drop-down-two ">
                  <div className="left-horizontal-section">Sourced By :</div>
                  <div className="right-horizontal-section">
                    {
                      values.sourcedBy.length > 0 ? (
                        <input
                          name="sourcedBy"
                          value={values.sourcedBy
                            .split(',')[1]
                            .trim()}
                          onChange={handleChange}
                          type="text"
                        />
                      ) : (
                        <input
                          autoComplete="off"
                          type="text"
                          name="searchcustomer"
                          value={searchedCustomer}
                          onChange={searchIndividualCustomer}
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
                <div className="horizontal-section manage-drop-down-two error-container-section">
                  <div className="left-horizontal-section">Credit Officer :</div>
                  <div className="right-horizontal-section">
                    {
                      values.creditOfficer.length > 0 ? (
                        <input
                          name="creditOfficer"
                          value={values.creditOfficer
                            .split(',')[1]
                            .trim()}
                          onChange={handleChange}
                          type="text"
                        />
                      ) : (
                        <input
                          autoComplete="off"
                          type="text"
                          name="searchcustomer"
                          value={searchedCustomerSet}
                          onChange={searchIndividualCustomerSet}
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

                  <div className="error-display-section">
                    {errors.creditOfficer && errors.creditOfficer}
                  </div>
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
                      value={values.savingsProductID}
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
                      value={values.loanProductID}
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
                        autoComplete="off"
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
                          autoComplete="off"
                          name="minMembersLoanDisb"
                          value={values.minMembersLoanDisb}
                          onChange={handleChange}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="error-display-section-left">
                      {numErrors.maxMembers
                      && numErrors.maxMembers.length > 0 ? numErrors.maxMembers
                        : errors.maxMembers
                        && errors.maxMembers.length > 0 ? errors.maxMembers
                          : null }
                    </div>
                    <div className="error-display-section">
                      {numErrors.minMembersLoanDisb
                      && numErrors.minMembersLoanDisb.length > 0 ? numErrors.minMembersLoanDisb
                        : errors.minMembersLoanDisb
                      && errors.minMembersLoanDisb.length > 0 ? errors.minMembersLoanDisb
                          : null }
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
                      value={values.meetingPlace}
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
                    Add
                  </button>
                  <button
                    type="button"
                    className="add-customer-btn"
                    onClick={clearErrors}
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
