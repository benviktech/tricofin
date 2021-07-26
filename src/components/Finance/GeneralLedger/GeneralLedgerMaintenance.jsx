import React, { useEffect } from 'react';
import { GeneralLedgerSidebar } from '../../Sidebar/Sidebar';
import './index.css';
import Modal from './Modal';

const GeneralLedgerMaintenance = () => {
  useEffect(() => {
    console.log('General ledger component');
  }, []);
  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>GL Information</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <GeneralLedgerSidebar />
          </div>
          <div className="submit-form-top-section">
            <form className="ledger-form ">
              <div className="left-form-section">
                <div className="ledger-account">
                  <div className="span-section">
                    <span>GL Account ID:</span>
                  </div>
                  <div className="input-section">
                    <input type="text" />
                  </div>
                </div>
                <div className="ledger-account">
                  <div className="span-section">
                    <span>Branch:</span>
                  </div>
                  <div className="input-section">
                    <input type="text" />
                  </div>
                </div>
                <div className="ledger-account">
                  <div className="span-section">
                    <span>GL ID:</span>
                  </div>
                  <div className="input-section">
                    <input type="text" />
                  </div>
                </div>
                <div className="ledger-account">
                  <div className="span-section">
                    <span>GL Types:</span>
                  </div>
                  <div className="input-section">
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="right-form-section">
                <div className="ledger-subtypes">
                  <div className="right-span-section">
                    <span>GL Sub Type:</span>
                  </div>
                  <div className="right-input-section">
                    <input type="text" />
                  </div>
                </div>
                <div className="ledger-subtypes">
                  <div className="right-span-section">
                    <span>GL Account Exist in all Branches:</span>
                  </div>
                  <div className="right-input-section">
                    <input type="text" />
                  </div>
                </div>
                <div className="button-section">
                  <div className="add-button">
                    <button type="submit">Add</button>
                  </div>
                  <div className="cancel-button">
                    <button type="button">Cancel</button>
                  </div>
                </div>
              </div>
            </form>
            <Modal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralLedgerMaintenance;
