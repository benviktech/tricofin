/* eslint-disable  jsx-a11y/click-events-have-key-events */
/* eslint-disable  jsx-a11y/no-static-element-interactions */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GeneralLedgerSidebar } from '../../Sidebar/Sidebar';
import { verifyGLs } from '../../../actions/generalLedger';

const initialState = { bulk: '' };

const BulkAuthorize = () => {
  const [ledgerAccounts, setLedgerAccounts] = useState([]);
  const [ledgerBranches, setLedgerBranches] = useState([]);
  const [values, setValues] = useState(initialState);
  const [sortedList, setSortedList] = useState([]);
  const [checkSorted, setCheckedSorted] = useState([]);
  const [verificationState, setVerificationState] = useState(false);
  const [alterDisplay, setAlterDisplay] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const fetchData = async () => {
    await axios.get('https://tricofin.azurewebsites.net/api/Finance/GetGeneralLedgers')
      .then(response => setLedgerAccounts(response?.data))
      .catch(error => console.log(error.message));
  };

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/System/GetBranches')
      .then(response => {
        const updatedResponse = [...response?.data, { branchID: '', branchName: 'All Branches' }];
        setLedgerBranches(updatedResponse);
      })
      .catch(error => error.message);
  }, []);

  useEffect(async () => {
    if (verificationState) {
      await fetchData();
      setAlterDisplay(true);
    }
  }, [verificationState]);

  const handleChange = e => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const filterSelectedGLs = id => {
    setAlterDisplay(false);
    if (id !== '') {
      setSortedList(ledgerAccounts.filter(
        element => element.branchID === id && element.isVerified === false,
      ));
    } else {
      setSortedList(ledgerAccounts.filter(element => element.isVerified === false));
    }
  };

  useEffect(() => {
    filterSelectedGLs(values.bulk);
    setVerificationState(false);
  }, [values, alterDisplay]);

  const handleSort = e => {
    const { name, checked } = e.target;
    if (name === 'allSelect') {
      const tempGL = sortedList.map(ledger => ({ ...ledger, isChecked: checked }));
      setSortedList(tempGL);
    } else {
      const tempGL = sortedList.map(
        ledger => (ledger.accountID === name ? { ...ledger, isChecked: checked } : ledger),
      );
      setSortedList(tempGL);
    }
  };

  const verifyContent = () => {
    setCheckedSorted(sortedList.filter(element => element.isChecked === true));
  };

  useEffect(async () => {
    if (checkSorted.length > 0) {
      const results = checkSorted.map(ledger => ledger.accountID);
      await dispatch(verifyGLs(results));
      setVerificationState(true);
    }
  }, [checkSorted]);

  const routeBack = () => history.goBack();

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Bulk Verify GL Accounts</span>
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
            <div className="top-bulk-selection-section">
              <div className="bulk-selection">
                <div className="bulk-title" style={{ fontSize: '12px', fontWeight: '600' }}>
                  Bulk
                  {' '}
                  {' '}
                  :
                </div>
                <div className="bulk-title w-50 ml-2">
                  {

                    ledgerAccounts.length > 0 ? (
                      <select
                        name="bulk"
                        value={values.bulk}
                        onChange={handleChange}
                      >
                        <option value="" disabled selected hidden>Select</option>
                        {
                          ledgerBranches.map(branch => (
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
                </div>
              </div>
              <div className="verification-button-section">
                <button onClick={verifyContent} type="button" className="btn btn-success">
                  <i className="far fa-check-circle mr-2" />
                  Verify
                </button>
              </div>
            </div>
            <div className="select-all-section">
              <div className="inner-select-all-section">
                <div>
                  <input
                    type="checkbox"
                    name="allSelect"
                    checked={!sortedList.some(ledger => ledger?.isChecked !== true)}
                    onChange={handleSort}
                  />
                </div>
                <div className="checkbox-label">Select All</div>
              </div>
            </div>
            <div className="selected-gl-verification-list">
              <div className="branch-id-header">BrID</div>
              <div className="account-id-header">AccountID</div>
              <div className="account-name-header">AccountName</div>
              <div className="created-by-header">CreatedBy</div>
              <div className="created-on-header">CreatedOn</div>
            </div>
            <div className="display-sorted-gl-accounts">
              {
                sortedList.length > 0 ? (
                  sortedList.map(element => (
                    <div key={element.accountID} className="selected-gl-verification-list lower-list-content">
                      <div className="branch-id-header">
                        <div className="lower-check-box">
                          <input
                            type="checkbox"
                            name={element.accountID}
                            checked={element?.isChecked || false}
                            onChange={handleSort}
                          />
                        </div>
                        <div className="lower-check-label">
                          {element.branchID}
                        </div>
                      </div>
                      <div className="account-id-header">{element.accountID}</div>
                      <div className="account-name-header">{element.accountName}</div>
                      <div className="created-by-header">{element.createdBy}</div>
                      <div className="created-on-header">
                        {new Date(element.createdOn)
                          .toUTCString()
                          .split(' ')
                          .slice(0, 4)
                          .join(' ')}
                      </div>
                    </div>
                  ))
                ) : null
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkAuthorize;
