import React from 'react';
import './index.css';

const GeneralLedgerPayments = () => {
  const description = [
    { id: 1, description: 'Cash at Hand' },
    { id: 2, description: 'Cash at Bank' },
    { id: 3, description: 'InterBranch Account' },
    { id: 4, description: 'Profit/Loss Reserve Account' },
  ];
  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info-lg">
          <span>Main General Ledger Parameters</span>
        </div>
        <div className="lower-downer-section-gen-led">
          <div className="first-ledger-parameters text-white">SerialID</div>
          <div className="second-ledger-parameters text-white">Description</div>
          <div className="third-ledger-parameters text-white">GL Account ID</div>
          <div className="forth-ledger-parameters text-white">GL Account Name</div>
        </div>
        {
          description.map(element => (
            <div key={element.id} className="lower-downer-section-gen-led lower-downer-section-gen-led-lower">
              <div className="first-ledger-parameters">{ element.id }</div>
              <div className="second-ledger-parameters">Description</div>
              <div className="third-ledger-parameters">GL Account ID</div>
              <div className="forth-ledger-parameters">GL Account Name</div>
            </div>
          ))
        }
        <div className="gl-parameters-submission-form">
          <div className="mb-2 gl-parameters-submission-form-header">GL Parameters Details</div>
          <div className="gl-parameter-details-bottom">
            <div className="inter-branch-left">GL Parameter :</div>
            <div className="inter-branch-right">3 - InterBranch Account :</div>
          </div>
          <div className="gl-parameter-details-bottom">
            <div className="inter-branch-left">GL AccountID :</div>
            <input type="text" />
            <div className="first-empty-parameter">1</div>
            <div className="second-empty-parameter">2</div>
          </div>
        </div>
        <div className="gl-parameters-button-section">
          <button type="button">Edit</button>
          <button type="button">Save</button>
          <button type="button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default GeneralLedgerPayments;
