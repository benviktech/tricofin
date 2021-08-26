/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchCustomerSet from './SearchGL';

const CopySingle = () => {
  const [sortedList, setSortedList] = useState([]);
  const [branchDetail, setBranchDetail] = useState('');
  const [branches, setBranches] = useState([]);

  const data = [{ BrID: '001', accountID: '0011000010005', AccountName: 'TELLER NAME' },
    { BrID: '001', accountID: '0011000010005', AccountName: 'TELLER NAME' },
    { BrID: '001', accountID: '0011000010005', AccountName: 'TELLER NAME' },
    { BrID: '001', accountID: '0011000010005', AccountName: 'TELLER NAME' }];

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/System/GetBranches')
      .then(response => setBranches(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  const {
    searchIndividualCustomerSet,
    searchedCustomerSet,
    finalSortedListSet,
    setSearchedCustomerSet,
    setFinalSortedListSet,
  } = SearchCustomerSet();

  const currentBranchDetails = data => setBranchDetail(data);
  useEffect(() => {
    setSearchedCustomerSet(branchDetail.accountID);
    setFinalSortedListSet([]);
  }, [branchDetail]);

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

  const filterBranch = id => {
    let resultBranch = '';
    branches.forEach(bran => {
      if (bran.branchID === id) {
        resultBranch = bran.branchName;
      }
    });
    return resultBranch;
  };

  return (
    <div className="main-copy-single-section">
      <div className="copy-single-section">
        <div className="gl-account-id-section">
          <div className="inner-gl-account-id-section">
            <span>GL A/C ID:</span>
          </div>
          <div className="input-section">
            <input
              autoComplete="off"
              name="description"
              type="text"
              value={searchedCustomerSet}
              onChange={searchIndividualCustomerSet}
            />
            {
              searchedCustomerSet === '' ? (
                <div className="modal-hide-section" />
              ) : (
                <div className="modal-popup-section-new">
                  <div className="inner-section-modal-section">
                    {
                      Array.from(new Set(finalSortedListSet)).map(account => (
                        <div
                          onClick={() => currentBranchDetails(account)}
                          className="inner-section-modal-section-inner border"
                          key={account.accountID}
                        >
                          <div className="modal-customer-name-section mr-2">
                            { account.accountID }
                          </div>
                          <div className="modal-customer-name-section mr-2">
                            { account.accountName }
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )
            }
          </div>
          <div className="gl-account-name">
            <span>
              { Object.keys(branchDetail).length > 0
                ? branchDetail.accountName
                : null }
            </span>
          </div>
        </div>
        <div className="gl-branch-id-section">
          <div className="inner-gl-branch-id-section">
            <span>BRANCH:</span>
          </div>
          <div className="details-gl-branch-id-section">
            <span>
              { Object.keys(branchDetail).length > 0
                ? branchDetail.branchID
                : null}
            </span>
          </div>
          <div className="details-gl-branch-name-section">
            <span>
              {' '}
              { Object.keys(branchDetail).length > 0
                ? filterBranch(branchDetail.branchID)
                : null }
            </span>
          </div>
        </div>
        <button type="button" className="btn btn-success">
          <i className="far fa-check-circle mr-2" />
          Submit
        </button>
      </div>
      <div className="lower-copy-single-section">
        <div className="gl-exists-section">
          <div className="gl-exists-section-header">GL Exists</div>
          <div className="gl-exists-details-section">
            <div className="gl-exists-details-section-id bg-secondary-header">BrID</div>
            <div className="gl-exists-details-section-accountId bg-secondary-header">AccountID</div>
            <div className="gl-exists-details-section-account-name bg-secondary-header">Account Name</div>
          </div>
          <div className="main-gl-exists-details-section">
            {
            data.map(value => (
              <div key={value.BrID} className="gl-exists-details-section">
                <div className="gl-exists-details-section-id">{value.BrID}</div>
                <div className="gl-exists-details-section-accountId">{value.accountID}</div>
                <div className="gl-exists-details-section-account-name">{value.AccountName}</div>
              </div>
            ))
          }
          </div>
        </div>
        <div className="gl-does-not-exist-section">
          <div className="gl-does-not-exist-section-header">
            GL Does Not Exist
          </div>
          <div className="lower-gl-does-not-exist-section-header">
            <div className="first-lower-gl-does-not-exist-section-header">
              <input
                type="checkbox"
                name="allSelect"
                checked={!sortedList.some(ledger => ledger?.isChecked !== true)}
                onChange={handleSort}
              />
            </div>
            <div className="checkbox-label">Select All</div>
          </div>
          <div className="gl-does-not-exist-section-outter top-outer-gl-header-section">
            <div className="gl-does-not-exist-section-first">BrID</div>
            <div className="gl-does-not-exist-section-second">AccountName</div>
          </div>
          <div className="main-gl-does-not-exist-section">
            {
                data.map(element => (
                  <div key={element.BrID} className="gl-does-not-exist-section-outter">
                    <div className="gl-does-not-exist-section-first gl-does-not-exist-section-first-loop">
                      <div className="gl-does-not-exist-section-first-chechbox">
                        <input
                          type="checkbox"
                          name={element.accountID}
                          checked={element?.isChecked || false}
                          onChange={handleSort}
                        />
                      </div>
                      <div className="gl-does-not-exist-section-first-brID">
                        {element.BrID}
                      </div>
                    </div>
                    <div className="gl-does-not-exist-section-second">{element.AccountName}</div>
                  </div>
                ))
              }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopySingle;
