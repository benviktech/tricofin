/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './index.css';
import axios from 'axios';
import { TransactionsSidebar } from '../../Sidebar/Sidebar';
import transactionValidator from '../../Validators/Transaction';
import Modal from './Modal';
import TransactionForm from './TransactionForm';
import TransactionRequests from './TransactionRequests';
import { AccountDetails } from './Details';
import {
  GLListFilter, SCListFilter, initialState, calculateTotal,
} from './TransactionHelpers';
import TransactionDetails from './TransactionDetails';
import { clearError, transferTransaction } from '../../../actions/generalLedger';

const TransferTransactions = () => {
  const [values, setValues] = useState(initialState);
  const [currentAccount, setCurrentAccount] = useState({});
  const [diplayModalState, setDiplayModalState] = useState(false);
  const [modalBranch, setModalBranch] = useState('');
  const [savingModalBranch, setSavingModalBranch] = useState('');
  const [savingsAcType, setSavingsAcType] = useState(false);
  const [innerModalList, setInnerModalList] = useState([]);
  const [copyinnerModalList, setCopyInnerModalList] = useState([]);
  const [sVInnerModalList, setSVInnerModalList] = useState([]);
  const [copysVInnerModalList, setCopySVInnerModalList] = useState([]);
  const [sHInnerModalList, setSHInnerModalList] = useState([]);
  const [copysHInnerModalList, setCopySHInnerModalList] = useState([]);
  const [gLAcType, setGLAcType] = useState(false);
  const [sharesAcType, setSharesAcType] = useState(false);
  const [modalList, setModalList] = useState([]);
  const [savingModalList, setSavingModalList] = useState([]);
  const [sharesModalList, setSharesModalList] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentTranId, setCurrentTranId] = useState('');
  const [currentTranObject, setCurrentTranObject] = useState({});
  const [editState, setEditState] = useState(false);
  const [errors, setErrors] = useState({});
  const [userAccount, setUserAccount] = useState({});
  const compName = 'Transfer';
  const [accountsArray, setAccountsArray] = useState([]);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [errorModal, setErrorModal] = useState(false);
  const history = useHistory();
  const [cursorPosition, setCursorPosition] = useState(true);
  const [editGrid, setEditGrid] = useState(false);

  const successRequest = useSelector(state => state.generalLedgerReducer.successRequest);
  const errorRequest = useSelector(state => state.generalLedgerReducer.error);
  const routeBack = () => history.goBack();
  const clearSuccesMessage = () => dispatch(clearError());
  useEffect(() => dispatch(clearError()), []);

  const {
    tranTypes, accTypes, modalBranchList,
    glList, savingsList, sharesList,
  } = TransactionRequests();

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const sortData = dataList => {
    const result = dataList.map((element, index) => (
      {
        ...element,
        columnID: index + 1,
        valueDate: new Date(element.valueDate)
          .toUTCString().split(' ').slice(1, 4)
          .join('-'),
      }
    ));
    return result;
  };

  useEffect(() => {
    if (currentTranId.length > 0) {
      axios.get(`https://tricofin.azurewebsites.net/api/Finance/GetDailyTransaction/${currentTranId}`)
        .then(response => {
          setCurrentTranObject(response?.data); setAccountsArray(sortData(response?.data));
        })
        .catch(error => console.log(error?.message));
      setEditState(true);
    } else {
      setCurrentTranObject({}); setValues(initialState); setEditState(false); setCurrentAccount({});
      setAccountsArray([]);
    }
  }, [currentTranId]);

  useEffect(() => {
    if (currentTranObject.length > 0) {
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
        accTypeID: currentTranObject[0].accountType,
        productID: currentTranObject[0].productID,
        partTranType: currentTranObject[0].partTranType,
        receiptNo: currentTranObject[0].receiptNo,
        tranAmount: currentTranObject[0].tranAmount,
        tranCode: currentTranObject[0].tranCode,
        tranRemarks: currentTranObject[0].tranRemarks,
        tranSerialNo: currentTranObject[0].tranSerialNo,
      });
    }
  }, [currentTranObject]);

  const determineInput = () => {
    if (cursorPosition) { setModal(true); setDiplayModalState(false); }
  };

  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.code === 'F2') { determineInput(); }
    });
  });

  useEffect(() => {
    if (values?.accTypeID?.length > 0) {
      if (values.accTypeID === 'G') {
        setSavingModalList([]); setSharesModalList([]); setModalList(glList);
        setSavingsAcType(false); setSharesAcType(false); setGLAcType(true);
      } else if (values.accTypeID === 'S') {
        setSharesModalList([]); setModalList([]); setSavingModalList(savingsList);
        setGLAcType(false); setSavingsAcType(true); setSharesAcType(false);
      } else {
        setSavingModalList([]); setSharesModalList(sharesList); setModalList([]);
        setGLAcType(false); setSavingsAcType(false); setSharesAcType(true);
      }
    }
  }, [values.accTypeID]);

  const hideModal = () => { setModal(false); setCursorPosition(false); };

  useEffect(() => {
    if (modalBranch.length > 0 && modalBranch !== '004') {
      const newModalList = modalList.filter(
        account => account.branchID === modalBranch,
      );
      setInnerModalList(newModalList); setCopyInnerModalList(newModalList);
    } else { setInnerModalList(modalList); setCopyInnerModalList(modalList); }
  }, [modalBranch]);

  useEffect(() => {
    if (savingModalBranch.length > 0 && savingModalBranch !== '004') {
      const newModalList = (savingsAcType ? savingModalList
        : sharesAcType ? sharesModalList : null).filter(
        account => account.branchID === savingModalBranch,
      );
      if (savingsAcType) {
        setSVInnerModalList(newModalList); setCopySVInnerModalList(newModalList);
      }
      if (sharesAcType) {
        setSHInnerModalList(newModalList); setCopySHInnerModalList(newModalList);
      }
    } else {
      if (savingsAcType) {
        setSVInnerModalList(savingModalList); setCopySVInnerModalList(savingModalList);
      }
      if (sharesAcType) {
        setSHInnerModalList(sharesModalList); setCopySHInnerModalList(sharesModalList);
      }
    }
  }, [savingModalBranch]);

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
    if (values.accountId && values.accTypeID) {
      if (values.accTypeID === 'G') {
        const res = glList.find(account => account.accountID === values.accountId);
        if (res) { setSelectedAccount(res, 'GL'); } else { setSelectedAccount({}, 'GL'); }
      }
      if (values.accTypeID === 'S') {
        const res = savingsList.find(account => account.accountID === values.accountId);
        if (res) { setSelectedAccount(res, 'SV'); } else { setSelectedAccount({}, 'SV'); }
      }
      if (values.accTypeID === 'C') {
        const res = sharesList.find(account => account.accountID === values.accountId);
        if (res) { setSelectedAccount(res, 'SH'); } else { setSelectedAccount({}, 'SH'); }
      }
    }
  }, [values.accountId]);

  useEffect(() => {
    if (diplayModalState) { setModal(false); }
  }, [diplayModalState]);

  const submitCashTransaction = () => {
    const result = {
      ...values,
      partTranType: editState ? values.partTranType
        : (values.tranTypeID === '003' ? 'C'
          : values.tranTypeID === '004' ? 'D'
            : null),
    };

    setUserAccount({
      ...userAccount,
      columnID: count + 1,
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
    }); setCurrentAccount({});
  };

  useEffect(() => {
    if (Object.keys(userAccount).length > 0) {
      setErrors(transactionValidator(userAccount, 'submit'));
    }
  }, [userAccount]);

  const updateArrayData = (accountsArray, userAccount) => {
    const result = accountsArray.map(
      account => (account.accountID === userAccount.accountID ? userAccount : account),
    );
    setAccountsArray(result);
  };

  useEffect(async () => {
    if (Object.values(errors).includes('submit')) {
      if (Object.keys(errors).length === 1) {
        setCount(count + 1);
        if (editState) {
          console.log(userAccount, 'userAccount update');
        } else {
          if (editGrid && accountsArray.length > 0) { updateArrayData(accountsArray, userAccount); }
          if (editGrid === false) { setAccountsArray([...accountsArray, userAccount]); }
          setEditGrid(false);
          setValues(
            {
              ...initialState,
              tranAmount: values.tranAmount,
              valueDate: values.valueDate,
              receiptNo: values.receiptNo,
              tranRemarks: values.tranRemarks,
            },
          );
        }
      } else {
        setErrorModal(true);
      }
    }
  }, [errors]);

  useMemo(() => {
    if (accountsArray.length > 1) {
      setTotalCredit(calculateTotal(accountsArray, 'C'));
      setTotalDebit(calculateTotal(accountsArray, 'D'));
    }
  }, [accountsArray]);

  const filterGlList = (content, text) => {
    setInnerModalList(Array.from(new Set(GLListFilter(copyinnerModalList, content, text))));
  };

  const filterListTwo = (content, type, text) => {
    const sortedNewModalList = Array
      .from(new Set(SCListFilter(copysVInnerModalList, copysHInnerModalList, content, type, text)));
    if (type === 'savings') { setSVInnerModalList(sortedNewModalList); }
    if (type === 'shares') { setSHInnerModalList(sortedNewModalList); }
  };

  const submitTransfers = async () => {
    if (totalCredit === 0 || totalDebit === 0) {
      console.log('Please select both');
    } else if (totalCredit === totalDebit) {
      const result = accountsArray.filter(account => Object.keys(account).length > 0);
      await dispatch(transferTransaction(result));
      setValues(initialState); setAccountsArray([]); setCount(0);
    } else { console.log('Please ensure that the book is balanced'); }
  };

  const resetFormData = data => {
    setEditGrid(true);
    setValues({
      ...values,
      accountId: data.accountID,
      accTypeID: data.accountType,
      productID: data.productID,
      receiptNo: data.receiptNo,
      tranAmount: data.tranAmount,
      tranRemarks: data.tranRemarks,
      tranTypeID: data.partTranType === 'C' ? '003' : '004',
    });
  };

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Transfer Transactions</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <div className="back-button-section">
              <i
                className="fas fa-arrow-circle-left"
                style={{ fontSize: '20px', marginRight: '10px', cursor: 'pointer' }}
                onClick={routeBack}
              />
            </div>
            <TransactionsSidebar />
          </div>
          <div className="submit-form-top-section">
            <div className="cash-traction-top-section">
              {
                modal
                && cursorPosition
                && editState === false
                && values.accTypeID.length > 0 ? (
                  <Modal
                    hideModal={hideModal}
                    savingsAcType={savingsAcType}
                    sharesAcType={sharesAcType}
                    filterListTwo={filterListTwo}
                    savingModalBranch={savingModalBranch}
                    setSavingModalBranch={setSavingModalBranch}
                    modalBranchList={modalBranchList}
                    gLAcType={gLAcType}
                    filterGlList={filterGlList}
                    modalBranch={modalBranch}
                    setModalBranch={setModalBranch}
                    sVInnerModalList={sVInnerModalList}
                    setSelectedAccount={setSelectedAccount}
                    sHInnerModalList={sHInnerModalList}
                    innerModalList={innerModalList}
                  />
                  ) : null
              }
              <div className="cash-traction-top-section-grid">
                <span> PartTranType: </span>
                {' '}
                <select name="tranTypeID" value={values.tranTypeID} onChange={handleChange}>
                  <option value="" disabled selected hidden>Select</option>
                  {
                    tranTypes.map(tranType => (
                      <option
                        key={tranType.tranType}
                        value={tranType.tranType === 'C' ? '003'
                          : tranType.tranType === 'D' ? '004' : null}
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
                <select name="accTypeID" value={values.accTypeID} onChange={handleChange}>
                  <option value="" disabled selected hidden>Select</option>
                  {
                    accTypes.filter(element => element.accountTypeID !== 'L').map(accType => (
                      <option key={accType.accountTypeID} value={accType.accountTypeID}>
                        {accType.accountType}
                      </option>
                    ))
                  }
                </select>
              </div>
              <div className="cash-traction-top-section-grid">
                <span> Tran#: </span>
                <input
                  onChange={e => setCurrentTranId(e.target.value)}
                  onFocus={() => setCursorPosition(false)}
                  type="text"
                />
              </div>
              <div className="cash-traction-top-section-grid">
                <span> Serial#: </span>
                <input disabled="true" value={values.tranSerialNo} type="text" />
              </div>
              {
                errorModal ? (
                  <div className="transactions-errors shadow">
                    <i onClick={() => setErrorModal(false)} className="far fa-times-circle" />
                    <ul>
                      {Object.values(errors).filter(error => error !== 'submit').map(error => <li key={error}>{error}</li>)}
                    </ul>
                  </div>
                ) : successRequest ? (
                  <div className="transactions-success shadow">
                    <span>Created Successfully</span>
                    <i onClick={() => clearSuccesMessage()} className="far text-success fa-lg fa-times-circle" />
                  </div>
                ) : errorRequest.length > 0 ? (
                  <div className="transactions-error shadow">
                    <span>{errorRequest}</span>
                    <i onClick={() => clearSuccesMessage()} className="far text-danger fa-lg fa-times-circle" />
                  </div>
                ) : null
              }
            </div>
            <TransactionForm
              values={values}
              handleChange={handleChange}
              currentAccount={currentAccount}
              editState={editState}
              currentTranObject={currentTranObject}
              setErrors={setErrors}
              compName={compName}
              setCursorPosition={setCursorPosition}
            />
            <AccountDetails compName={compName} currentAccount={currentAccount} />
            <div className="part-tran-details-section d-flex">
              <div className="part-tran-details-header">Part Tran Details</div>
              <div className="part-tran-details-content">
                <div className="total-DR-section">
                  <label>
                    Total Debit
                    {' '}
                    {' '}
                    :
                    {' '}
                    {' '}
                    <div className="total-DR-section-inner border ml-2 py-1">{ totalDebit }</div>
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
                    <div className="total-DR-section-inner border ml-2 py-1">{ totalCredit }</div>
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
                    onClick={submitCashTransaction}
                    type="button"
                  >
                    Add

                    <i className="far fa-arrow-alt-circle-down ml-2" />
                  </button>
                </div>
              </div>
            </div>
            <TransactionDetails accountsArray={accountsArray} resetFormData={resetFormData} />
            <div className="lower-transaction-submit-section">
              <button onClick={submitTransfers} type="button">Submit</button>
              <button onClick={() => setValues(initialState)} type="button">Cancel</button>
              <button type="button">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferTransactions;
