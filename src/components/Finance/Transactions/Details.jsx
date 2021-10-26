/* eslint-disable react/prop-types */

import React from 'react';

export const CashierDetails = ({ creditSum, debitSum }) => {
  console.log('cashier details');

  return (
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
            <div className="cashier-details-inner-text-cross-first">{debitSum}</div>
            <div className="cashier-details-inner-text-cross"> + </div>
          </div>
        </div>
        <div className="cashier-details-section-account-title">
          <div className="cashier-details-inner-title-lower">Total Credit:</div>
          <div className="cashier-details-inner-text-lower">
            <div className="cashier-details-inner-text-cross-first">{creditSum}</div>
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
  );
};

export const AccountDetails = ({ currentAccount }) => (
  <div className="cashier-details-section">
    <div className="cashier-details-header">Account Details</div>
    <div className="cashier-details-section-account-details">
      <div className="cashier-details-section-account-title">
        <div className="cashier-details-inner-title-lower">Clear Balance:</div>
        <div className="cashier-details-inner-text-lower">
          <div className="cashier-details-inner-text-cross-first">
            { currentAccount.clearBalance ? currentAccount.clearBalance : 0}
          </div>
        </div>
      </div>
      <div className="cashier-details-section-account-title">
        <div className="cashier-details-inner-title-lower">Lien Amount:</div>
        <div className="cashier-details-inner-text-lower">
          <div className="cashier-details-inner-text-cross-first">
            { currentAccount.lienAmount ? currentAccount.lienAmount : 0}
          </div>
        </div>
      </div>
      <div className="cashier-details-section-account-title">
        <div className="cashier-details-inner-title-lower">Frozen Amount:</div>
        <div className="cashier-details-inner-text-lower">
          <div className="cashier-details-inner-text-cross-first">
            { currentAccount.frozenAmount ? currentAccount.frozenAmount : 0}
          </div>
        </div>
      </div>
    </div>
    <div className="cashier-details-section-account-details">
      <div className="cashier-details-section-account-title">
        <div className="cashier-details-inner-title-lower">Available Bal:</div>
        <div className="cashier-details-inner-text-lower">
          <div className="cashier-details-inner-text-cross-first">
            { currentAccount.balance ? currentAccount.balance : 0}
          </div>
        </div>
      </div>
      <div className="cashier-details-section-account-title">
        <div className="cashier-details-inner-title-lower">UnSupervisedCR:</div>
        <div className="cashier-details-inner-text-lower">
          <div className="cashier-details-inner-text-cross-first">
            { currentAccount.unSupervisedCredit ? currentAccount.unSupervisedCredit : 0}
          </div>
        </div>
      </div>
      <div className="cashier-details-section-account-title">
        <div className="cashier-details-inner-title-lower">UnSupervisedDR:</div>
        <div className="cashier-details-inner-text-lower">
          <div className="cashier-details-inner-text-cross-first">
            { currentAccount.unSupervisedDebit ? currentAccount.unSupervisedDebit : 0}
          </div>
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
);
