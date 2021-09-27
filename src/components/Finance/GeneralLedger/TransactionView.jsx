/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { GeneralLedgerSidebar } from '../../Sidebar/Sidebar';

const initialState = {
  startDate: '',
  endDate: '',
};

const TransactionView = () => {
  const [values, setValues] = useState(initialState);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const data = [{ id: 1, name: 'First Element' },
    { id: 1, name: 'First Element' },
    { id: 1, name: 'First Element' },
    { id: 1, name: 'First Element' },
    { id: 1, name: 'First Element' },
    { id: 1, name: 'First Element' },
    { id: 1, name: 'First Element' },
    { id: 1, name: 'First Element' }];

  const accounId = '0011000010002';
  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span> Account Transaction View</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <GeneralLedgerSidebar />
          </div>
          <div className="submit-form-top-section">
            <div className="top-bulk-selection-section">
              <div className="from-date-section">
                From:
                {' '}
                <input type="date" name="startDate" onChange={handleChange} />
              </div>
              <div className="to-date-section">
                To:
                {' '}
                <input type="date" name="endDate" onChange={handleChange} />
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
            <div className="account-state-table-header">
              <span className="mr-3">Account Statement For:</span>
              {' '}
              <span className="mr-3">{accounId}</span>
              {' '}
              <span className="mr-3">For Period:</span>
              <span className="mr-3">{values.startDate}</span>
              {' '}
              <span className="mr-3">To</span>
              <span className="mr-3">{values.endDate}</span>
            </div>
            <div className="main-account-state-table">
              <div className="account-state-table">
                <div className="tran-date-section">TranDate</div>
                <div className="value-date-section">ValueDate</div>
                <div className="tran-id-section">TranID</div>
                <div className="serial-number-section">SerialNo</div>
                <div className="tan-type-section">TranType</div>
                <div className="particulars">Particulars</div>
                <div className="debit-section">Debit</div>
                <div className="credit-section">Credit</div>
                <div className="closing-section">Closing</div>
                <div className="operator-id-section">OperatorID</div>
                <div className="supervisor-id-section">SupervisorID</div>
              </div>
              <div className="outer-account-state-table-entry">
                {
                  data.map((res, index) => (
                    <div key={index} className="account-state-table-entry">
                      <div className="tran-date-section">ONE</div>
                      <div className="tran-date-section">TWO</div>
                      <div className="tran-date-section">THREE</div>
                      <div className="tran-date-section">FOUR</div>
                      <div className="tran-date-section">FIVE</div>
                      <div className="tran-date-section-large">SIX NUMBER</div>
                      <div className="tran-date-section">SEVEN</div>
                      <div className="tran-date-section">EIGHT</div>
                      <div className="tran-date-section">NINE</div>
                      <div className="tran-date-section">TEN</div>
                      <div className="tran-date-section">ELEVEN</div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionView;
