/* eslint-disable react/prop-types */

import React from 'react';

const TransactionDetails = ({ accountsArray }) => {
  console.log('transaction details');
  return (
    <div className="transaction-details-form-section-container">
      <div className="transaction-details-form-section-container-header">
        Transaction Details
      </div>
      <div className="transaction-details-form-section">
        <div className="serial-number-grid">SerialNo</div>
        <div className="serial-number-grid">ValueDate</div>
        <div className="serial-number-grid">BranchID</div>
        <div className="serial-number-grid">AcctID</div>
        <div className="serial-number-grid">AcctType</div>
        <div className="serial-number-grid">ProdtID</div>
        <div className="serial-number-grid">TrxType</div>
        <div className="serial-number-grid">ReceiptNo</div>
        <div className="serial-number-grid">TranAmount</div>
        <div className="serial-number-grid">TranCode</div>
        <div className="serial-number-grid">TranParticulars</div>
        <div className="serial-number-grid">TranRemarks</div>
        <div className="serial-number-grid">Edit</div>
      </div>
      <div className="controlled-hight-transaction-details-form-section-content">
        {
            accountsArray.map(account => (
              Object.keys(account).length > 0
                ? (
                  <div key={account.accountId} className="transaction-details-form-section-content">
                    <div className="serial-content-grid">
                      {account.columnID && account.columnID }
                    </div>
                    <div className="serial-content-grid">
                      {account.valueDate && account.valueDate }
                    </div>
                    <div className="serial-content-grid">
                      {account.branchID && account.branchID }
                    </div>
                    <div className="serial-content-grid">
                      {account.accountID && account.accountID }
                    </div>
                    <div className="serial-content-grid">
                      {account.accountType && account.accountType }
                    </div>
                    <div className="serial-content-grid">
                      {account.productID && account.productID }
                    </div>
                    <div className="serial-content-grid">
                      {account.partTranType && account.partTranType }
                    </div>
                    <div className="serial-content-grid">
                      {account.receiptNo && account.receiptNo }
                    </div>
                    <div className="serial-content-grid">
                      {account.tranAmount && account.tranAmount }
                    </div>
                    <div className="serial-content-grid">
                      {account.tranCode && account.tranCode }
                    </div>
                    <div className="serial-content-grid">
                      {account.tranParticulars && account.tranParticulars }
                    </div>
                    <div className="serial-content-grid">
                      {account.tranRemarks && account.tranRemarks }
                    </div>
                    <div className="serial-content-grid">...</div>
                  </div>
                ) : null
            ))
        }
      </div>
    </div>
  );
};

export default TransactionDetails;
