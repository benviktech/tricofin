/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './index.css';
import MoreInfo from './MoreInfo';
import ModalFunction from '../Modal/ModalFunction';
import Modal from '../Modal/Modal';

const NonIndidualCustomerForm = () => {
  const handleSubmit = e => {
    e.preventDefault();
  };

  const {
    modalCloser, modalOpener, openModel, modalText,
  } = ModalFunction();

  const clearInputsValues = () => {
    console.log('clear content');
  };

  return (
    <div className="individual-customer-form">
      <Modal
        modalText={modalText}
        modalCloser={modalCloser}
        openModel={openModel}
      />
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Non Individual Customer Information</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <Sidebar />
          </div>
          <div className="submit-form-top-section">
            <form className="main-form-color" onSubmit={handleSubmit}>
              <div className="middle-inner-form-section">
                <div className="form-group">
                  <div className="left-form-group col-md-12">
                    <label className="text-info" htmlFor="customerId">Search Customer:</label>
                    <input
                      className="form-control-input col-md-8"
                      type="text"
                      name="surName"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="left-form-group col-md-12">
                    <label className="text-info" htmlFor="customerId">Business Name:</label>
                    <input
                      className="form-control-input col-md-8"
                      type="text"
                      name="foreName1"
                    />
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId w-50">Economic Sector:</label>
                    <input
                      className="form-control-input col-md-8"
                      type="text"
                      name="foreName2"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId w-50">Industry Sector:</label>
                    <input
                      className="form-control-input col-md-8"
                      type="text"
                      name="foreName3"
                    />
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group d-flex align-items-center col-md-12">
                    <label className="text-info" htmlFor="customerId">Business Type:</label>
                    <input
                      className="form-control-input col-md-8"
                      type="text"
                      name="rAddress"
                    />
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group col-md-12">
                    <label className="w-25 text-info" htmlFor="customerId">Activity Description:</label>
                    <textarea
                      className="form-control-input col-md-8"
                      id=""
                      cols="30"
                      rows="10"
                    />
                  </div>
                </div>
              </div>
              <div className="right-inner-form-section">
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25 text-info" htmlFor="customerId">Registration Date:</label>
                    <input
                      className="form-control-input col-md-8"
                      type="date"
                      name="dateofbirth"
                    />
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25 text-info" htmlFor="customerId">Risk Profile:</label>
                    <select
                      className="form-control-input col-md-8"
                      name="genderID"
                    >
                      <option value="" disabled selected hidden>Select </option>
                      <option value="ONE">Select </option>
                      <option value="TWO">Select </option>
                      <option value="TWO">Select </option>
                    </select>
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25 text-info" htmlFor="customerId">Customer Type:</label>
                    <select
                      className="form-control-input col-md-8"
                      name="genderID"
                    >
                      <option value="" disabled selected hidden>Select </option>
                      <option value="ONE">Select </option>
                      <option value="TWO">Select </option>
                      <option value="TWO">Select </option>
                    </select>
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
                    onClick={clearInputsValues}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
            <MoreInfo modalOpener={modalOpener} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonIndidualCustomerForm;
