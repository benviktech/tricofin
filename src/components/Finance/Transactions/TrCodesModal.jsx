/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrCodesModal = ({
  setModal, setCurrentCode, currenTComp, cursorPosition,
}) => {
  const [transactionCodes, setTransactionCodes] = useState([]);
  const [generalLedgerIds, setGeneralLedgerIds] = useState([]);
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

  const systemBranches = [{ setID: '000', setName: 'Head Office' },
    { setID: '001', setName: 'Nansana' },
    { setID: '002', setName: 'Rugika' },
    { setID: 'ALL', setName: 'All Branches' },
    { setID: 'OPN', setName: 'Operational Branch' }];

  const multiCondition = (cursorPosition === 'control gl' || cursorPosition === 'Accum Drep'
    || cursorPosition === 'Dep Expense' || cursorPosition === 'Saleoff Loss'
    || cursorPosition === 'Saleoff Profit');

  return currenTComp === 'Transaction Codes'
  || (currenTComp === 'Fixed Assets Products' && multiCondition)
  || (currenTComp === 'Fixed Assets Products' && cursorPosition === 'Set ID') ? (
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
              && cursorPosition === 'Set ID' ? 'Set ID' : null}
          </div>
          <input type="text" />
        </div>
        <div className="transaction-codes-modal-inputs-inner">
          <div className="transaction-codes-modal-inputs-label">
            { currenTComp === 'Transaction Codes' ? 'Tran Naration:'
              : currenTComp === 'Fixed Assets Products'
              && multiCondition ? 'Product Name:'
                : currenTComp === 'Fixed Assets Products'
              && cursorPosition === 'Set ID' ? 'Set Name' : null}
          </div>
          <input type="text" />
        </div>
      </div>
      <div className="transaction-codes-modal-grid-outer">
        <div className="transaction-codes-modal-grid-outer-top">
          { currenTComp === 'Transaction Codes' ? 'Transaction Codes:'
            : currenTComp === 'Fixed Assets Products'
            && multiCondition ? 'Product Details:'
              : currenTComp === 'Fixed Assets Products'
            && cursorPosition === 'Set ID' ? 'Branch Set Information' : null}
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
                (currenTComp === 'Transaction Codes' ? transactionCodes
                  : currenTComp === 'Fixed Assets Products' && cursorPosition === 'Set ID'
                    ? systemBranches : currenTComp === 'Fixed Assets Products'
                  && multiCondition ? generalLedgerIds : []).map(code => (
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
                  ) : (
                    <div
                      onClick={() => setCurrentCode(code)}
                      key={code.tranCode}
                      className="transaction-codes-modal-grid-content-container-inner"
                    >
                      <div className="transaction-codes-modal-grid-header-grid">
                        {currenTComp === 'Transaction Codes' ? code.tranCode
                          : currenTComp === 'Fixed Assets Products' ? code.glid : null}
                      </div>
                      <div className="transaction-codes-modal-grid-header-grid">
                        {currenTComp === 'Transaction Codes' ? code.narration
                          : currenTComp === 'Fixed Assets Products' ? code.glName : null}
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
