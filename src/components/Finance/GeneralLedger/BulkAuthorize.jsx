import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { GeneralLedgerSidebar } from '../../Sidebar/Sidebar';
import { verifyGLs } from '../../../actions/generalLedger';

const initialState = { bulk: '' };

const BulkAuthorize = () => {
  const [ledgerAccounts, setLedgerAccounts] = useState([]);
  const [ledgerBranches, setLedgerBranches] = useState([]);
  const [values, setValues] = useState(initialState);
  const [sortedList, setSortedList] = useState([]);
  const [checkSorted, setCheckedSorted] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/Finance/GetGeneralLedgers')
      .then(response => setLedgerAccounts(response?.data))
      .catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/System/GetBranches')
      .then(response => {
        const updatedResponse = [...response?.data, { branchID: '', branchName: 'All Branches' }];
        setLedgerBranches(updatedResponse);
      })
      .catch(error => error.message);
  }, []);

  const handleChange = e => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const filterSelectedGLs = id => {
    if (id !== '') {
      setSortedList(ledgerAccounts.filter(element => element.branchID === id));
    } else {
      setSortedList(ledgerAccounts);
    }
  };

  useEffect(() => {
    filterSelectedGLs(values.bulk);
  }, [values]);

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

  useEffect(() => {
    if (checkSorted.length > 0) {
      const results = checkSorted.map(ledger => ledger.accountID);
      dispatch(verifyGLs(results));
    }
  }, [checkSorted]);

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Bulk Verify GL Accounts</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <GeneralLedgerSidebar />
          </div>
          <div className="submit-form-top-section">
            <div className="top-bulk-selection-section">
              <div className="bulk-selection">
                <div className="bulk-title">Bulk</div>
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
