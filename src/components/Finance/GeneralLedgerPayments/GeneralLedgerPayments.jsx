/* eslint-disable  jsx-a11y/click-events-have-key-events */
/* eslint-disable  jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-destructuring */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import fetchData from '../GeneralLedger/fetchData';
import { fetchGLParameters, updateGLParameters } from '../../../actions/generalLedger';

const GeneralLedgerPayments = () => {
  const [glParameters, setGlParameters] = useState([]);
  const [glIds, setGlids] = useState([]);
  const [editState, setEditState] = useState(false);
  const [currentAccount, setCurrentAccount] = useState({});
  const [selectedAccount, setSelectedAccount] = useState({});
  const [accountBelow, setAccountBelow] = useState('');
  const dispatch = useDispatch();
  const generalLedgerReducer = useSelector(state => state.generalLedgerReducer);

  const {
    searchIndividualCustomer,
    searchedCustomer,
    finalSortedList,
    setFinalSortedList,
    setSearchedCustomer,
  } = fetchData();

  useEffect(async () => {
    await dispatch(fetchGLParameters());
  }, []);

  useEffect(() => {
    setGlParameters(generalLedgerReducer.glParametersList);
  }, [generalLedgerReducer.glParametersList]);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/Finance/GetGeneralLedgerIDs')
      .then(response => setGlids(response?.data))
      .catch(error => console.log(error.message));
  }, []);

  const fetchAccount = accountId => {
    let result = '';
    if (glIds.length > 0) {
      result = (glIds.filter(element => element.glid === accountId))[0].glName;
    }
    return result;
  };

  useEffect(() => {
    if (Object.keys(generalLedgerReducer.updatedGlParameter).length > 0) {
      const result = fetchAccount(generalLedgerReducer.updatedGlParameter.accountID);
      setAccountBelow(result);
      setCurrentAccount(generalLedgerReducer.updatedGlParameter);
    }
  }, [generalLedgerReducer.updatedGlParameter]);

  const selectAccount = element => setCurrentAccount(element);
  const editAccount = () => {
    setSelectedAccount({});
    setSearchedCustomer('');
    setEditState(true);
  };
  const chooseAccount = element => setSelectedAccount(element);

  useEffect(() => {
    setSearchedCustomer(selectedAccount.glid);
    setFinalSortedList([]);
  }, [selectedAccount]);

  useEffect(() => {
    if (currentAccount.accountID) {
      setAccountBelow(fetchAccount(currentAccount.accountID));
    }
  }, [currentAccount]);

  const submitUpdate = () => {
    if (Object.keys(selectedAccount).length > 0
    && Object.keys(currentAccount).length > 0) {
      const data = {
        serialID: currentAccount.serialID,
        accountID: selectedAccount.glid,
        glType: currentAccount.glType,
        description: currentAccount.description,
        createdOn: '2021-10-01T08:45:59.250Z',
        createdBy: 'BENVIK',
        modifiedOn: '2021-10-01T08:45:59.250Z',
        modifiedBy: 'BENVIK',
      };
      dispatch(updateGLParameters(data));
      setEditState(false);
    }
  };

  const cancelEditState = () => setEditState(false);

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info-lg">
          <span>Main General Ledger Parameters</span>
        </div>
        <div className="lower-downer-section-gen-led">
          <div className="first-ledger-parameters text-white">SerialID</div>
          <div className="second-ledger-parameters text-white">Description</div>
          <div className="third-ledger-parameters text-white">GL Account ID</div>
          <div className="forth-ledger-parameters text-white">GL Account Name</div>
        </div>
        {
          glParameters.length > 0 ? glParameters.map(element => (
            <div
              onClick={() => selectAccount(element)}
              key={element.serialID}
              className="lower-downer-section-gen-led lower-downer-section-gen-led-lower"
            >
              <div className="first-ledger-parameters">{ element.serialID }</div>
              <div className="second-ledger-parameters">{ element.description }</div>
              <div className="third-ledger-parameters">{ element.accountID }</div>
              <div className="forth-ledger-parameters">
                { element.accountID && fetchAccount(element.accountID) }
              </div>
            </div>
          )) : null
        }
        <div className="gl-parameters-submission-form">
          <div className="mb-2 gl-parameters-submission-form-header">GL Parameters Details</div>
          <div className="gl-parameter-details-bottom">
            <div className="inter-branch-left">GL Parameter :</div>
            {
              Object.keys(currentAccount).length > 0 ? (
                <div className="inter-branch-right">
                  { currentAccount.serialID }
                  {' '}
                  -
                  {' '}
                  { currentAccount.description.length < 20
                    ? (currentAccount.description)
                    : (`${currentAccount.description.substring(0, 19)} ...`)}
                  {' '}
                  :
                </div>
              ) : <div className="inter-branch-right" />
            }
          </div>
          <div className="gl-parameter-details-bottom">
            <div className="inter-branch-left">GL AccountID :</div>
            { editState ? (
              <div className="p-0" style={{ border: 'none' }}>
                <input
                  autoComplete="off"
                  name="description"
                  className="w-100"
                  type="text"
                  value={searchedCustomer}
                  onChange={searchIndividualCustomer}
                />
                {
                  searchedCustomer !== '' ? (
                    <div className="modal-popup-section">
                      <div className="inner-section-modal-section">
                        {
                            Array.from(new Set(finalSortedList)).map(customer => (
                              <div
                                onClick={() => chooseAccount(customer)}
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
                  ) : null
                }
              </div>
            )
              : (
                <input
                  type="text"
                  disabled
                  value={currentAccount.accountID !== null ? currentAccount.accountID : ''}
                />
              ) }
            <div className="first-empty-parameter">
              { editState ? selectedAccount.glType
                : currentAccount.glType && currentAccount.glType }
            </div>
            <div className="second-empty-parameter">
              { editState ? selectedAccount.glName
                : currentAccount.accountID && accountBelow }
            </div>
          </div>
        </div>
        <div className="gl-parameters-button-section">
          <button onClick={editAccount} type="button">Edit</button>
          <button onClick={submitUpdate} type="button">Save</button>
          <button onClick={cancelEditState} type="button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default GeneralLedgerPayments;
