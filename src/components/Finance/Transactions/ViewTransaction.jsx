import React from 'react';
import { TransactionsSidebar } from '../../Sidebar/Sidebar';

const ViewTransactions = () => {
  console.log('view transactions');
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
            <p>Cash Transactions</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ViewTransactions;
