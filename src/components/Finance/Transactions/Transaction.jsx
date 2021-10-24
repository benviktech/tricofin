/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './index.css';
import axios from 'axios';
import { TransactionsSidebar } from '../../Sidebar/Sidebar';
import { saveTransactions } from '../../../actions/generalLedger';

const initialState = {
  tranTypeID: '',
  accTypeID: '',
  accountId: '',
  valueDate: '',
  receiptNo: '',
  tranAmount: '',
  tranRemarks: '',
  productName: '',
  productID: '',
};

const Transaction = () => {
  const [values, setValues] = useState(initialState);
  const [currentAccount, setCurrentAccount] = useState({});
  const [diplayModalState, setDiplayModalState] = useState(false);
  const [glList, setGlList] = useState([]);
  const [savingsList, setSavingsList] = useState([]);
  const [sharesList, setSharesList] = useState([]);
  const [modalBranch, setModalBranch] = useState('');
  const [savingsAcType, setSavingsAcType] = useState(false);
  const [innerModalList, setInnerModalList] = useState([]);
  const [gLAcType, setGLAcType] = useState(false);
  const [sharesAcType, setSharesAcType] = useState(false);
  const [modalList, setModalList] = useState([]);
  const [modal, setModal] = useState(false);
  const [tranTypes, setTranTypes] = useState([]);
  const [accTypes, setAccTypes] = useState([]);
  const dispatch = useDispatch();
  const [currentTranId, setCurrentTranId] = useState('');
  const [currentTranObject, setCurrentTranObject] = useState({});
  const [editState, setEditState] = useState(false);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetTransactionTypes')
      .then(response => setTranTypes(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetAccountTypes')
      .then(response => setAccTypes(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  const modalBranchList = [{ id: '000', name: 'Head Office' }, { id: '001', name: 'Nansana' },
    { id: '002', name: 'Rugika' }, { id: '004', name: 'All Branches' }];
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    if (currentTranId.length > 0) {
      axios.get(`https://tricofin.azurewebsites.net/api/Finance/GetDailyTransaction/2021-05-07T00%3A00%3A00/${currentTranId}`)
        .then(response => {
          setCurrentTranObject(response?.data);
        })
        .catch(error => console.log(error?.message));
      setEditState(true);
    } else {
      setCurrentTranObject({});
      setValues(initialState);
      setEditState(false);
      setCurrentAccount({});
    }
  }, [currentTranId]);

  useEffect(() => {
    if (currentTranObject.length > 0) {
      console.log(currentTranObject, 'currentTranObject');
      console.log(currentAccount, 'currentAccount');
      setCurrentAccount({
        ...currentAccount,
        accountID: currentTranObject[0].accountID,
        branchID: currentTranObject[0].branchID,
      });
      setValues({
        ...values,
        accountId: currentTranObject[0].accountID,
        branchID: currentTranObject[0].branchID,
        valueDate: currentTranObject[0].valueDate,
        accountType: currentTranObject[0].accountType,
        productID: currentTranObject[0].productID,
        partTranType: currentTranObject[0].partTranType,
        receiptNo: currentTranObject[0].receiptNo,
        tranAmount: currentTranObject[0].tranAmount,
        tranCode: currentTranObject[0].tranCode,
        tranRemarks: currentTranObject[0].tranRemarks,
      });
    }
  }, [currentTranObject]);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/Finance/GetGeneralLedgers')
      .then(response => setGlList(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/Finance/GetAccounts/S')
      .then(response => setSavingsList(response?.data))
      .catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/Finance/GetAccounts/C')
      .then(response => setSharesList(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  useEffect(() => {
    if (values.accountId.length > 0) {
      setModal(true);
      setDiplayModalState(false);
    } else {
      setModal(false);
    }
  }, [values.accountId]);

  useEffect(() => {
    if (values.accTypeID.length > 0) {
      if (values.accTypeID === 'G') {
        setModalList(glList);
        setSavingsAcType(false);
        setSharesAcType(false);
        setGLAcType(true);
      } else if (values.accTypeID === 'S') {
        setModalList([]);
        setGLAcType(false);
        setSavingsAcType(true);
        setSharesAcType(false);
      } else {
        setModalList([]);
        setGLAcType(false);
        setSavingsAcType(false);
        setSharesAcType(true);
      }
    }
  }, [values.accTypeID]);

  const hideModal = () => {
    setModal(false);
  };

  useEffect(() => {
    if (modalBranch.length > 0 && modalBranch !== '004') {
      const newModalList = modalList.filter(
        account => account.branchID === modalBranch,
      );
      setInnerModalList(newModalList);
    } else {
      setInnerModalList(modalList);
    }
  }, [modalBranch]);

  const setSelectedAccount = (account, type) => {
    setCurrentAccount(account);
    setValues({
      ...values,
      accountId: account.accountID,
      productID: type === 'GL' ? 'GL' : account.productID,
      productName: type === 'GL' ? 'GENERAL LEDGER'
        : type === 'SV' ? 'SAVINGS'
          : type === 'SH' ? 'MEMBER SHARES' : null,
    });
    setDiplayModalState(true);
  };

  useEffect(() => {
    if (diplayModalState) {
      setModal(false);
    }
  }, [diplayModalState]);

  const submitCashTransaction = () => {
    const result = {
      ...values,
      partTranType: values.tranTypeID === '001' ? 'C'
        : values.tranTypeID === '002' ? 'D'
          : null,
    };

    const userAccount = {
      columnID: 1,
      valueDate: result.valueDate,
      branchID: currentAccount.branchID,
      accountID: result.accountId,
      accountType: result.accTypeID,
      productID: result.productID,
      partTranType: result.partTranType,
      receiptNo: (result.receiptNo).toUpperCase(),
      tranAmount: parseInt(result.tranAmount, 10),
      tranCode: result.tranTypeID,
      tranParticulars: 'CASH DEPOSIT',
      tranRemarks: (result.tranRemarks).toUpperCase(),
    };
    if (editState) {
      console.log(userAccount, 'userAccount update');
    } else {
      dispatch(saveTransactions(userAccount));
    }
  };

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
            <div className="cash-traction-top-section">
              {
                modal
                && editState === false
                && values.accTypeID.length > 0 ? (
                  <div className="search-criteria-section shadow">
                    <div className="search-criteria-section-header">
                      Search Criteria Section
                      <i
                        className="far fa-times-circle"
                        onClick={hideModal}
                      />
                    </div>
                    {
                      savingsAcType || sharesAcType ? (

                        <div className="search-criteria-section-first">
                          <div className="search-criteria-section-title">Account ID:</div>
                          <div className="search-criteria-section-left">
                            <input type="text" />
                            <div className="search-criteria-section-title">Client ID:</div>
                            <input type="text" />
                          </div>
                        </div>
                      ) : null
                    }

                    {
                      savingsAcType || sharesAcType ? (
                        <div className="search-criteria-section-first">
                          <div className="search-criteria-section-title">Product ID:</div>
                          <div className="search-criteria-section-left">
                            <input type="text" />
                            <div className="search-criteria-section-title">Branch:</div>
                            <select>
                              <option value="val">val</option>
                            </select>
                          </div>
                        </div>
                      ) : null
                    }

                    {
                      gLAcType ? (
                        <div className="search-criteria-section-first">
                          <div className="search-criteria-section-title">Account ID:</div>
                          <div className="search-criteria-section-left">
                            <input type="text" />
                            <div className="search-criteria-section-title">Branch:</div>
                            <select
                              name="modalBranch"
                              value={modalBranch}
                              onChange={e => setModalBranch(e.target.value)}
                            >
                              <option value="" disabled selected hidden>Select</option>
                              {
                                modalBranchList.map(branch => (
                                  <option key={branch.id} value={branch.id}>
                                    {branch.name}
                                  </option>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                      ) : null
                    }

                    <div className="search-criteria-section-first">
                      <div className="search-criteria-section-title">Account Name:</div>
                      <div className="search-criteria-section-left d-flex">
                        <input type="text" className="w-100" />
                      </div>
                    </div>
                    <div className="search-creteria-account-details">
                      <div className="search-creteria-account-details-header mb-2">Account Details:</div>
                      {
                      savingsAcType || sharesAcType ? (
                        <div className="search-creteria-account-details-content-header">
                          <div className="search-creteria-account-details-content-header-grid">AccountID</div>
                          <div className="search-creteria-account-details-content-header-grid">ProductID</div>
                          <div className="search-creteria-account-details-content-header-grid">AccountName</div>
                        </div>
                      ) : gLAcType ? (
                        <div className="search-creteria-account-details-content-header-two">
                          <div className="search-creteria-account-details-content-header-grid">AccountID</div>
                          <div className="search-creteria-account-details-content-header-grid">AccountName</div>
                          <div className="search-creteria-account-details-content-header-grid">BranchID</div>
                          <div className="search-creteria-account-details-content-header-grid">BranchName</div>
                        </div>
                      ) : null

                      }
                      {
                        savingsAcType ? (
                          <div className="search-creteria-account-details-content-outer">
                            {
                              savingsList.map(account => (
                                <div
                                  onClick={() => setSelectedAccount(account, 'SV')}
                                  key={account.controlAccountGL}
                                  className="search-creteria-account-details-content"
                                >
                                  <div className="search-creteria-account-details-content-grid">{ account.accountID }</div>
                                  <div className="search-creteria-account-details-content-grid">{ account.productID }</div>
                                  <div className="search-creteria-account-details-content-grid">{ account.accountName }</div>
                                </div>
                              ))
                            }
                          </div>
                        ) : sharesAcType ? (
                          <div className="search-creteria-account-details-content-outer">
                            {
                              sharesList.map(account => (
                                <div
                                  onClick={() => setSelectedAccount(account, 'SH')}
                                  key={account.controlAccountGL}
                                  className="search-creteria-account-details-content"
                                >
                                  <div className="search-creteria-account-details-content-grid">{ account.accountID }</div>
                                  <div className="search-creteria-account-details-content-grid">{ account.productID }</div>
                                  <div className="search-creteria-account-details-content-grid">{ account.accountName }</div>
                                </div>
                              ))
                            }
                          </div>
                        ) : gLAcType ? (
                          <div className="search-creteria-account-details-content-outer">
                            {
                              innerModalList.map(account => (
                                <div
                                  onClick={() => setSelectedAccount(account, 'GL')}
                                  key={account.accountID}
                                  className="search-creteria-account-details-content-two"
                                >
                                  <div className="search-creteria-account-details-content-grid">
                                    {account.accountID}
                                  </div>
                                  <div className="search-creteria-account-details-content-grid">
                                    {
                                    account.accountName.length < 22
                                      ? (account.accountName)
                                      : (`${account.accountName.substring(0, 22)} ...`)
                                    }
                                  </div>
                                  <div className="search-creteria-account-details-content-grid">
                                    {account.branchID}
                                  </div>
                                  <div className="search-creteria-account-details-content-grid">
                                    {account.branchID === '000' ? 'Head Office'
                                      : account.branchID === '001' ? 'Nansana'
                                        : account.branchID === '002' ? 'Rugika' : null}
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        ) : null
                      }
                    </div>
                  </div>
                  ) : null
              }
              <div className="cash-traction-top-section-grid">
                <span> PartTranType: </span>
                {' '}
                <select
                  name="tranTypeID"
                  value={values.tranTypeID}
                  onChange={handleChange}
                >
                  <option value="" disabled selected hidden>Select</option>
                  {
                    tranTypes.map(tranType => (
                      <option
                        key={tranType.tranType}
                        value={tranType.tranType === 'C' ? '001'
                          : tranType.tranType === 'D' ? '002' : null}
                      >
                        {tranType.transactionType}
                      </option>
                    ))
                  }
                </select>
              </div>
              <div className="cash-traction-top-section-grid">
                <span> AcctType: </span>
                {' '}
                <select
                  name="accTypeID"
                  value={values.accTypeID}
                  onChange={handleChange}
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
              <div className="cash-traction-top-section-grid">
                <span> Tran#: </span>
                <input onChange={e => setCurrentTranId(e.target.value)} type="text" />
              </div>
              <div className="cash-traction-top-section-grid">
                <span> Serial#: </span>
                <input type="text" />
              </div>
            </div>
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
                  <input type="text" value={values.tranTypeID} />
                  <div className="right-cash-transaction-middle-section-text">
                    {
                      values.tranTypeID === '001' ? 'CASH CREDIT'
                        : values.tranTypeID === '002' ? 'CASH DEBIT'
                          : null
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
                <div className="cash-transaction-buttons-section">
                  <button type="button">Add</button>
                  <button type="button">Edit</button>
                  <button onClick={submitCashTransaction} type="button">Save</button>
                  <button type="button">Cancel</button>
                  <button type="button">Delete</button>
                </div>
              </div>
            </div>
            <div className="cashier-details-section">
              <div className="cashier-details-header">Cashier Details</div>
              <div className="cashier-details-section-account-details">
                <div className="cashier-details-section-account-title">
                  <div className="cashier-details-inner-title">Cash GL A/C:</div>
                  <div className="cashier-details-inner-text">
                    <div>0002314530098</div>
                  </div>
                </div>
                <div className="cashier-details-section-account-number-top">TELLER REUBEN</div>
                <div className="cashier-details-section-account-name" />
              </div>
              <div className="cashier-details-section-account-details">
                <div className="cashier-details-section-account-title">
                  <div className="cashier-details-inner-title-lower">Total Debit:</div>
                  <div className="cashier-details-inner-text-lower">
                    <div className="cashier-details-inner-text-cross-first">0.00</div>
                    <div className="cashier-details-inner-text-cross"> + </div>
                  </div>
                </div>
                <div className="cashier-details-section-account-title">
                  <div className="cashier-details-inner-title-lower">Total Credit:</div>
                  <div className="cashier-details-inner-text-lower">
                    <div className="cashier-details-inner-text-cross-first">0.00</div>
                    <div className="cashier-details-inner-text-cross"> + </div>
                  </div>
                </div>
                <div className="cashier-details-section-account-title">
                  <div className="cashier-details-inner-title-lower">Shadow Bal:</div>
                  <div className="cashier-details-inner-text-lower">
                    <div className="cashier-details-inner-text-cross-first">0.00</div>
                  </div>
                </div>
              </div>
              <div className="cashier-details-section-account-details">
                <div className="cashier-details-section-account-title">
                  <div className="cashier-details-inner-title-lower">Opening Balance:</div>
                  <div className="cashier-details-inner-text-lower">
                    <div className="cashier-details-inner-text-cross-first">0.00</div>
                  </div>
                </div>
                <div className="cashier-details-section-account-title">
                  <div className="cashier-details-inner-title-lower">Closing Balance:</div>
                  <div className="cashier-details-inner-text-lower">
                    <div className="cashier-details-inner-text-cross-first">0.00</div>
                  </div>
                </div>
                <div className="cashier-details-section-account-title">
                  <div className="cashier-details-inner-title-lower">Clear Balance:</div>
                  <div className="cashier-details-inner-text-lower">
                    <div className="cashier-details-inner-text-cross-first">0.00</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cashier-details-section">
              <div className="cashier-details-header">Account Details</div>
              <div className="cashier-details-section-account-details">
                <div className="cashier-details-section-account-title">
                  <div className="cashier-details-inner-title-lower">Clear Balance:</div>
                  <div className="cashier-details-inner-text-lower">
                    <div className="cashier-details-inner-text-cross-first">0.00</div>
                  </div>
                </div>
                <div className="cashier-details-section-account-title">
                  <div className="cashier-details-inner-title-lower">Lien Amount:</div>
                  <div className="cashier-details-inner-text-lower">
                    <div className="cashier-details-inner-text-cross-first">0.00</div>
                  </div>
                </div>
                <div className="cashier-details-section-account-title">
                  <div className="cashier-details-inner-title-lower">Frozen Amount:</div>
                  <div className="cashier-details-inner-text-lower">
                    <div className="cashier-details-inner-text-cross-first">0.00</div>
                  </div>
                </div>
              </div>
              <div className="cashier-details-section-account-details">
                <div className="cashier-details-section-account-title">
                  <div className="cashier-details-inner-title-lower">Available Bal:</div>
                  <div className="cashier-details-inner-text-lower">
                    <div className="cashier-details-inner-text-cross-first">0.00</div>
                  </div>
                </div>
                <div className="cashier-details-section-account-title">
                  <div className="cashier-details-inner-title-lower">UnSupervisedCR:</div>
                  <div className="cashier-details-inner-text-lower">
                    <div className="cashier-details-inner-text-cross-first">0.00</div>
                  </div>
                </div>
                <div className="cashier-details-section-account-title">
                  <div className="cashier-details-inner-title-lower">UnSupervisedDR:</div>
                  <div className="cashier-details-inner-text-lower">
                    <div className="cashier-details-inner-text-cross-first">0.00</div>
                  </div>
                </div>
              </div>
              <div className="cashier-details-button-section">
                <button type="button">Photo and Signature</button>
                <button type="button">Mandate</button>
                <button type="button">Transactions</button>
                <button type="button">Customer Portfolio</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
