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

  return (
    <div className="transaction-codes-modal shadow">
      <div className="transaction-codes-modal-header-section">
        Enter the Search Criteria
        <i onClick={() => setModal(false)} className="far fa-times-circle" />
      </div>
      <div className="transaction-codes-modal-inputs-section">
        <div className="transaction-codes-modal-inputs-inner">
          <div className="transaction-codes-modal-inputs-label">
            { currenTComp === 'Transaction Codes' ? 'Tran Code:'
              : currenTComp === 'Fixed Assets Products' ? 'Product Id:' : null}
          </div>
          <input type="text" />
        </div>
        <div className="transaction-codes-modal-inputs-inner">
          <div className="transaction-codes-modal-inputs-label">
            { currenTComp === 'Transaction Codes' ? 'Tran Naration:'
              : currenTComp === 'Fixed Assets Products' ? 'Product Name:' : null}
          </div>
          <input type="text" />
        </div>
      </div>
      <div className="transaction-codes-modal-grid-outer">
        <div className="transaction-codes-modal-grid-outer-top">
          { currenTComp === 'Transaction Codes' ? 'Transaction Codes:'
            : currenTComp === 'Fixed Assets Products' ? 'Product Details:' : null}
        </div>
        {
          cursorPosition === 'control gl'
          || cursorPosition === 'Accum Drep'
          || cursorPosition === 'Dep Expense'
          || cursorPosition === 'Saleoff Loss'
          || cursorPosition === 'Saleoff Profit' ? (
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
                (currenTComp === 'Transaction Codes'
                  ? transactionCodes
                  : currenTComp === 'Fixed Assets Products'
                    ? generalLedgerIds : null).map(code => (
                  cursorPosition === 'control gl'
                      || cursorPosition === 'Accum Drep'
                      || cursorPosition === 'Dep Expense'
                      || cursorPosition === 'Saleoff Loss'
                      || cursorPosition === 'Saleoff Profit' ? (
                        <div
                          onClick={() => setCurrentCode(code, cursorPosition)}
                          key={code.tranCode}
                          className="transaction-codes-modal-grid-content-container-inner-product"
                        >
                          <div className="transaction-codes-modal-grid-header-grid">
                            {currenTComp === 'Transaction Codes' ? code.tranCode
                              : currenTComp === 'Fixed Assets Products' ? code.glid : null}
                          </div>
                          <div className="transaction-codes-modal-grid-header-grid">
                            {currenTComp === 'Transaction Codes' ? code.narration
                              : currenTComp === 'Fixed Assets Products'
                                ? (code.glName.length < 15 ? (code.glName)
                                  : (`${code.glName.substring(0, 15)} ...`)) : null}
                          </div>
                          <div className="transaction-codes-modal-grid-header-grid">
                            {currenTComp === 'Transaction Codes' ? code.narration
                              : currenTComp === 'Fixed Assets Products' ? code.glType : null}
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
  );
};

export default TrCodesModal;
