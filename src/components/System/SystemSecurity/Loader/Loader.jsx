import React from 'react';
import Spinner from '../../../Spinner/Spinner';
import Sidebar from '../SecuritySideBar';
import './index.css';

function Loader({ headerText }) {
  return (
    <div className="view-individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>{headerText}</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section update-side-loader-height">
            <Sidebar />
          </div>
          <div className="submit-form-top-section loader-middle-section">
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
