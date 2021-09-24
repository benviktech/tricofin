/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import axios from 'axios';
import { closeGeneralLedgerAccount, GetGeneralLedger, UpdateGeneralLedger } from '../../../actions/generalLedger';
import { GeneralLedgerSidebar } from '../../Sidebar/Sidebar';
import Modal from './Modal';
import fetchData from './fetchData';
import DeleteModal from '../../Pages/DeleteModal';

const GeneralLedgerView = () => {
  const [systemBranches, setSystemBranches] = useState([]);
  const [values, setValues] = useState({});
  const [branchDetail, setBranchDetail] = useState({});
  const [updateState, setUpdateState] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const [displayModal, setDisplayModal] = useState(false);

  const generalLedger = useSelector(state => state.generalLedgerReducer.generalLedger);

  const changeUpdateState = () => {
    setUpdateState(true);
    setValues(generalLedger);
  };

  const {
    glTypes, glSubTypes,
    searchIndividualCustomer,
    searchedCustomer,
    finalSortedList,
    setSearchedCustomer,
    setFinalSortedList,
    responseData,
  } = fetchData();

  useEffect(() => {
    if (updateState) {
      responseData.forEach(element => {
        if (element.glid === generalLedger.glid) {
          setBranchDetail(element);
        }
      });
    }
  }, [updateState]);

  const handleChange = e => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const currentBranchDetails = data => setBranchDetail(data);

  useEffect(() => {
    setSearchedCustomer(branchDetail.glid);
    setValues({ ...values, glid: branchDetail.glid });
    setFinalSortedList([]);
  }, [branchDetail]);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/System/GetBranches')
      .then(response => setSystemBranches(response.data))
      .catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    dispatch(GetGeneralLedger(id));
  }, []);

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

  const saveUpdateGL = async () => {
    await dispatch(UpdateGeneralLedger(values));
    setUpdateState(false);
  };

  const filterGLId = (id, state) => {
    let result = '';
    responseData.forEach(element => {
      if (element.glid === id && state === 'type') {
        result = displayID(element.glType);
      }
      if (element.glid === id && state === 'subtype') {
        result = displaySubID(element.glSubType);
      }
    });
    return result;
  };

  const displaySystemBranch = branch => {
    let result = '';
    systemBranches.forEach(val => {
      if (val.branchID === branch) {
        result = val.branchName;
      }
    });
    return result;
  };

  const cancelGLUpdate = () => setUpdateState(false);
  const returnPage = () => history.push('/generaledgermaintenance');
  const routeBack = () => history.goBack();

  const deleteAccount = () => setDisplayModal(true);
  const continueDeleteFunction = () => {
    dispatch(closeGeneralLedgerAccount(id, history));
  };
  const cancelDeleteFunction = () => setDisplayModal(false);

  return (
    <div className="individual-customer-form">
      {
        displayModal && (
        <DeleteModal
          continueDelete={continueDeleteFunction}
          cancelDelete={cancelDeleteFunction}
          text="GL Account"
        />
        )
      }
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>GL Information</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <div className="back-button-section">
              <i
                className="fas fa-arrow-circle-left"
                style={{ fontSize: '20px', marginRight: '10px', cursor: 'pointer' }}
                onClick={routeBack}
              />
            </div>
            <GeneralLedgerSidebar />
          </div>
          <div className="submit-form-top-section">
            <div className="ledger-form">
              <div className="left-form-section">
                <div className="ledger-account">
                  <div className="span-section">
                    <span>GL Account ID:</span>
                  </div>
                  <div className="input-section">
                    {
                      Object.keys(generalLedger).length > 0 ? (
                        <div className="branch-details-section">
                          { generalLedger.accountID }
                        </div>
                      ) : <div className="branch-details-section" />
                    }
                  </div>
                </div>
                <div className="ledger-account">
                  <div className="span-section">
                    <span>Branch:</span>
                  </div>
                  <div className={updateState ? 'input-section select-branch-name' : 'input-section'}>
                    {
                      Object.keys(generalLedger).length > 0
                      && updateState === false ? (
                        <div className="branch-details-section">
                          { displaySystemBranch(generalLedger.branchID) }
                        </div>
                        )
                        : (
                          systemBranches.length > 0 && updateState ? (
                            <select
                              name="branchID"
                              value={values.branchID}
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
                        )
                      }
                    {
                      updateState ? <div>sample</div> : null
                    }
                  </div>
                </div>
                <div className="ledger-account">
                  <div className="span-section">
                    <span>GL ID:</span>
                  </div>
                  {
                    Object.keys(generalLedger).length > 0
                    && updateState === false ? (
                      <div className="input-section">
                        <div className="branch-details-section">
                          { generalLedger.glid }
                        </div>
                      </div>
                      ) : (
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
                      )
                  }

                </div>
                <div className="ledger-account">
                  <div className="span-section">
                    <span>GL Types:</span>
                  </div>
                  <div className="input-section">
                    <div className="branch-details-section">
                      { branchDetail.glType ? displayID(branchDetail.glType)
                        : Object.keys(generalLedger).length > 0 && updateState === false
                          ? filterGLId(generalLedger.glid, 'type') : null }
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
                      { branchDetail.glSubType ? displaySubID(branchDetail.glSubType)
                        : Object.keys(generalLedger).length > 0 && updateState === false
                          ? filterGLId(generalLedger.glid, 'subtype') : null }
                    </div>
                  </div>
                </div>
                {
                  updateState ? (
                    <div className="ledger-subtypes">
                      <div className="right-span-section">
                        <span>GL Account Exist in all Branches:</span>
                      </div>
                      <div className="right-input-section">
                        <select
                          name="multiple"
                        >
                          <option value="No" selected>No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>
                  ) : null
                }
                <div className="button-section">
                  <div className="add-button">
                    <button
                      type="button"
                      onClick={updateState ? saveUpdateGL : changeUpdateState}
                    >
                      {updateState ? 'Save' : 'Update'}
                    </button>
                  </div>
                  <div className="cancel-button">
                    <button
                      type="button"
                      onClick={updateState ? cancelGLUpdate : returnPage}
                    >
                      Cancel
                    </button>
                  </div>
                  {
                    !updateState ? (
                      <div className="cancel-button">
                        <button
                          type="button"
                          className="delete-account btn btn-danger"
                          onClick={deleteAccount}
                        >
                          Close Account
                        </button>
                      </div>
                    ) : null
                  }
                </div>
              </div>
            </div>
            <Modal generalLedger={generalLedger} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralLedgerView;
