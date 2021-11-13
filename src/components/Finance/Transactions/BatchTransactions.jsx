/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';
import { saveBatchTransactions, transferTransaction } from '../../../actions/generalLedger';

const initialState = {
  accountID: '',
  accountType: '',
  partTranType: '',
  productID: 'SV101',
  tranCode: '003',
};

const BatchTransactions = () => {
  const [values, setValues] = useState(initialState);
  const [csvFile, setCsvFile] = useState([]);
  const [viewState, setViewState] = useState(false);
  const [errors, setErrors] = useState(false);
  const [submitArray, setSubmitArray] = useState([]);
  const [debitTot, setDebitTot] = useState(0);
  const [creditTot, setCreditTot] = useState(0);
  const [trxTypes, setTrxTypes] = useState([]);
  const [accTypes, setAccTypes] = useState([]);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetTransactionTypes')
      .then(response => setTrxTypes(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetAccountTypes')
      .then(response => setAccTypes(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  const dispatch = useDispatch();
  const batchTransactionsList = useSelector(
    state => state.generalLedgerReducer.batchTransactionsList,
  );

  const handleFileUpload = files => {
    if (files) {
      Papa.parse(files[0], {
        header: true, complete(results) { setCsvFile(results.data); },
      });
    }
  };

  useEffect(() => {
    if (batchTransactionsList.length > 0) { setViewState(true); }
  }, [batchTransactionsList]);

  const submitData = () => {
    if (submitArray.length > 0) {
      dispatch(saveBatchTransactions(submitArray)); setCsvFile([]);
    } else { setErrors(true); }
  };

  useEffect(() => {
    if (csvFile.length > 0) {
      const newcsvFile = csvFile.map(item => ({ ...item, amount: parseInt(item.amount, 10) }));
      setSubmitArray(newcsvFile);
    }
  }, [csvFile]);

  useEffect(() => {
    if (submitArray.length > 0) {
      const totalCredit = submitArray.filter(item => item.debitOrCredit === 'C')
        .reduce((sum, val) => sum + val.amount, 0);

      const totalDebit = submitArray.filter(item => item.debitOrCredit === 'D')
        .reduce((sum, val) => sum + val.amount, 0);
      setCreditTot(totalCredit);
      setDebitTot(totalDebit);
    }
  }, [submitArray]);

  const createBatchTransaction = async () => {
    await dispatch(transferTransaction(batchTransactionsList));
    setViewState(false); setCsvFile([]);
  };

  const displayCurrent = account => {
    setValues(account);
    console.log(account, 'account');
  };
  console.log(trxTypes, 'trxTypes', accTypes, 'accTypes');

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info-lg">
          <span>Batch Transactions</span>
        </div>
        <div className="transaction-codes-main-section transaction-codes-main-section-bulk-transaction">
          { errors ? (
            <div className="transaction-codes-main-section-bulk-transaction-error-section shadow">
              Please upload File
              <i onClick={() => setErrors(false)} className="far fa-times-circle ml-2" />
            </div>
          ) : null}
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
              <select
                name="tranTypeID"
                value={values.partTranType}
                disabled="true"
              >
                <option value="" disabled selected hidden>Select</option>
                {
                    trxTypes.map(tranType => (
                      <option
                        key={tranType.tranType}
                        value={tranType.tranType}
                      >
                        {tranType.transactionType}
                      </option>
                    ))
                  }
              </select>
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Acct Type:</div>
              <select
                name="accTypeID"
                value={values.accountType}
                disabled="true"
              >
                <option value="" disabled selected hidden>Select</option>
                {
                    accTypes.filter(element => element.accountTypeID !== 'L').map(accType => (
                      <option
                        key={accType.accountTypeID}
                        value={accType.accountTypeID}
                      >
                        {accType.accountType}
                      </option>
                    ))
                  }
              </select>
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Account ID:</div>
              <div className="input-acct-name">
                <input disabled="true" value={values.accountID ? values.accountID : ''} type="text" />
                <div className="bulk-acct-name" />
              </div>
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Product:</div>
              <div className="input-acct-name">
                <input disabled="true" value={values.productID ? values.productID : ''} type="text" />
                <div className="bulk-acct-name" />
              </div>
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">TranCode:</div>
              <div className="input-acct-name">
                <input disabled="true" value={values.tranCode ? values.tranCode : ''} type="text" />
                <div className="bulk-acct-name" />
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
                <div className="total-DR-section-inner border ml-2 py-1">{debitTot}</div>
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
                <div className="total-DR-section-inner border ml-2 py-1">{creditTot}</div>
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
                onClick={() => submitData()}
                type="button"
                className="btn btn-secondary"
              >
                Add
                <i className="far fa-arrow-alt-circle-down ml-2" />
              </button>
            </div>
          </div>
          {
            viewState ? (
              <div className="part-tran-details-content-bulk-transaction-bottom">
                <div className="part-tran-details-content-bulk-transaction-bottom-header">
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">ValueDate</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">AcctID</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">AcType</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">ProdID</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">TrxType</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">ReceiptNo</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">TranAmount</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">TranCode</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">TranParticulars</div>
                  <div className="part-tran-details-content-bulk-transaction-bottom-header-grid">TranRemarks</div>
                </div>
                <div className="transaction-bottom-header-outer">
                  {
                  batchTransactionsList.map(content => (
                    <div onClick={() => displayCurrent(content)} key={content.columnID} className="part-tran-details-content-bulk-transaction-bottom-header">
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">
                        {new Date(content.valueDate).toUTCString().split(' ').slice(0, 4)
                          .join(' ')}
                      </div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">{content.accountID}</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">{content.accountType}</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">{content.productID}</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">{content.partTranType}</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">{content.receiptNo}</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">{content.tranAmount}</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">{content.tranCode}</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">{content.tranParticulars}</div>
                      <div className="part-tran-details-content-bulk-transaction-bottom-header-grid content-section">{content.tranRemarks}</div>
                    </div>
                  ))
                }
                </div>
                <div className="transaction-bottom-header-outer-buttons">
                  <button onClick={createBatchTransaction} type="button">Save</button>
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
