/* eslint-disable react/prop-types */

import React from 'react';
import './index.css';

const initialProp = {
  balance: 0.00,
  unSupervisedCredit: 0.00,
  unSupervisedDebit: 0.00,
  creditTurnOver: 0.00,
  debitTurnOver: 0.00,
};

const Modal = ({ generalLedger }) => {
  const newData = { ...initialProp, ...generalLedger };
  return (
    <div className="behind-the-scenes">
      <div className="scenes-top-section">
        Behind the Scenes
      </div>
      <div className="scenes-bottom">
        <div className="left-scenes-section">
          <div className="each-scene">
            <div className="scenes-span">
              Balance:
            </div>
            <div className="scenes-details">
              <span className="mr-2">{newData.balance}</span>
            </div>
          </div>
          <div className="each-scene">
            <div className="scenes-span">
              Un supervised CR:
            </div>
            <div className="scenes-details">
              <span className="mr-2">{newData.unSupervisedCredit}</span>
            </div>
          </div>
          <div className="each-scene">
            <div className="scenes-span">
              Un supervised DR:
            </div>
            <div className="scenes-details">
              <span className="mr-2">{newData.unSupervisedDebit}</span>
            </div>
          </div>
        </div>
        <div className="right-scenes-section">
          <div className="each-scene">
            <div className="scenes-span">
              CR TurnOver:
            </div>
            <div className="scenes-details">
              <span className="mr-2">{newData.creditTurnOver}</span>
            </div>
          </div>
          <div className="each-scene">
            <div className="scenes-span">
              DR TurnOver:
            </div>
            <div className="scenes-details">
              <span className="mr-2">{newData.debitTurnOver}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
