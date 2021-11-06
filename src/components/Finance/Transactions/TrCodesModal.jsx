/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AssestsPrdFilter } from './TransactionHelpers';

const branchListing = [{ setID: '000', setName: 'Head Office' },
  { setID: '001', setName: 'Nansana' },
  { setID: '002', setName: 'Rugika' },
  { setID: 'ALL', setName: 'All Branches' },
  { setID: 'OPN', setName: 'Operational Branch' }];

const TrCodesModal = ({
  setModal, setCurrentCode, currenTComp, cursorPosition,
}) => {
  const [transactionCodes, setTransactionCodes] = useState([]);
  const [generalLedgerIds, setGeneralLedgerIds] = useState([]);
  const [fixedAssetsPrdt, setFixedAssetsPrdt] = useState([]);
  const [systemBranches, setSystemBranches] = useState(branchListing);
  const [transactionCodesUpdate, setTransactionCodesUpdate] = useState([]);
  const [generalLedgerIdsUpdate, setGeneralLedgerIdsUpdate] = useState([]);
  const [fixedAssetsPrdtUpdate, setFixedAssetsPrdtUpdate] = useState([]);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/Finance/GetFixedAssetProducts')
      .then(response => setFixedAssetsPrdt(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/Finance/GetTransactionCodes')
      .then(response => setTransactionCodes(response?.data))
      .catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/Finance/GetGeneralLedgerIDs')
      .then(response => setGeneralLedgerIds(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  const multiCondition = (cursorPosition === 'control gl' || cursorPosition === 'Accum Drep'
    || cursorPosition === 'Dep Expense' || cursorPosition === 'Saleoff Loss'
    || cursorPosition === 'Saleoff Profit');

  const FilterData = (list, value, cursorPosition, text) => {
    const sortedNewModalList = Array
      .from(new Set(AssestsPrdFilter(list, value, cursorPosition, text)));
    if (currenTComp === 'Transaction Codes') {
      setTransactionCodesUpdate(sortedNewModalList);
    }
    if (currenTComp === 'Fixed Assets Products'
    && (cursorPosition === 'Set ID' || cursorPosition === 'branch id')) {
      setSystemBranches(sortedNewModalList);
    }
    if (currenTComp === 'Fixed Assets Products' && cursorPosition === 'product id') {
      setFixedAssetsPrdtUpdate(sortedNewModalList);
    }
    if (currenTComp === 'Fixed Assets Products' && multiCondition) {
      setGeneralLedgerIdsUpdate(sortedNewModalList);
    }
  };

  useEffect(() => {
    if (transactionCodes.length > 0) {
      setTransactionCodesUpdate(transactionCodes);
    }
  }, [transactionCodes]);

  useEffect(() => {
    if (generalLedgerIds.length > 0) {
      setGeneralLedgerIdsUpdate(generalLedgerIds);
    }
  }, [generalLedgerIds]);

  useEffect(() => {
    if (fixedAssetsPrdt.length > 0) {
      setFixedAssetsPrdtUpdate(fixedAssetsPrdt);
    }
  }, [fixedAssetsPrdt]);

  return currenTComp === 'Transaction Codes'
  || (currenTComp === 'Fixed Assets Products' && multiCondition)
  || (currenTComp === 'Fixed Assets Products' && cursorPosition === 'Set ID')
  || (currenTComp === 'Fixed Assets Products' && cursorPosition === 'branch id')
  || (currenTComp === 'Fixed Assets Products' && cursorPosition === 'product id') ? (
    <div className="transaction-codes-modal shadow">
      <div className="transaction-codes-modal-header-section">
        Enter the Search Criteria
        <i onClick={() => setModal(false)} className="far fa-times-circle" />
      </div>
      <div className="transaction-codes-modal-inputs-section">
        <div className="transaction-codes-modal-inputs-inner">
          <div className="transaction-codes-modal-inputs-label">
            { currenTComp === 'Transaction Codes' ? 'Tran Code:'
              : currenTComp === 'Fixed Assets Products'
              && multiCondition ? 'Product Id:'
                : currenTComp === 'Fixed Assets Products'
              && cursorPosition === 'Set ID' ? 'Set ID'
                  : currenTComp === 'Fixed Assets Products'
              && cursorPosition === 'product id' ? 'Product ID'
                    : currenTComp === 'Fixed Assets Products'
              && cursorPosition === 'branch id' ? 'Branch ID' : null }
          </div>
          <input
            onChange={
            currenTComp === 'Transaction Codes'
              ? e => FilterData(transactionCodes, e.target.value, cursorPosition, 'currentID')
              : currenTComp === 'Fixed Assets Products' && cursorPosition === 'Set ID'
                ? e => FilterData(systemBranches, e.target.value, cursorPosition, 'currentID')
                : currenTComp === 'Fixed Assets Products' && cursorPosition === 'branch id'
                  ? e => FilterData(systemBranches.splice(0, 3), e.target.value, cursorPosition, 'currentID')
                  : currenTComp === 'Fixed Assets Products' && cursorPosition === 'product id'
                    ? e => FilterData(fixedAssetsPrdt, e.target.value, cursorPosition, 'currentID')
                    : currenTComp === 'Fixed Assets Products' && multiCondition
                      ? e => FilterData(generalLedgerIds, e.target.value, cursorPosition, 'currentID')
                      : null
            }
            type="text"
          />
        </div>
        <div className="transaction-codes-modal-inputs-inner">
          <div className="transaction-codes-modal-inputs-label">
            { currenTComp === 'Transaction Codes' ? 'Tran Naration:'
              : currenTComp === 'Fixed Assets Products'
              && multiCondition ? 'Product Name:'
                : currenTComp === 'Fixed Assets Products'
              && cursorPosition === 'Set ID' ? 'Set Name'
                  : currenTComp === 'Fixed Assets Products'
              && cursorPosition === 'product id' ? 'Product Name'
                    : currenTComp === 'Fixed Assets Products'
              && cursorPosition === 'branch id' ? 'Branch Name' : null }
          </div>
          <input
            onChange={
            currenTComp === 'Transaction Codes'
              ? e => FilterData(transactionCodes, e.target.value, cursorPosition, 'currentName')
              : currenTComp === 'Fixed Assets Products' && cursorPosition === 'Set ID'
                ? e => FilterData(systemBranches, e.target.value, cursorPosition, 'currentName')
                : currenTComp === 'Fixed Assets Products' && cursorPosition === 'branch id'
                  ? e => FilterData(systemBranches.splice(0, 3), e.target.value, cursorPosition, 'currentName')
                  : currenTComp === 'Fixed Assets Products' && cursorPosition === 'product id'
                    ? e => FilterData(fixedAssetsPrdt, e.target.value, cursorPosition, 'currentName')
                    : currenTComp === 'Fixed Assets Products' && multiCondition
                      ? e => FilterData(generalLedgerIds, e.target.value, cursorPosition, 'currentName')
                      : null
            }
            type="text"
          />
        </div>
      </div>
      <div className="transaction-codes-modal-grid-outer">
        <div className="transaction-codes-modal-grid-outer-top">
          { currenTComp === 'Transaction Codes' ? 'Transaction Codes:'
            : currenTComp === 'Fixed Assets Products'
            && multiCondition ? 'Product Details:'
              : currenTComp === 'Fixed Assets Products'
            && cursorPosition === 'Set ID' ? 'Branch Set Information'
                : currenTComp === 'Fixed Assets Products'
            && cursorPosition === 'product id' ? 'Product Details'
                  : currenTComp === 'Fixed Assets Products'
            && cursorPosition === 'branch id' ? 'Branch Information' : null}
        </div>
        {
            multiCondition ? (
              <div className="transaction-codes-modal-grid-header-container-production">
                <div className="transaction-codes-modal-grid-header-grid">
                  { currenTComp === 'Transaction Codes' ? 'TranCode:'
                    : currenTComp === 'Fixed Assets Products' ? 'GLID:' : null}
                </div>
                <div className="transaction-codes-modal-grid-header-grid">
                  { currenTComp === 'Transaction Codes' ? 'Narration:'
                    : currenTComp === 'Fixed Assets Products' ? 'GLName:' : null}
                </div>
                <div className="transaction-codes-modal-grid-header-grid">
                  { currenTComp === 'Transaction Codes' ? 'Narration:'
                    : currenTComp === 'Fixed Assets Products' ? 'GLType:' : null}
                </div>
              </div>
            ) : cursorPosition === 'Set ID' ? (
              <div className="transaction-codes-modal-grid-header-container">
                <div className="transaction-codes-modal-grid-header-grid">
                  { currenTComp === 'Transaction Codes' ? 'TranCode:'
                    : currenTComp === 'Fixed Assets Products' ? 'SetID:' : null}
                </div>
                <div className="transaction-codes-modal-grid-header-grid">
                  { currenTComp === 'Transaction Codes' ? 'Narration:'
                    : currenTComp === 'Fixed Assets Products' ? 'SetName:' : null}
                </div>
              </div>
            ) : cursorPosition === 'branch id' ? (
              <div className="transaction-codes-modal-grid-header-container">
                <div className="transaction-codes-modal-grid-header-grid">
                  { currenTComp === 'Fixed Assets Products' ? 'BranchID:' : null}
                </div>
                <div className="transaction-codes-modal-grid-header-grid">
                  { currenTComp === 'Fixed Assets Products' ? 'BranchName:' : null}
                </div>
              </div>
            ) : (
              <div className="transaction-codes-modal-grid-header-container">
                <div className="transaction-codes-modal-grid-header-grid">
                  { currenTComp === 'Transaction Codes' ? 'TranCode:'
                    : currenTComp === 'Fixed Assets Products' ? 'ProductID:' : null}
                </div>
                <div className="transaction-codes-modal-grid-header-grid">
                  { currenTComp === 'Transaction Codes' ? 'Narration:'
                    : currenTComp === 'Fixed Assets Products' ? 'ProductName:' : null}
                </div>
              </div>
            )
        }
        <div className="transaction-codes-modal-grid-content-container">
          {
                (currenTComp === 'Transaction Codes' ? transactionCodesUpdate
                  : currenTComp === 'Fixed Assets Products' && cursorPosition === 'Set ID' ? systemBranches
                    : currenTComp === 'Fixed Assets Products' && cursorPosition === 'branch id'
                      ? systemBranches.splice(0, 3)
                      : currenTComp === 'Fixed Assets Products' && cursorPosition === 'product id' ? fixedAssetsPrdtUpdate
                        : currenTComp === 'Fixed Assets Products' && multiCondition ? generalLedgerIdsUpdate
                          : []).map(code => (
                  multiCondition ? (
                    <div
                      onClick={() => setCurrentCode(code, cursorPosition)}
                      key={code.tranCode}
                      className="transaction-codes-modal-grid-content-container-inner-product"
                    >
                      <div className="transaction-codes-modal-grid-header-grid">
                        { currenTComp === 'Fixed Assets Products' ? code.glid : null}
                      </div>
                      <div className="transaction-codes-modal-grid-header-grid">
                        { currenTComp === 'Fixed Assets Products'
                          ? (code.glName.length < 15 ? (code.glName)
                            : (`${code.glName.substring(0, 15)} ...`)) : null}
                      </div>
                      <div className="transaction-codes-modal-grid-header-grid">
                        { currenTComp === 'Fixed Assets Products' ? code.glType : null}
                      </div>
                    </div>
                  ) : cursorPosition === 'Set ID' ? (
                    <div
                      onClick={() => setCurrentCode(code, cursorPosition)}
                      key={code.setID}
                      className="transaction-codes-modal-grid-content-container-inner"
                    >
                      <div className="transaction-codes-modal-grid-header-grid">
                        { currenTComp === 'Fixed Assets Products' ? code.setID : null}
                      </div>
                      <div className="transaction-codes-modal-grid-header-grid">
                        { currenTComp === 'Fixed Assets Products' ? code.setName : null}
                      </div>
                    </div>
                  ) : cursorPosition === 'branch id' ? (
                    <div
                      onClick={() => setCurrentCode(code, cursorPosition)}
                      key={code.tranCode}
                      className="transaction-codes-modal-grid-content-container-inner"
                    >
                      <div className="transaction-codes-modal-grid-header-grid">
                        { currenTComp === 'Fixed Assets Products' ? code.setID : null}
                      </div>
                      <div className="transaction-codes-modal-grid-header-grid">
                        { currenTComp === 'Fixed Assets Products' ? code.setName : null}
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => setCurrentCode(code, cursorPosition)}
                      key={code.tranCode}
                      className="transaction-codes-modal-grid-content-container-inner"
                    >
                      <div className="transaction-codes-modal-grid-header-grid">
                        {currenTComp === 'Transaction Codes' ? code.tranCode
                          : currenTComp === 'Fixed Assets Products' ? code.productID : null}
                      </div>
                      <div className="transaction-codes-modal-grid-header-grid">
                        {currenTComp === 'Transaction Codes' ? code.narration
                          : currenTComp === 'Fixed Assets Products' ? code.productName : null}
                      </div>
                    </div>
                  )
                ))
            }
        </div>
      </div>
    </div>
    ) : null;
};

export default TrCodesModal;
