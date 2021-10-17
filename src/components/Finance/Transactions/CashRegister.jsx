import React from 'react';
import { TransactionsSidebar } from '../../Sidebar/Sidebar';

const CashRegister = () => {
  console.log('Cash Register');
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
                <input type="date" name="startDate" />
              </div>
              <div className="from-date-section-two">
                <div>To Date:</div>
                {' '}
                <input type="date" name="endDate" />
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
                  <select>
                    <option value="val">VAL</option>
                    <option value="val">VAL</option>
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
                Cash Register Details Operator: rbagenda For Period: 09/Mar/2021 to 09/Mar/2021
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
                <div className="view-print-export-section-tran-inner-content">
                  <div className="view-print-export-section-tran-inner-content-grid">TranDate</div>
                  <div className="view-print-export-section-tran-inner-content-grid">Tran/SrNo</div>
                  <div className="view-print-export-section-tran-inner-content-grid">ProductID</div>
                  <div className="view-print-export-section-tran-inner-content-grid">BranchID</div>
                  <div className="view-print-export-section-tran-inner-content-grid">AcctID</div>
                  <div className="view-print-export-section-tran-inner-content-grid">AcctName</div>
                  <div className="view-print-export-section-tran-inner-content-grid">Amount</div>
                  <div className="view-print-export-section-tran-inner-content-grid">Trx</div>
                  <div className="view-print-export-section-tran-inner-content-grid">OperatorID</div>
                  <div className="view-print-export-section-tran-inner-content-grid">SupervisorID</div>
                  <div className="view-print-export-section-tran-inner-content-grid">CashierGL</div>
                  <div className="view-print-export-section-tran-inner-content-grid">Narration</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashRegister;
