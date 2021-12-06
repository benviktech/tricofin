/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './index.css';
import axios from 'axios';
import { TransactionsSidebar } from '../../Sidebar/Sidebar';
import { clearError, saveTransactions } from '../../../actions/generalLedger';
import transactionValidator from '../../Validators/Transaction';
import { CashierDetails, AccountDetails } from './Details';
import Modal from './Modal';
import TransactionForm from './TransactionForm';
import TransactionRequests from './TransactionRequests';
import {
  GLListFilter, SCListFilter, calculateTotal, initialState,
} from './TransactionHelpers';

const Transaction = () => {
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
  const dispatch = useDispatch();
  const [currentTranId, setCurrentTranId] = useState('');
  const [currentTranObject, setCurrentTranObject] = useState({});
  const [editState, setEditState] = useState(false);
  const [errors, setErrors] = useState({});
  const [userAccount, setUserAccount] = useState({});
  const [creditSum, setCreditSum] = useState(0);
  const [debitSum, setDebitSum] = useState(0);
  const compName = 'Transaction';
  const history = useHistory();

  const cashTransactionList = useSelector(state => state.generalLedgerReducer.cashTransactionList);
  const successRequest = useSelector(state => state.generalLedgerReducer.successRequest);
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

  useEffect(() => {
    if (currentTranId.length > 0) {
      axios.get(`https://tricofin.azurewebsites.net/api/Finance/GetDailyTransaction/${currentTranId}`)
        .then(response => setCurrentTranObject(response?.data))
        .catch(error => console.log(error?.message));
      setEditState(true);
    } else {
      setCurrentTranObject({}); setValues(initialState); setEditState(false); setCurrentAccount({});
    }
  }, [currentTranId]);

  useEffect(() => {
    if (cashTransactionList.length > 0) {
      setCreditSum(calculateTotal(cashTransactionList, 'C'));
      setDebitSum(calculateTotal(cashTransactionList, 'D'));
    }
  }, [cashTransactionList]);

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

  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.code === 'F2') { setModal(true); setDiplayModalState(false); }
    });
  });

  useEffect(() => {
    if (values.accTypeID.length > 0) {
      if (values.accTypeID === 'G') {
        setSavingModalList([]);
        setSharesModalList([]);
        setModalList(glList);
        setSavingsAcType(false);
        setSharesAcType(false);
        setGLAcType(true);
      } else if (values.accTypeID === 'S') {
        setSharesModalList([]);
        setModalList([]);
        setSavingModalList(savingsList);
        setGLAcType(false);
        setSavingsAcType(true);
        setSharesAcType(false);
      } else {
        setSavingModalList([]);
        setSharesModalList(sharesList);
        setModalList([]);
        setGLAcType(false);
        setSavingsAcType(false);
        setSharesAcType(true);
      }
    }
  }, [values.accTypeID]);

  const hideModal = () => setModal(false);

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
    if (diplayModalState) { setModal(false); }
  }, [diplayModalState]);

  const submitCashTransaction = () => {
    const result = {
      ...values,
      partTranType: editState ? values.partTranType
        : (values.tranTypeID === '001' ? 'C'
          : values.tranTypeID === '002' ? 'D'
            : null),
    };

    setUserAccount({
      ...userAccount,
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
    });
  };

  useEffect(() => {
    if (Object.keys(userAccount).length > 0) {
      setErrors(transactionValidator(userAccount, 'submit'));
    }
  }, [userAccount]);

  useEffect(async () => {
    if (Object.values(errors).includes('submit')) {
      if (Object.keys(errors).length === 1) {
        if (editState) {
          console.log(userAccount, 'userAccount update');
        } else {
          await dispatch(saveTransactions(userAccount));
          setValues(initialState);
        }
      }
    }
  }, [errors]);

  const filterGlList = (content, text) => {
    setInnerModalList(Array.from(new Set(GLListFilter(copyinnerModalList, content, text))));
  };

  const filterListTwo = (content, type, text) => {
    const sortedNewModalList = Array
      .from(new Set(SCListFilter(copysVInnerModalList, copysHInnerModalList, content, type, text)));
    if (type === 'savings') { setSVInnerModalList(sortedNewModalList); }
    if (type === 'shares') { setSHInnerModalList(sortedNewModalList); }
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
                onClick={routeBack}
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
                <input
                  disabled="true"
                  value={values.tranSerialNo}
                  type="text"
                />
              </div>
              {
                Object.keys(errors).length > 1 ? (
                  <div className="transactions-errors shadow">
                    <i onClick={() => setErrors({})} className="far fa-times-circle" />
                    <ul>
                      {
                        Object.values(errors).filter(error => error !== 'submit').map(error => <li key={error}>{error}</li>)
                      }
                    </ul>
                  </div>
                ) : successRequest ? (
                  <div className="transactions-success shadow">
                    <span>Created Successfully</span>
                    <i onClick={() => clearSuccesMessage()} className="far text-success fa-lg fa-times-circle" />
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
              submitCashTransaction={submitCashTransaction}
              compName={compName}
            />
            <CashierDetails creditSum={creditSum} debitSum={debitSum} />
            <AccountDetails compName={compName} currentAccount={currentAccount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
