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
  const [ledgerList, setLedgerList] = useState([]);
  const [currentGlid, setCurrentGlid] = useState('');
  const [filtereLedgers, setFilteredLedgers] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [differenceIdArray, setDifferenceIdArray] = useState([]);
  const [rightBranchArray, setRightBranchArray] = useState([]);
  const [checkSorted, setCheckedSorted] = useState([]);

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
    setCurrentGlid(branchDetail.glid);
    setFinalSortedListSet([]);
  }, [branchDetail]);

  useEffect(() => {
    const result = ledgerList.filter(
      element => element.glid === currentGlid,
    );

    setFilteredLedgers(result);
  }, [currentGlid]);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/System/GetBranches')
      .then(response => setBranchList(response?.data))
      .catch(error => console.log(error.message));
  }, [filtereLedgers]);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/Finance/GetGeneralLedgers')
      .then(response => setLedgerList(response?.data))
      .catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    const resultOne = [];
    const resultTwo = [];
    if (branchList.length > 0) {
      branchList.forEach(branch => resultOne.push(branch.branchID));
    }

    if (filtereLedgers.length > 0) {
      filtereLedgers.forEach(ledger => resultTwo.push(ledger.branchID));
    }

    const difference = resultOne.filter(x => !resultTwo.includes(x));
    setDifferenceIdArray(difference);
  }, [filtereLedgers]);

  const filterBranch = id => {
    let resultBranch = '';
    branches.forEach(bran => {
      if (bran.branchID === id) {
        resultBranch = bran.branchName;
      }
    });
    return resultBranch;
  };

  useEffect(() => {
    const finalArray = [];
    differenceIdArray.forEach(val => {
      branchList.forEach(element => {
        if (val === element.branchID) {
          finalArray.push(element);
        }
      });
    });
    setRightBranchArray(finalArray);
  }, [differenceIdArray]);

  useEffect(() => {
    setSortedList(rightBranchArray);
  }, [rightBranchArray]);

  const handleSort = e => {
    const { name, checked } = e.target;
    if (name === 'allSelect') {
      const tempGL = sortedList.map(ledger => ({ ...ledger, isChecked: checked }));
      setSortedList(tempGL);
    } else {
      const tempGL = sortedList.map(
        ledger => (ledger.branchID === name ? { ...ledger, isChecked: checked } : ledger),
      );
      setSortedList(tempGL);
    }
  };

  const CopySingleGL = () => {
    setCheckedSorted(sortedList.filter(element => element.isChecked === true));
  };

  useEffect(() => {
    console.log(checkSorted, 'checkSorted to be submitted');
  }, [checkSorted]);

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
              className="h-100"
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
                ? (
                  branchDetail.accountName.length < 22 ? branchDetail.accountName
                    : (`${branchDetail.accountName.substring(0, 22)} ...`)
                )
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
        <button onClick={CopySingleGL} type="button" className="btn btn-success">
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
            filtereLedgers.map(value => (
              <div key={value.accountID} className="gl-exists-details-section">
                <div className="gl-exists-details-section-id">{value.branchID}</div>
                <div className="gl-exists-details-section-accountId">{value.accountID}</div>
                <div className="gl-exists-details-section-account-name">
                  {
                      value.accountName.length < 25 ? value.accountName
                        : (`${value.accountName.substring(0, 25)} ...`)
                      }
                </div>
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
            <div className="gl-does-not-exist-section-second">BranchName</div>
          </div>
          <div className="main-gl-does-not-exist-section">
            {
                sortedList.map(element => (
                  <div key={element.branchID} className="gl-does-not-exist-section-outter">
                    <div className="gl-does-not-exist-section-first gl-does-not-exist-section-first-loop">
                      <div className="gl-does-not-exist-section-first-chechbox">
                        <input
                          type="checkbox"
                          name={element.branchID}
                          checked={element?.isChecked || false}
                          onChange={handleSort}
                        />
                      </div>
                      <div className="gl-does-not-exist-section-first-brID">
                        {element.branchID}
                      </div>
                    </div>
                    <div className="gl-does-not-exist-section-second">{element.branchName}</div>
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
