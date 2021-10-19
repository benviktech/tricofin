/* eslint-disable react/no-array-index-key */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TransactionsSidebar } from '../../Sidebar/Sidebar';

const initialState = {
  startDate: '',
  endDate: '',
  idType: '',
};

const CashRegister = () => {
  const [values, setValues] = useState(initialState);
  const [transactions, setTransactions] = useState([]);
  const [updatedTransactions, setUpdatedTransactions] = useState([]);
  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/Finance/GetDailyTransactions')
      .then(response => setTransactions(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  const tranTypes = [{ id: 1, type: 'C', name: 'CREDIT' },
    { id: 2, type: 'D', name: 'DEBIT' },
    { id: 3, type: 'B', name: 'BOTH' }];

  const handleChange = e => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (transactions.length > 0) {
      setUpdatedTransactions(transactions);
    }
  }, [transactions]);

  const filterFunction = () => {
    const result = [];
    transactions.forEach(transaction => {
      if (transaction.valueDate >= values.startDate
        && transaction.valueDate <= values.endDate) {
        result.push(transaction);
      }
    });
    return result;
  };

  useEffect(() => {
    if ((values.startDate && values.endDate)
    && values.endDate > values.startDate) {
      setUpdatedTransactions(filterFunction());
    }
  }, [values]);

  useEffect(() => {
    if (values.idType === 'D' || values.idType === 'C') {
      const result = transactions.filter(
        transaction => transaction.partTranType === values.idType,
      );
      setUpdatedTransactions(result);
    } else {
      setUpdatedTransactions(transactions);
    }
  }, [values.idType]);

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Cash Register</span>
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
            <div className="top-bulk-selection-section-two">
              <div className="from-date-section-two">
                <div>From Date:</div>
                {' '}
                <input
                  onChange={handleChange}
                  type="date"
                  name="startDate"
                  value={values.startDate}
                />
              </div>
              <div className="from-date-section-two">
                <div>To Date:</div>
                {' '}
                <input
                  onChange={handleChange}
                  type="date"
                  name="endDate"
                  value={values.endDate}
                />
              </div>
              <div className="view-print-export-section ">
                <button className="btn btn-secondary" type="button">
                  <i className="fas fa-binoculars mr-1" />
                  {' '}
                  View
                </button>
                <button className="btn btn-secondary" type="button">
                  <i className="fas fa-print mr-1" />
                  {' '}
                  Print
                </button>
                <button className="btn btn-secondary" type="button">
                  <i className="fas fa-file-export mr-1" />
                  {' '}
                  Export
                </button>
              </div>
            </div>
            <div className="top-bulk-selection-section-two">
              <div className="from-date-section-two">
                <div>Operator ID:</div>
                {' '}
                <input type="text" name="startDate" />
              </div>
              <div className="from-date-section-two">
                <div>Cashier GL:</div>
                {' '}
                <input type="text" name="endDate" />
              </div>
              <div className="view-print-export-section-two ">
                <div className="view-print-export-section-tran-type">
                  <div>Tran Type:</div>
                  <select
                    onChange={handleChange}
                    name="idType"
                    value={values.idType}
                  >
                    <option value="" disabled selected hidden>Select</option>
                    {
                      tranTypes.map(type => (
                        <option key={type.id} value={type.type}>
                          {type.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div className="view-print-export-section-tran-select">
                  <div>Summary:</div>
                  <input style={{ width: '20px', marginLeft: '20px' }} type="checkbox" />
                </div>
              </div>
            </div>
            <div className="view-print-export-section-tran-select-table">
              <div className="view-print-export-section-tran-select-top">
                Cash Register Details Operator: rbagenda For Period:
                {' '}
                {values.startDate}
                {' '}
                {' '}
                {values.startDate && values.endDate ? 'to' : ''}
                {' '}
                {' '}
                {values.endDate}
              </div>
              <div className="view-print-export-section-tran-select-header">
                <div className="view-print-export-section-tran-select-header-grid">TranDate</div>
                <div className="view-print-export-section-tran-select-header-grid">Tran/SrNo</div>
                <div className="view-print-export-section-tran-select-header-grid">ProductID</div>
                <div className="view-print-export-section-tran-select-header-grid">BranchID</div>
                <div className="view-print-export-section-tran-select-header-grid">AcctID</div>
                <div className="view-print-export-section-tran-select-header-grid">AcctName</div>
                <div className="view-print-export-section-tran-select-header-grid">Amount</div>
                <div className="view-print-export-section-tran-select-header-grid">Trx</div>
                <div className="view-print-export-section-tran-select-header-grid">OperatorID</div>
                <div className="view-print-export-section-tran-select-header-grid">SupervisorID</div>
                <div className="view-print-export-section-tran-select-header-grid">CashierGL</div>
                <div className="view-print-export-section-tran-select-header-grid">Narration</div>
              </div>
              <div className="view-print-export-section-tran-content">
                {
                  updatedTransactions.map(
                    (transaction, index) => (transaction.tranSerialNo === 1 ? (
                      <div key={index} className="view-print-export-section-tran-inner-content">
                        <div className="view-print-export-section-tran-inner-content-grid">
                          {new Date(transaction.valueDate)
                            .toUTCString().split(' ').slice(1, 4)
                            .join(' ')}
                        </div>
                        <div className="view-print-export-section-tran-inner-content-grid">
                          {transaction.tranID}
                          /
                          {transaction.tranSerialNo}
                        </div>
                        <div className="view-print-export-section-tran-inner-content-grid">
                          {transaction.productID}
                        </div>
                        <div className="view-print-export-section-tran-inner-content-grid">
                          {transaction.loginBranch}
                        </div>
                        <div className="view-print-export-section-tran-inner-content-grid">
                          {transaction.accountID}
                        </div>
                        <div className="view-print-export-section-tran-inner-content-grid">AcctName</div>
                        <div className="view-print-export-section-tran-inner-content-grid">
                          {transaction.tranAmount}
                        </div>
                        <div className="view-print-export-section-tran-inner-content-grid">
                          {transaction.partTranType}
                        </div>
                        <div className="view-print-export-section-tran-inner-content-grid">
                          {transaction.createdBy}
                        </div>
                        <div className="view-print-export-section-tran-inner-content-grid">
                          {transaction.createdBy}
                        </div>
                        <div className="view-print-export-section-tran-inner-content-grid">
                          {transaction.glSubHead}
                        </div>
                        <div className="view-print-export-section-tran-inner-content-grid">
                          {transaction.tranRemarks}
                        </div>
                      </div>
                    ) : null),
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashRegister;
