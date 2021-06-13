/* eslint-disable  jsx-a11y/click-events-have-key-events */
/* eslint-disable  jsx-a11y/no-static-element-interactions */
/* eslint-disable  react/prop-types */

import React from 'react';

const MoreInfo = () => (
  <div className="upper-bottom-section">
    <div className="span">More Informations</div>
    <div className="bottom-form-section pt-3">
      <div className="left-bottom-section">
        <div className="lower-horizontal-section">
          <div className="lower-label-section">Total Members:</div>
          <div className="lower-input-section">
            <input type="text" />
          </div>
        </div>
        <div className="lower-horizontal-section">
          <div className="lower-label-section">Total Savings A/Cs:</div>
          <div className="lower-input-section">
            <input type="text" />
          </div>
        </div>
        <div className="lower-horizontal-section">
          <div className="lower-label-section">Total Loans A/Cs:</div>
          <div className="lower-input-section">
            <input type="text" />
          </div>
        </div>
      </div>
      <div className="right-bottom-section">
        <div className="lower-horizontal-section">
          <div className="lower-label-section">Total Loan Amount:</div>
          <div className="lower-input-section">
            <input type="text" />
          </div>
        </div>
        <div className="lower-horizontal-section">
          <div className="lower-label-section">Total Savings Bal:</div>
          <div className="lower-input-section">
            <input type="text" />
          </div>
        </div>
        <div className="lower-horizontal-section">
          <div className="lower-label-section">Total Loan Bal:</div>
          <div className="lower-input-section">
            <input type="text" />
          </div>
        </div>
      </div>
      <div className="right-bottom-section">
        <div className="lower-horizontal-section">
          <div className="lower-label-section">Total O/S Interest:</div>
          <div className="lower-input-section">
            <input type="text" />
          </div>
        </div>
        <div className="lower-horizontal-section">
          <div className="lower-label-section">Total O/S Principal:</div>
          <div className="lower-input-section">
            <input type="text" />
          </div>
        </div>
        <div className="lower-horizontal-section">
          <div className="lower-label-section">Chair Person:</div>
          <div className="lower-input-section">
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MoreInfo;
