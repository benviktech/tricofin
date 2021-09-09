import React from 'react';
import './index.css';

const GeneralLedgerPayments = () => {
  console.log('generaledgerpayments');
  const description = [
    { id: 1, description: 'Cash at Hand' },
    { id: 2, description: 'Cash at Bank' },
    { id: 1, description: 'InterBranch Account' },
    { id: 1, description: 'Profit/Loss Reserve Account' },
  ];
  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info-lg">
          <span>Main General Ledger Parameters</span>
        </div>
        <div className="lower-downer-section-gen-led">
          <div className="first-ledger-parameters">SerialID</div>
          <div className="second-ledger-parameters">Description</div>
          <div className="third-ledger-parameters">GL Account ID</div>
          <div className="forth-ledger-parameters">GL Account Name</div>
        </div>
        {
          description.map(element => (
            <div key={element.id} className="lower-downer-section-gen-led">
              <div className="first-ledger-parameters">{ element.id }</div>
              <div className="second-ledger-parameters">Description</div>
              <div className="third-ledger-parameters">GL Account ID</div>
              <div className="forth-ledger-parameters">GL Account Name</div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default GeneralLedgerPayments;
