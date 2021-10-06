/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import './index.css';
import { TransactionsSidebar } from '../../Sidebar/Sidebar';

const Transaction = () => {
  console.log('transactions pages');
  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Bulk Verify GL Accounts</span>
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
              <div className="cash-traction-top-section-grid">
                <span> PartTranType: </span>
                {' '}
                <select>
                  <option value="val">val</option>
                  <option value="val">val</option>
                </select>
              </div>
              <div className="cash-traction-top-section-grid">
                <span> AcctType: </span>
                {' '}
                <select>
                  <option value="val">val</option>
                  <option value="val">val</option>
                </select>
              </div>
              <div className="cash-traction-top-section-grid">
                <span> Tran#: </span>
                <input type="text" />
              </div>
              <div className="cash-traction-top-section-grid">
                <span> Tran#: </span>
                <input type="text" />
              </div>
            </div>
            <div className="cash-transaction-middle-section">
              <div className="left-cash-transaction-middle-section">
                <div className="left-cash-transaction-middle-section-inner">
                  <div className="left-cash-transaction-middle-section-title">Account Id:</div>
                  <input type="text" />
                  <div className="left-cash-transaction-middle-section-text">BAGENDA REUBEN</div>
                </div>
                <div className="left-cash-transaction-middle-section-inner">
                  <div className="left-cash-transaction-middle-section-title">Branch:</div>
                  <div className="left-cash-transaction-middle-section-id-name">Nasana</div>
                  <div className="left-cash-transaction-middle-section-text">BAGENDA REUBEN</div>
                </div>
                <div className="left-cash-transaction-middle-section-inner">
                  <div className="left-cash-transaction-middle-section-title">Product:</div>
                  <div className="left-cash-transaction-middle-section-id-name">Nasana</div>
                  <div className="left-cash-transaction-middle-section-text">BAGENDA REUBEN</div>
                </div>
                <div className="left-cash-transaction-middle-receipt-date">
                  <div className="left-cash-transaction-middle-reciept-title">Receipt#.</div>
                  <input type="text" />
                  <div className="left-cash-transaction-middle-value-date">
                    <div className="inner-value-date">Value Date:</div>
                    <input type="date" />
                  </div>
                </div>
              </div>
              <div className="right-cash-transaction-middle-section">
                <div className="right-cash-transaction-middle-section-inner">
                  <div className="right-cash-transaction-middle-section-title">TranCode:</div>
                  <input type="text" />
                  <div className="right-cash-transaction-middle-section-text">BAGENDA REUBEN</div>
                </div>
                <div className="right-cash-transaction-middle-section-inner-remarks">
                  <div className="right-cash-transaction-middle-section-title-remarks">Tran Remarks:</div>
                  <input type="text" />
                </div>
                <div className="right-cash-transaction-middle-section-inner-remarks">
                  <div className="right-cash-transaction-middle-section-title-remarks">Amount:</div>
                  <input type="text" />
                </div>
                <div className="cash-transaction-buttons-section">
                  <button type="button">Add</button>
                  <button type="button">Edit</button>
                  <button type="button">Save</button>
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
