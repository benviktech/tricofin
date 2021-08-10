/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { GeneralLedgerSidebar } from '../../Sidebar/Sidebar';
import './index.css';
import Modal from './Modal';
import fetchData from './fetchData';
import { saveGeneralLedger } from '../../../actions/generalLedger';

const initialState = {
  branch: '',
  multiple: 'No',
};

const GeneralLedgerMaintenance = () => {
  const [systemBranches, setSystemBranches] = useState([]);
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [currentBranch, setCurrentBranch] = useState('');
  const [branchDetail, setBranchDetail] = useState('');
  const [submissionData, setSubmissionData] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    glTypes, glSubTypes,
    searchIndividualCustomer,
    searchedCustomer,
    finalSortedList,
    setSearchedCustomer,
    setFinalSortedList,
  } = fetchData();

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/System/GetBranches')
      .then(response => setSystemBranches(response.data))
      .catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    setValues({
      ...values,
      branch: '000',
    });
  }, []);

  useEffect(() => {
    setCurrentBranch(values.branch);
  }, [values.branch]);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const currentBranchDetails = data => setBranchDetail(data);

  useEffect(() => {
    setSearchedCustomer(branchDetail.glid);
    setFinalSortedList([]);
  }, [branchDetail]);

  const displayID = id => {
    let result = '';
    glTypes.forEach(element => {
      if (element.glTypeID === id) {
        result = element.glType;
      }
    });
    return result;
  };

  const displaySubID = id => {
    let result = '';
    glSubTypes.forEach(element => {
      if (element.glSubTypeID === id) {
        result = element.glSubType;
      }
    });
    return result;
  };

  const submitFormData = e => {
    e.preventDefault();
    const data = {
      ...branchDetail,
      ...values,
    };
    setSubmissionData(data);
    const formError = { state: 'creating' };
    if (!Object.keys(data).includes('glid')) {
      formError.glId = 'GL ID is required';
    }
    setErrors(formError);
  };

  useEffect(() => {
    console.log(errors, 'errors');
    if (Object.keys(errors).includes('state')) {
      if (Object.keys(errors).length === 1) {
        console.log('inside the submit section');
        dispatch(saveGeneralLedger(submissionData, history));
      }
    }
  }, [errors]);

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>GL Information</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <GeneralLedgerSidebar />
          </div>
          <div className="submit-form-top-section">
            <form className="ledger-form" onSubmit={submitFormData}>
              <div className="left-form-section">
                <div className="ledger-account">
                  <div className="span-section">
                    <span>GL Account ID:</span>
                  </div>
                  <div className="input-section">
                    <input type="text" />
                  </div>
                </div>
                <div className="ledger-account">
                  <div className="span-section">
                    <span>Branch:</span>
                  </div>
                  <div className="input-section select-branch-name">
                    {
                    systemBranches.length > 0 ? (
                      <select
                        name="branch"
                        value={values.branch}
                        onChange={handleChange}
                      >
                        <option value="" disabled selected hidden>Select</option>
                        {
                          systemBranches.map(branch => (
                            <option
                              key={branch.branchID}
                              value={branch.branchID}
                            >
                              {branch.branchName}
                            </option>
                          ))
                        }
                      </select>
                    ) : (
                      <select>
                        <option value="" disabled selected hidden>Select</option>
                      </select>
                    )
                  }
                    <div>{currentBranch}</div>
                  </div>
                </div>
                <div className="ledger-account">
                  <div className="span-section">
                    <span>GL ID:</span>
                  </div>
                  <div className="input-section input-section-two select-branch-name-two">
                    <input
                      autoComplete="off"
                      name="description"
                      className="w-50"
                      type="text"
                      value={searchedCustomer}
                      onChange={searchIndividualCustomer}
                    />
                    {
                      searchedCustomer === '' ? (
                        <div className="modal-hide-section" />
                      ) : (

                        <div className="modal-popup-section">
                          <div className="inner-section-modal-section">
                            {
                              Array.from(new Set(finalSortedList)).map(customer => (
                                <div
                                  onClick={() => currentBranchDetails(customer)}
                                  className="inner-section-modal-section-inner border"
                                  key={customer.glid}
                                >
                                  <div className="modal-customer-name-section mr-2">
                                    { customer.glid }
                                  </div>
                                  <div className="modal-customer-name-section mr-2">
                                    { customer.glName }
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      )
                    }
                    <div className="current-branc-name w-50">
                      { branchDetail.glName ? (
                        branchDetail.glName.length < 20
                          ? branchDetail.glName
                          : (`${branchDetail.glName.substring(0, 21)} ...`)
                      ) : null }
                    </div>
                  </div>
                </div>
                <div className="ledger-account">
                  <div className="span-section">
                    <span>GL Types:</span>
                  </div>
                  <div className="input-section">
                    <div className="branch-details-section">
                      { displayID(branchDetail.glType) }
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-form-section">
                <div className="ledger-subtypes">
                  <div className="right-span-section">
                    <span>GL Sub Type:</span>
                  </div>
                  <div className="right-input-section">
                    <div className="branch-details-section">
                      { displaySubID(branchDetail.glSubType) }
                    </div>
                  </div>
                </div>
                <div className="ledger-subtypes">
                  <div className="right-span-section">
                    <span>GL Account Exist in all Branches:</span>
                  </div>
                  <div className="right-input-section">
                    <select
                      name="multiple"
                      value={values.multiple}
                      onChange={handleChange}
                    >
                      <option value="No" selected>No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                </div>
                <div className="button-section">
                  <div className="add-button">
                    <button type="submit">Add</button>
                  </div>
                  <div className="cancel-button">
                    <button type="button">Cancel</button>
                  </div>
                </div>
              </div>
            </form>
            <Modal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralLedgerMaintenance;
