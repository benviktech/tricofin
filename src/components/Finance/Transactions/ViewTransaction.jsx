/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TransactionsSidebar } from '../../Sidebar/Sidebar';
import TransactionRequests from './TransactionRequests';

const initialState = {
  currentSetId: '',
  currentTranType: '',
  currentSubType: '',
};

const ViewTransactions = () => {
  const [transactionCategories, setTransactionCategories] = useState([]);
  const [transactionSubTypes, setTransactionSubTypes] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [detailedAccount, setDetailedAccount] = useState([]);
  const [values, setValues] = useState(initialState);
  const [currentTranObject, setCurrentTranObject] = useState({});

  const { modalBranchList } = TransactionRequests();
  const updateModalBranchList = [...modalBranchList, { id: 'OPN', name: 'Operational Branches' }];

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetTransactionCategories')
      .then(response => setTransactionCategories(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetTransactionSubTypes')
      .then(response => setTransactionSubTypes(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  useEffect(() => {
    if (values.currentTranType.length > 0
      && values.currentSubType.length > 0
      && values.currentSetId > 0) {
      axios.get(`https://tricofin.azurewebsites.net/api/Finance/GetDailyTransactionView/${values.currentSetId}/${values.currentTranType}/${values.currentSubType}/ILUMU`)
        .then(response => setDisplayList(response?.data))
        .catch(error => console.log(error?.message));
    }
  }, [values]);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    axios.get(`https://tricofin.azurewebsites.net/api/Finance/GetDailyTransaction/${detailedAccount}`)
      .then(response => setCurrentTranObject(response?.data))
      .catch(error => console.log(error?.message));
  }, [detailedAccount]);

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Cash Transactions</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <div className="back-button-section">
              <i
                className="fas fa-arrow-circle-left"
                style={{ fontSize: '20px', marginRight: '10px', cursor: 'pointer' }}
              />
            </div>
            <TransactionsSidebar />
          </div>
          <div className="submit-form-top-section">
            <div className="cash-transaction-top-section">
              <div className="login-branch">
                <div className="login-branch-label">Login Branch:</div>
                <select
                  name="currentSetId"
                  onChange={handleChange}
                  value={values.currentSetId}
                >
                  <option value="" disabled selected hidden>Select</option>
                  {
                      updateModalBranchList.map(branch => (
                        <option
                          key={branch.id}
                          value={branch.id}
                        >
                          {branch.name}
                        </option>
                      ))
                    }
                </select>
              </div>
              <div className="login-branch">
                <div className="login-branch-label">Tran Type:</div>
                <select
                  name="currentTranType"
                  onChange={handleChange}
                  value={values.currentTranType}
                >
                  <option value="" disabled selected hidden>Select</option>
                  {
                      transactionCategories.map(category => (
                        <option
                          key={category.catID}
                          value={category.catID}
                        >
                          {category.category}
                        </option>
                      ))
                    }
                </select>
              </div>
              <div className="login-branch">
                <div className="login-branch-label">Sub Type:</div>
                <select
                  name="currentSubType"
                  onChange={handleChange}
                  value={values.currentSubType}
                >
                  <option value="" disabled selected hidden>Select</option>
                  {
                      transactionSubTypes.map(type => (
                        <option
                          key={type.subTypeId}
                          value={type.subTypeId}
                        >
                          {type.subType}
                        </option>
                      ))
                    }
                </select>
              </div>
            </div>
            <div className="cash-transaction-bottom-section">
              <div className="cash-transaction-bottom-section-header">
                Transaction Summary
              </div>
              <div className="transaction-section-content">
                <div className="transaction-section-content-button">
                  <button type="button">Select All</button>
                  <button type="button">Deselect All</button>
                </div>
                <div className="transaction-section-content-input">
                  <div className="transaction-section-content-label">Posted By:</div>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="cash-transaction-list-lower-section">
              <div className="cash-transaction-list-lower-section-header">
                <div className="cash-transaction-list-lower-section-grid">TranID</div>
                <div className="cash-transaction-list-lower-section-grid">LoginBR</div>
                <div className="cash-transaction-list-lower-section-grid">PostedBy</div>
                <div className="cash-transaction-list-lower-section-grid">Total Debit</div>
                <div className="cash-transaction-list-lower-section-grid">Total Credit</div>
                <div className="cash-transaction-list-lower-section-grid">Flag</div>
                <div className="cash-transaction-list-lower-section-grid">TranType</div>
              </div>
              <div className="cash-transaction-list-lower-section-content-container">
                {
                  displayList.map(item => (
                    <div
                      onClick={() => setDetailedAccount(item.tranID)}
                      key={item.tranID}
                      className="cash-transaction-list-lower-section-header"
                    >
                      <div className="cash-transaction-list-lower-section-grid">
                        <input className="mr-2" type="checkbox" style={{ width: '15px', height: '15px' }} />
                        {item.tranID}
                      </div>
                      <div className="cash-transaction-list-lower-section-grid">{item.loginBranch}</div>
                      <div className="cash-transaction-list-lower-section-grid">{item.postedBy}</div>
                      <div className="cash-transaction-list-lower-section-grid">{item.totalDebit}</div>
                      <div className="cash-transaction-list-lower-section-grid">{item.totalCredit}</div>
                      <div className="cash-transaction-list-lower-section-grid">{item.flag}</div>
                      <div className="cash-transaction-list-lower-section-grid">{item.tranType}</div>
                    </div>
                  ))
                }
              </div>
            </div>
            {
              currentTranObject.length > 0 ? (
                <div className="bottom-transaction-details-table">
                  <div className="bottom-transaction-details-table-header">Transaction Details</div>
                  <div className="credit-or-debit-header-section">DEBIT(S)</div>
                  <div className="bottom-transaction-details-table-header-grid">
                    <div className="bottom-transaction-details-table-header-grid-content">TranType</div>
                    <div className="bottom-transaction-details-table-header-grid-content">BranchID</div>
                    <div className="bottom-transaction-details-table-header-grid-content">AccountID</div>
                    <div className="bottom-transaction-details-table-header-grid-content">AccountType</div>
                    <div className="bottom-transaction-details-table-header-grid-content">AccountName</div>
                    <div className="bottom-transaction-details-table-header-grid-content">ProdID</div>
                    <div className="bottom-transaction-details-table-header-grid-content">Amount</div>
                    <div className="bottom-transaction-details-table-header-grid-content">SerialNo</div>
                    <div className="bottom-transaction-details-table-header-grid-content">Particulars</div>
                    <div className="bottom-transaction-details-table-header-grid-content">TranRemarks</div>
                  </div>
                  <div className="bottom-transaction-details-table-header-grid">
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[0].tranType}
                    </div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[0].branchID}
                    </div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[0].accountID}
                    </div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[0].accountType}
                    </div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">AccountName</div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[0].productID}
                    </div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[0].tranAmount}
                    </div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[0].tranSerialNo}
                    </div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[0].tranParticulars}
                    </div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[0].tranRemarks}
                    </div>
                  </div>
                  <div className="credit-or-debit-header-section">CREDIT(S)</div>
                  <div className="bottom-transaction-details-table-header-grid">
                    <div className="bottom-transaction-details-table-header-grid-content">TranType</div>
                    <div className="bottom-transaction-details-table-header-grid-content">BranchID</div>
                    <div className="bottom-transaction-details-table-header-grid-content">AccountID</div>
                    <div className="bottom-transaction-details-table-header-grid-content">AccountType</div>
                    <div className="bottom-transaction-details-table-header-grid-content">AccountName</div>
                    <div className="bottom-transaction-details-table-header-grid-content">ProdID</div>
                    <div className="bottom-transaction-details-table-header-grid-content">Amount</div>
                    <div className="bottom-transaction-details-table-header-grid-content">SerialNo</div>
                    <div className="bottom-transaction-details-table-header-grid-content">Particulars</div>
                    <div className="bottom-transaction-details-table-header-grid-content">TranRemarks</div>
                  </div>
                  <div className="bottom-transaction-details-table-header-grid">
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[1].tranType}
                    </div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[1].branchID}
                    </div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[1].accountID}
                    </div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[1].accountType}
                    </div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">AccountName</div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[1].productID}
                    </div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[1].tranAmount}
                    </div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[1].tranSerialNo}
                    </div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[1].tranParticulars}
                    </div>
                    <div className="bottom-transaction-details-table-header-grid-content debit-credit-inner">
                      {currentTranObject[1].tranRemarks}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bottom-transaction-details-table">
                  <div className="bottom-transaction-details-table-header">Transaction Details</div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTransactions;
