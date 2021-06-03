import React from 'react';
import ModalFunction from '../Modal/ModalFunction';
import Spinner from '../Spinner/Spinner';
import Modal from '../Modal/Modal';
import { Sidebar } from '../Sidebar/Sidebar';
import MoreInfo from '../Customer/MoreInfo';
import '../Customer/index.css';
import './index.css';

function Loader() {
  const {
    modalCloser, modalOpener, openModel, modalText,
  } = ModalFunction();
  return (
    <div className="view-individual-customer-form">
      <Modal
        modalText={modalText}
        modalCloser={modalCloser}
        openModel={openModel}
      />
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>View Customer Personal Information</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section update-side-loader-height">
            <Sidebar />
          </div>
          <div className="submit-form-top-section loader-middle-section">
            <div className="loader-middle-section-spinner">
              <Spinner />
            </div>
            <div className="loader-middle-section-modal">
              <MoreInfo modalOpener={modalOpener} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
