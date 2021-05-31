/* eslint-disable  jsx-a11y/click-events-have-key-events */
/* eslint-disable  jsx-a11y/no-static-element-interactions */
/* eslint-disable  react/prop-types */

import React from 'react';

const MoreInfo = ({ modalOpener }) => (
  <div className="upper-bottom-section">
    <div className="span">More Informations</div>
    <div className="bottom-form-section pt-3">
      <div className="form-group d-flex ml-2">
        <div className="left-form-group-division">
          <div className="left-form-group-div" htmlFor="customerId">Loan Balance:</div>
          <div className="form-control-div border">
            0.00
          </div>
          <div className="icon-section">
            <i
              onClick={() => modalOpener('Loan Balance')}
              className="fas fa-plus-square"
            />
          </div>
        </div>
      </div>
      <div className="form-group d-flex  ml-2">
        <div className="left-form-group-division">
          <div className="left-form-group-div" htmlFor="customerId">shares Balance:</div>
          <div className="form-control-div border">
            0.00
          </div>
          <div className="icon-section">
            <i
              onClick={() => modalOpener('Shares Balance')}
              className="fas fa-plus-square"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MoreInfo;
