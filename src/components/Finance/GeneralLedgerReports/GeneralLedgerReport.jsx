import React from 'react';

const GeneralLedgerReport = () => {
  console.log('general ledger report');
  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info-lg">
          <span>General Ledger Reports</span>
        </div>
        <div className="main-general-ledger-reports mt-2">
          <div className="main-general-ledger-reports-left border">
            <div className="main-general-ledger-reports-header">Report Listings</div>
            <div className="main-general-ledger-reports-left-content">
              <div className="main-general-ledger-reports-left-content-header">
                GL Reports
              </div>
              <div className="main-general-ledger-reports-left-content-details">
                Chart of Accounts
              </div>
              <div className="main-general-ledger-reports-left-content-details">
                Profit and Loss
              </div>
              <div className="main-general-ledger-reports-left-content-details">
                Balance Sheet
              </div>
              <div className="main-general-ledger-reports-left-content-details">
                Trial Balance
              </div>
            </div>
          </div>
          <div className="main-general-ledger-reports-right border">
            <div className="main-general-ledger-reports-header">Report Parameters</div>
            <div className="main-general-ledger-reports-right-content">
              <div className="main-general-ledger-reports-right-content-text">Report Date :</div>
              <div className="main-general-ledger-reports-right-content-input">
                <input className="w-100" type="date" />
              </div>
            </div>
            <div className="main-general-ledger-reports-right-content">
              <div className="main-general-ledger-reports-right-content-text">Report Date :</div>
              <div className="main-general-ledger-reports-right-content-input">
                <div className="w-100 main-general-ledger-reports-right-content-input-inner">
                  <input type="checkbox" />
                  <div className="second-main-general-ledger-reports-check">
                    <div>Summary :</div>
                    <input type="checkbox" />
                  </div>
                </div>
              </div>
            </div>
            <div className="main-general-ledger-reports-right-content-input-button">
              <button type="button">Ok</button>
              <button type="button">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralLedgerReport;
