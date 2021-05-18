import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import '../Customer/index.css';

const ContactInfo = () => (
  <div className="individual-customer-form">
    <div className="lower-form-section">
      <div className="maintenance-customer-info">
        <span>Customer Signature and Photo Section</span>
      </div>
      <div className="lower-downer-section">
        <div className="left-inner-form-section">
          <Sidebar />
        </div>
        <div className="submit-form-top-section">
          <div className="signature-section">
            <p>Contact Info section</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ContactInfo;
