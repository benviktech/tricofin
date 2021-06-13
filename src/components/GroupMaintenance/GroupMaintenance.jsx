/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import { GroupMaintenanceSidebar } from '../Sidebar/Sidebar';
import './index.css';
import MoreInfo from './MoreInfo';

const GroupMaintenance = () => (
  <div className="individual-customer-form">
    <div className="lower-form-section">
      <div className="maintenance-customer-info">
        <span>Customer Information</span>
      </div>
      <div className="lower-downer-section">
        <div className="left-inner-form-section">
          <GroupMaintenanceSidebar />
        </div>
        <div className="submit-form-top-section">
          <form className="main-form-color boder">
            <div className="left-section">
              <div className="horizontal-section">
                <div className="left-horizontal-section">Search Group Name:</div>
                <div className="right-horizontal-section">
                  <input type="text" />
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">
                  Formation Date
                  <span className="text-danger mx-1">
                    *
                  </span>
                  :
                </div>
                <div className="right-horizontal-section">
                  <div className="inner-left-section">
                    <input type="date" />
                  </div>
                  <div className="inner-right-section">
                    <div className="inner-right-label">
                      Reg Date
                      <span className="text-danger mx-1">
                        *
                      </span>
                      :
                    </div>
                    <div className="inner-right-input">
                      <input type="date" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">
                  Location
                  <span className="text-danger mx-1">
                    *
                  </span>
                  :
                </div>
                <div className="right-horizontal-section">
                  <div className="inner-left-section">
                    <input type="text" />
                  </div>
                  <div className="inner-right-section">
                    <div className="inner-right-label">
                      Reg No
                      <span className="text-danger mx-1">
                        *
                      </span>
                      :
                    </div>
                    <div className="inner-right-input">
                      <input type="text" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">
                  Village
                  <span className="text-danger mx-1">
                    *
                  </span>
                  :
                </div>
                <div className="right-horizontal-section">
                  <input type="text" />
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">Sourced By :</div>
                <div className="right-horizontal-section">
                  <input type="text" />
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">
                  Credit Officer
                  <span className="text-danger mx-1">
                    *
                  </span>
                  :
                </div>
                <div className="right-horizontal-section">
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="right-section">
              <div className="horizontal-section">
                <div className="left-horizontal-section">
                  Savings Product
                  <span className="text-danger mx-1">
                    *
                  </span>
                  :
                </div>
                <div className="right-horizontal-section">
                  <input type="text" />
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">
                  Loan Product
                  <span className="text-danger mx-1">
                    *
                  </span>
                  :
                </div>
                <div className="right-horizontal-section">
                  <input type="text" />
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">
                  Max Members Allowed
                  <span className="text-danger mx-1">
                    *
                  </span>
                  :
                </div>
                <div className="right-horizontal-section">
                  <div className="inner-left-section">
                    <input type="text" />
                  </div>
                  <div className="inner-right-section">
                    <div className="inner-right-label members-number">
                      Min Members for Loan Disburesment
                      <span className="text-danger mx-1">
                        *
                      </span>
                      :
                    </div>
                    <div className="inner-right-input">
                      <input type="text" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">
                  Meeting Day
                  <span className="text-danger mx-1">
                    *
                  </span>
                  :
                </div>
                <div className="right-horizontal-section">
                  <div className="inner-left-section select-section">
                    <select
                      className="form-control-input"
                      name="title"
                    >
                      <option value="" disabled selected hidden>Select</option>
                      <option value="one">Select</option>
                      <option value="two">Select</option>
                    </select>
                  </div>
                  <div className="inner-right-section select-section-two">
                    <div className="inner-right-label">
                      Meeting Frequency
                      <span className="text-danger mx-1">
                        *
                      </span>
                      :
                    </div>
                    <div className="inner-right-input">
                      <select
                        className="form-control-input"
                        name="title"
                      >
                        <option value="" disabled selected hidden>Select</option>
                        <option value="one">Select</option>
                        <option value="two">Select</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">
                  Meeting Place
                  <span className="text-danger mx-1">
                    *
                  </span>
                  :
                </div>
                <div className="right-horizontal-section">
                  <input type="text" />
                </div>
              </div>

              <div className="submit-button-section">
                <button
                  type="submit"
                  className="add-customer-btn"
                >
                  Add
                </button>
                <button
                  type="button"
                  className="add-customer-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
          <MoreInfo />
        </div>
      </div>
    </div>
  </div>
);

export default GroupMaintenance;
