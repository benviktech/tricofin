/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import axios from 'axios';
import { TransactionsSidebar } from '../../Sidebar/Sidebar';
import { fectchDailyTransactions, saveTransactions } from '../../../actions/generalLedger';
import transactionValidator from '../../Validators/Transaction';
import { CashierDetails, AccountDetails } from './Details';
import Modal from './Modal';
import TransactionForm from './TransactionForm';

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
  tranSerialNo: '',
};

const Transaction = () => {
  const [values, setValues] = useState(initialState);
  const [currentAccount, setCurrentAccount] = useState({});
  const [diplayModalState, setDiplayModalState] = useState(false);
  const [glList, setGlList] = useState([]);
  const [savingsList, setSavingsList] = useState([]);
  const [sharesList, setSharesList] = useState([]);
  const [modalBranch, setModalBranch] = useState('');
  const [savingModalBranch, setSavingModalBranch] = useState('');
  const [savingsAcType, setSavingsAcType] = useState(false);
  const [innerModalList, setInnerModalList] = useState([]);
  const [sVInnerModalList, setSVInnerModalList] = useState([]);
  const [sHInnerModalList, setSHInnerModalList] = useState([]);
  const [gLAcType, setGLAcType] = useState(false);
  const [sharesAcType, setSharesAcType] = useState(false);
  const [modalList, setModalList] = useState([]);
  const [savingModalList, setSavingModalList] = useState([]);
  const [sharesModalList, setSharesModalList] = useState([]);
  const [modal, setModal] = useState(false);
  const [tranTypes, setTranTypes] = useState([]);
  const [accTypes, setAccTypes] = useState([]);
  const dispatch = useDispatch();
  const [currentTranId, setCurrentTranId] = useState('');
  const [currentTranObject, setCurrentTranObject] = useState({});
  const [editState, setEditState] = useState(false);
  const [errors, setErrors] = useState({});
  const [userAccount, setUserAccount] = useState({});
  const [creditSum, setCreditSum] = useState(0);
  const [debitSum, setDebitSum] = useState(0);

  const cashTransactionList = useSelector(state => state.generalLedgerReducer.cashTransactionList);

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

  useEffect(() => {
    dispatch(fectchDailyTransactions());
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
    if (cashTransactionList.length > 0) {
      const totalCredit = cashTransactionList
        .filter(transaction => transaction.partTranType === 'C'
        && transaction.tranSerialNo === 1)
        .reduce((sum, x) => sum + x.tranAmount, 0);

      const totalDebit = cashTransactionList
        .filter(transaction => transaction.partTranType === 'D'
        && transaction.tranSerialNo === 1)
        .reduce((sum, x) => sum + x.tranAmount, 0);

      setCreditSum(totalCredit);
      setDebitSum(totalDebit);
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

  useEffect(() => {
    if (savingModalBranch.length > 0 && savingModalBranch !== '004') {
      const newModalList = (savingsAcType ? savingModalList
        : sharesAcType ? sharesModalList : null).filter(
        account => account.branchID === savingModalBranch,
      );
      if (savingsAcType) {
        setSVInnerModalList(newModalList);
      }
      if (sharesAcType) {
        setSHInnerModalList(newModalList);
      }
    } else {
      if (savingsAcType) {
        setSVInnerModalList(savingModalList);
      }
      if (sharesAcType) {
        setSHInnerModalList(sharesModalList);
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
    if (diplayModalState) {
      setModal(false);
    }
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
      setErrors(transactionValidator(userAccount));
    }
  }, [userAccount]);

  useEffect(async () => {
    if (Object.keys(errors).length === 0) {
      if (editState) {
        console.log(userAccount, 'userAccount update');
      } else {
        await dispatch(saveTransactions(userAccount));
        setValues(initialState);
      }
    }
  }, [errors]);

  const filterGlList = (content, text) => {
    const newModalList = [];
    let accId = '';
    glList.forEach(account => {
      if (text === 'accountId') {
        accId = account.accountID;
      }
      if (text === 'accountName') {
        accId = account.accountName;
      }
      if (accId.length > 0) {
        if (accId.indexOf(content.toLocaleUpperCase()) !== -1) {
          newModalList.push(account);
        }
      }
    });
    const sortedNewModalList = Array.from(new Set(newModalList));
    setInnerModalList(sortedNewModalList);
  };

  const filterListTwo = (content, type, text) => {
    const newModalList = [];
    let accId = '';
    (type === 'savings' ? savingsList
      : type === 'shares' ? sharesList : null).forEach(account => {
      if (text === 'accountId') { accId = account.accountID; }
      if (text === 'accountName') { accId = account.accountName; }
      if (accId.length > 0) {
        if (accId.indexOf(content.toLocaleUpperCase()) !== -1) {
          newModalList.push(account);
        }
      }
    });
    const sortedNewModalList = Array.from(new Set(newModalList));
    if (type === 'savings') {
      setSVInnerModalList(sortedNewModalList);
    }
    if (type === 'shares') {
      setSHInnerModalList(sortedNewModalList);
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
                Object.keys(errors).length > 0 ? (
                  <div className="transactions-errors shadow">
                    <i onClick={() => setErrors({})} className="far fa-times-circle" />
                    <ul>
                      {
                        Object.values(errors).map(error => <li key={error}>{error}</li>)
                      }
                    </ul>
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
            />
            <CashierDetails creditSum={creditSum} debitSum={debitSum} />
            <AccountDetails currentAccount={currentAccount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
