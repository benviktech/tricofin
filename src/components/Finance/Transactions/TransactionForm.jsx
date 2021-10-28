/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */

import React from 'react';

const TransactionForm = ({
  values, handleChange, currentAccount,
  editState, currentTranObject, setErrors,
  submitCashTransaction, compName,
}) => (
  <div className="cash-transaction-middle-section">
    <div className="left-cash-transaction-middle-section">
      <div className="left-cash-transaction-middle-section-inner">
        <div className="left-cash-transaction-middle-section-title">Account Id:</div>
        <input
          autoComplete="off"
          name="accountId"
          value={values.accountId}
          type="text"
          onChange={handleChange}
        />
        <div className="left-cash-transaction-middle-section-text">
          {currentAccount.accountName && currentAccount.accountName}
        </div>
      </div>
      <div className="left-cash-transaction-middle-section-inner">
        <div className="left-cash-transaction-middle-section-title">Branch:</div>
        <div className="left-cash-transaction-middle-section-id-name">
          {currentAccount.branchID && currentAccount.branchID}
        </div>
        <div className="left-cash-transaction-middle-section-text">
          {
                currentAccount.branchID === '000' ? 'Head Office'
                  : currentAccount.branchID === '001' ? 'Nansana'
                    : currentAccount.branchID === '002' ? 'Rugika'
                      : null
              }
        </div>
      </div>
      <div className="left-cash-transaction-middle-section-inner">
        <div className="left-cash-transaction-middle-section-title">Product:</div>
        <div className="left-cash-transaction-middle-section-id-name">{values.productID}</div>
        <div className="left-cash-transaction-middle-section-text">{values.productName}</div>
      </div>
      <div className="left-cash-transaction-middle-receipt-date">
        <div className="left-cash-transaction-middle-reciept-title">Receipt#.</div>
        <input name="receiptNo" onChange={handleChange} value={values.receiptNo} type="text" />
        <div className="left-cash-transaction-middle-value-date">
          <div className="inner-value-date">Value Date:</div>
          <input
            onChange={handleChange}
            value={editState && currentTranObject.length > 1
              ? new Date(currentTranObject[0].valueDate)
                .toISOString()
                .substring(0, 10) : values.valueDate}
            name="valueDate"
            type="date"
          />
        </div>
      </div>
    </div>
    <div className="right-cash-transaction-middle-section">
      <div className="right-cash-transaction-middle-section-inner">
        <div className="right-cash-transaction-middle-section-title">TranCode:</div>
        <input
          type="text"
          value={editState && currentTranObject.length > 1
            ? currentTranObject[0].tranCode : values.tranTypeID}
        />
        <div className="right-cash-transaction-middle-section-text">
          {
                editState && currentTranObject.length > 1
                  ? (currentTranObject[0].tranCode === '001' ? 'CASH CREDIT'
                    : currentTranObject[0].tranCode === '002' ? 'CASH DEBIT' : null)
                  : (values.tranTypeID === '001' ? 'CASH CREDIT'
                    : values.tranTypeID === '002' ? 'CASH DEBIT'
                      : null)
              }
        </div>
      </div>
      <div className="right-cash-transaction-middle-section-inner-remarks">
        <div className="right-cash-transaction-middle-section-title-remarks">Tran Remarks:</div>
        <input name="tranRemarks" onChange={handleChange} value={values.tranRemarks} type="text" />
      </div>
      <div className="right-cash-transaction-middle-section-inner-remarks">
        <div className="right-cash-transaction-middle-section-title-remarks">Amount:</div>
        <input name="tranAmount" onChange={handleChange} value={values.tranAmount} type="text" />
      </div>
      {
        compName === 'Transaction' ? (
          <div className="cash-transaction-buttons-section">
            <button onClick={submitCashTransaction} type="button">
              { editState ? 'Edit' : 'Add'}
            </button>
            <button onClick={() => setErrors({})} type="button">Cancel</button>
            <button type="button">Delete</button>
          </div>
        ) : null
      }
    </div>
  </div>
);

export default TransactionForm;
