import React from 'react';

const TransactionCodes = () => (
  <div className="individual-customer-form">
    <div className="lower-form-section">
      <div className="maintenance-customer-info-lg">
        <span>Transaction Code Maintenance</span>
      </div>
      <div className="transaction-codes-main-section">
        <div className="transaction-codes-main-section-top">
          <div className="transaction-codes-main-section-left">
            <div className="transaction-codes-main-section-top-label">TranCode:</div>
            <input type="text" />
            <div className="transaction-codes-main-section-div-section">value</div>
          </div>
          <div className="transaction-codes-main-section-right">
            <div className="transaction-codes-main-section-right-label">IsSys:</div>
            <input style={{ height: '20px', width: '20px' }} type="checkbox" />
          </div>
        </div>
        <div className="transaction-codes-main-section-middle">
          <div className="transaction-codes-main-section-middle-inner">
            <div className="transaction-codes-main-section-middle-label">Trx Type:</div>
            <select>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
            </select>
          </div>
          <div className="transaction-codes-main-section-middle-inner">
            <div className="transaction-codes-main-section-middle-label">Tran Category:</div>
            <select>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
            </select>
          </div>
          <div className="transaction-codes-main-section-middle-inner">
            <div className="transaction-codes-main-section-middle-label">Tran Type:</div>
            <select>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
            </select>
          </div>
          <div className="transaction-codes-main-section-middle-inner">
            <div className="transaction-codes-main-section-middle-label">Attach To:</div>
            <select>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
            </select>
          </div>
          <div className="transaction-codes-main-section-middle-inner">
            <div className="transaction-codes-main-section-middle-label">Charge Type:</div>
            <select>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
            </select>
          </div>
        </div>
        <div className="transaction-codes-main-section-bottom-behind-scenes">
          Behind the Scene
        </div>
        <div className="transaction-codes-main-section-middle transaction-codes-main-section-bottom">
          <div className="transaction-codes-main-section-middle-inner">
            <div className="transaction-codes-main-section-middle-label">Trx Type:</div>
            <input type="text" />
          </div>
          <div className="transaction-codes-main-section-middle-inner">
            <div className="transaction-codes-main-section-middle-label">Tran Category:</div>
            <input type="text" />
          </div>
          <div className="transaction-codes-main-section-middle-inner">
            <div className="transaction-codes-main-section-middle-label">Tran Type:</div>
            <select>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
            </select>
          </div>
          <div className="transaction-codes-main-section-middle-inner">
            <div className="transaction-codes-main-section-middle-label">Attach To:</div>
            <select>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
              <option value="VAAL">VAL</option>
            </select>
          </div>
        </div>
        <div className="transaction-codes-main-section-buttons">
          <button type="button">Add</button>
          <button type="button">Edit</button>
          <button type="button">Save</button>
          <button type="button">Cancel</button>
          <button type="button">Delete</button>
        </div>
      </div>
    </div>
  </div>
);

export default TransactionCodes;
