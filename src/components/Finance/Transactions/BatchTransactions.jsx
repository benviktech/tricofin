/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Papa from 'papaparse';
import { saveBatchTransactions } from '../../../actions/generalLedger';

const BatchTransactions = () => {
  const [csvFile, setCsvFile] = useState([]);
  const [viewState, setViewState] = useState(false);
  const [addState, setAddState] = useState(false);
  const [submitArray, setSubmitArray] = useState([]);
  const listsOfContent = [{ id: 1 }, { id: 2 }];
  const dispatch = useDispatch();

  const handleFileUpload = files => {
    if (files) {
      Papa.parse(files[0], {
        header: true, complete(results) { setCsvFile(results.data); },
      });
    }
  };

  const submitData = () => {
    if (submitArray.length > 0) { dispatch(saveBatchTransactions(submitArray)); }
  };

  useEffect(() => {
    if (csvFile.length > 0) {
      const newcsvFile = csvFile.map(item => ({ ...item, amount: parseInt(item.amount, 10) }));
      setSubmitArray(newcsvFile);
    }
  }, [csvFile]);

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info-lg">
          <span>Transaction Code Maintenance</span>
        </div>
        <div className="transaction-codes-main-section transaction-codes-main-section-bulk-transaction">
          <div className="transaction-codes-main-section-top batch-transaction-top">
            <div className="transaction-codes-main-section-left">
              <div className="transaction-codes-main-section-top-label">Serial#:</div>
              <input type="text" />
              <div className="transaction-codes-main-section-div-section slit-character-outter">
                <div className="slit-character">Upload Files</div>
                <input
                  onChange={e => { handleFileUpload(e.target.files); }}
                  accept=".csv,.xlsx,.xls"
                  type="file"
                  id="csvFile"
                />
              </div>
            </div>
          </div>
          <div className="transaction-codes-main-section-middle">
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">PartTranType:</div>
              <select>
                <option value="VAAL">VAL</option>
                <option value="VAAL">VAL</option>
                <option value="VAAL">VAL</option>
                <option value="VAAL">VAL</option>
              </select>
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Acct Type:</div>
              <select>
                <option value="VAAL">VAL</option>
                <option value="VAAL">VAL</option>
                <option value="VAAL">VAL</option>
                <option value="VAAL">VAL</option>
              </select>
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Account ID:</div>
              <div className="input-acct-name">
                <input type="text" />
                <div className="bulk-acct-name">BAGENDA REUBEN</div>
              </div>
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Product:</div>
              <div className="input-acct-name">
                <input type="text" />
                <div className="bulk-acct-name">BAGENDA REUBEN</div>
              </div>
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">TranCode:</div>
              <div className="input-acct-name">
                <input type="text" />
                <div className="bulk-acct-name">BAGENDA REUBEN</div>
              </div>
            </div>
          </div>
          <div className="transaction-codes-main-section-bottom-behind-scenes">
            Product Tran Details
          </div>
          <div className="part-tran-details-content part-tran-details-content-bulk">
            <div className="total-DR-section">
              <label>
                Total Debit
                {' '}
                {' '}
                :
                {' '}
                {' '}
                <div className="total-DR-section-inner border ml-2 py-1">0.00</div>
              </label>
            </div>
            <div className="total-DR-section">
              <label>
                Total Credit
                {' '}
                {' '}
                :
                {' '}
                {' '}
                <div className="total-DR-section-inner border ml-2 py-1">0.00</div>
              </label>
            </div>
            {' '}
            <div className="total-DR-section">
              <label>
                Unposted Amt
                {' '}
                {' '}
                :
                {' '}
                {' '}
                <div className="total-DR-section-inner border ml-2 py-1">0</div>
              </label>
            </div>
            <div className="total-button-section">
              <button
                onClick={() => setAddState(true)}
                type="button"
              >
                Add
              </button>
              <button
                disabled={!addState}
                onClick={() => submitData()}
                type="button"
                className={!addState ? 'ml-2 btn btn-info' : 'ml-2'}
              >
                Save
              </button>
              <button
                onClick={() => setViewState(true)}
                type="button"
                className="ml-2"
              >
                View
              </button>
            </div>
          </div>
          {
            viewState ? (
              <div className="part-tran-details-content-bulk-transaction-bottom">
                <div className="part-tran-details-content-bulk-transaction-bottom-header">
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">SerialNo</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">ValueDate</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">AcctID</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">AcType</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">ProdID</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">Trx Type</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">ReceiptNo</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">TranAmount</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">TranCode</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">TranParticulars</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">TranRemarks</div>
                </div>
                <div className="transaction-bottom-header-outer">
                  {
                  listsOfContent.map(content => (
                    <div key={content.id} className="part-tran-details-content-bulk-transaction-bottom-header">
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">SerialNo</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">ValueDate</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">AcctID</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">AcType</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">ProdID</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">Trx Type</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">ReceiptNo</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">TranAmount</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">TranCode</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">TranParticulars</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">TranRemarks</div>
                    </div>
                  ))
              }
                </div>
              </div>
            )
              : csvFile.length > 0 ? (
                <div className="part-tran-details-content-bulk-transaction-bottom">
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-two">
                    <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">AccountID</div>
                    <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">DebitOrCredit</div>
                    <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">Amount</div>
                    <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">Remarks</div>
                    <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">Account Type</div>
                  </div>
                  <div className="transaction-bottom-header-outer">
                    {
                  csvFile.map(content => (
                    <div key={content.accountID} className="part-tran-details-content-bulk-transaction-bottom-header-two">
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">{content.accountID}</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">{content.debitOrCredit}</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">{content.amount}</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">{content.remarks}</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">{content.accountType}</div>
                    </div>
                  ))
              }
                  </div>
                </div>
              ) : null
          }
        </div>
      </div>
    </div>
  );
};

export default BatchTransactions;
