/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrCodesModal = ({ setModal, setCurrentCode }) => {
  const [transactionCodes, setTransactionCodes] = useState([]);
  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/Finance/GetTransactionCodes')
      .then(response => setTransactionCodes(response?.data))
      .catch(error => console.log(error.message));
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
            Tran Code:
          </div>
          <input type="text" />
        </div>
        <div className="transaction-codes-modal-inputs-inner">
          <div className="transaction-codes-modal-inputs-label">
            Tran Naration:
          </div>
          <input type="text" />
        </div>
      </div>
      <div className="transaction-codes-modal-grid-outer">
        <div className="transaction-codes-modal-grid-outer-top">
          Transaction Codes
        </div>
        <div className="transaction-codes-modal-grid-header-container">
          <div className="transaction-codes-modal-grid-header-grid">TranCode</div>
          <div className="transaction-codes-modal-grid-header-grid">Narration</div>
        </div>
        <div className="transaction-codes-modal-grid-content-container">
          {
                transactionCodes.map(code => (
                  <div onClick={() => setCurrentCode(code)} key={code.tranCode} className="transaction-codes-modal-grid-content-container-inner">
                    <div className="transaction-codes-modal-grid-header-grid">{code.tranCode}</div>
                    <div className="transaction-codes-modal-grid-header-grid">{code.narration}</div>
                  </div>
                ))
            }
        </div>
      </div>
    </div>
  );
};

export default TrCodesModal;
