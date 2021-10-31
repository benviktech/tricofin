import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TransactionsSidebar } from '../../Sidebar/Sidebar';
import TransactionRequests from './TransactionRequests';

const ViewTransactions = () => {
  const [transactionCategories, setTransactionCategories] = useState([]);
  const [transactionSubTypes, setTransactionSubTypes] = useState([]);
  const { modalBranchList } = TransactionRequests();
  const updateModalBranchList = [...modalBranchList, { id: '005', name: 'Operational Branches' }];
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

  console.log(transactionCategories, 'transactionCategories');
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
                  name="post"
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
                  name="post"
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
                  name="post"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTransactions;
