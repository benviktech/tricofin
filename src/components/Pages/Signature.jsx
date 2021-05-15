import React from 'react';
import ModalFunction from '../Modal/ModalFunction';
import Modal from '../Modal/Modal';
import Sidebar from '../Sidebar/Sidebar';
import MoreInfo from '../Customer/MoreInfo';
import '../Customer/index.css';

const Signature = () => {
  const {
    modalCloser, modalOpener, openModel, modalText,
  } = ModalFunction();

  return (
    <div className="individual-customer-form">
      <Modal
        modalText={modalText}
        modalCloser={modalCloser}
        openModel={openModel}
      />
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
              <p>Signature section</p>
            </div>
            <MoreInfo modalOpener={modalOpener} />
          </div>
        </div>
      </div>
    </div>

  );
};

export default Signature;
