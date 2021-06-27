import React from 'react';
import ModalFunction from '../Modal/ModalFunction';
import Modal from '../Modal/Modal';
import { NonIdividualSidebar } from '../Sidebar/Sidebar';
import MoreInfo from '../NonIdividual/MoreInfo';

const NonIndividualIdentification = () => {
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
          <span>Customer Secondary Contact</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <NonIdividualSidebar />
          </div>
          <div className="submit-form-top-section">
            <p>Identification contact section</p>
            <MoreInfo modalOpener={modalOpener} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonIndividualIdentification;
