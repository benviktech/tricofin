import React from 'react';
import Spinner from '../../../Spinner/Spinner';
import Sidebar from '../SecuritySideBar';
import './index.css';

function Loader({ headerText }) {
  return (
    <div className="view-individual-customer-form">
      <div className="system-lower-form-section">
        <div className="system-maintenance-customer-info">
          <span>{headerText}</span>
        </div>
        <div className="security-lower-downer-section">
          <div className="left-inner-form-section update-side-loader-height">
            <Sidebar />
          </div>
          <div className="security-submit-form-top-section loader-middle-section">
            <div className="loader-middle-section-spinner">
              <Spinner />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
