import React from 'react';
import { GroupMaintenanceSidebar } from '../Sidebar/Sidebar';
import './index.css';
import MoreInfo from './MoreInfo';

const GroupMaintenanceView = () => (
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
          <div className="main-form-color boder">
            <div className="left-section">
              <div className="horizontal-section">
                <div className="left-horizontal-section">Search Group Name:</div>
                <div className="right-horizontal-section">
                  <div className="information-section">
                    information
                  </div>
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">Formation Date:</div>
                <div className="right-horizontal-section">
                  <div className="inner-left-section">
                    <div className="information-section">
                      information
                    </div>
                  </div>
                  <div className="inner-right-section">
                    <div className="inner-right-label">Reg Date :</div>
                    <div className="inner-right-input">
                      <div className="information-section">
                        information
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">Location :</div>
                <div className="right-horizontal-section">
                  <div className="inner-left-section">
                    <div className="information-section">
                      information
                    </div>
                  </div>
                  <div className="inner-right-section">
                    <div className="inner-right-label">Reg No :</div>
                    <div className="inner-right-input">
                      <div className="information-section">
                        information
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">Village :</div>
                <div className="right-horizontal-section">
                  <div className="information-section">
                    information
                  </div>
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">Sourced By :</div>
                <div className="right-horizontal-section">
                  <div className="information-section-left">
                    information
                  </div>
                  <div className="information-section">
                    information
                  </div>
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">Credit Officer :</div>
                <div className="right-horizontal-section">
                  <div className="information-section-left">
                    information
                  </div>
                  <div className="information-section">
                    information
                  </div>
                </div>
              </div>
            </div>
            <div className="right-section">
              <div className="horizontal-section">
                <div className="left-horizontal-section">Savings Product :</div>
                <div className="right-horizontal-section">
                  <div className="information-section-left">
                    information
                  </div>
                  <div className="information-section">
                    information
                  </div>
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">Loan Product :</div>
                <div className="right-horizontal-section">
                  <div className="information-section-left">
                    information
                  </div>
                  <div className="information-section">
                    information
                  </div>
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">Max Members Allowed :</div>
                <div className="right-horizontal-section">
                  <div className="inner-left-section">
                    <div className="information-section">
                      information
                    </div>
                  </div>
                  <div className="inner-right-section">
                    <div className="inner-right-label members-number">
                      Min Members for Loan Disburesment
                    </div>
                    <div className="inner-right-input">
                      <div className="information-section">
                        information
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">Meeting Day :</div>
                <div className="right-horizontal-section">
                  <div className="inner-left-section select-section">
                    <div className="information-section">
                      information
                    </div>
                  </div>
                  <div className="inner-right-section select-section-two">
                    <div className="inner-right-label">Meeting Frequency :</div>
                    <div className="inner-right-input">
                      <div className="information-section">
                        information
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="horizontal-section">
                <div className="left-horizontal-section">Meeting Place :</div>
                <div className="right-horizontal-section">
                  <div className="information-section">
                    information
                  </div>
                </div>
              </div>

              <div className="submit-button-section">
                <button
                  type="button"
                  className="add-customer-btn"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <MoreInfo />
        </div>
      </div>
    </div>
  </div>
);

export default GroupMaintenanceView;
