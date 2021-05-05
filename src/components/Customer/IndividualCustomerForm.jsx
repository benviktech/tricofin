/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import Modal from '../Modal/Modal';
import UseForm from './UseForm';
import validate from '../Validators/IndividualCustomerValidator';
import ModalFunction from '../Modal/ModalFunction';
import './index.css';
import MoreInfo from './MoreInfo';
import SearchCustomer from './SearchCustomer';
import Loader from '../Loader/Loader';

const IndividualCustomerForm = () => {
  const {
    handleChange, values, handleSubmit, errors,
  } = UseForm(validate);

  const {
    modalCloser, modalOpener, openModel, modalText,
  } = ModalFunction();

  const {
    searchIndividualCustomer,
    searchedCustomer, finalSortedList,
  } = SearchCustomer();

  const personalData = useSelector(state => state.individualCustomersReducer);

  return personalData.loading ? (
    <div className="spinner section">
      <Loader />
    </div>
  ) : (
    <div className="individual-customer-form">
      <Modal
        modalText={modalText}
        modalCloser={modalCloser}
        openModel={openModel}
      />
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Customer Maintenance Personal Information</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <Sidebar />
          </div>
          <div className="submit-form-top-section">

            <form className="main-form-color" onSubmit={handleSubmit}>
              <div className="middle-inner-form-section">
                <div className="form-group d-flex ">

                  <div className="left-form-group manage-drop-down col-md-8">
                    <label htmlFor="customerId w-50">Search By Name:</label>
                    <input
                      className="form-control-input col-md-8"
                      placeholder="Enter Keyword"
                      type="text"
                      name="searchcustomer"
                      value={searchedCustomer}
                      onChange={searchIndividualCustomer}
                    />
                    {
                           searchedCustomer === '' ? (
                             <div className="modal-hide-section" />
                           ) : (

                             <div className="modal-popup-section">
                               <div className="top-section-modal-section" />
                               <div className="inner-section-modal-section">
                                 {
                                Array.from(new Set(finalSortedList)).map(customer => (
                                  <Link
                                    exact
                                    to={{
                                      pathname: `/viewindividualcustomerform/${customer.custID}`,
                                    }}
                                    className="inner-section-modal-section-inner border"
                                    key={customer.custID}
                                  >
                                    <div className="modal-customer-name-section mr-2">
                                      { customer.title }
                                    </div>
                                    <div className="modal-customer-name-section mr-2">
                                      { customer.surName}
                                    </div>
                                    <div className="modal-customer-surname-section">
                                      { customer.foreName1 }
                                    </div>
                                  </Link>
                                ))
                              }
                               </div>
                             </div>
                           )
                        }
                  </div>

                  <div className="right-form-group ml-auto col-md-4">
                    <label htmlFor="title">Title:</label>
                    <select
                      className="form-control-input col-md-9 ml-2"
                      onChange={handleChange}
                      name="title"
                      value={values.title}
                    >
                      <option value="" disabled selected hidden>Select Title</option>
                      <option value="MR">MR.</option>
                      <option value="Mrs">MRs.</option>
                    </select>
                  </div>
                  { errors.title && <small className="span-warning mt-4">{errors.title}</small>}
                </div>
                <div className="form-group">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId w-50">SurName:</label>
                    <input
                      className="form-control-input col-md-8"
                      placeholder="Enter Surename"
                      type="text"
                      name="surName"
                      value={values.surName}
                      onChange={handleChange}
                    />
                  </div>
                  { errors.surName && <small className="span-warning">{errors.surName}</small>}
                </div>

                <div className="form-group">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId w-50">ForeName1:</label>
                    <input
                      className="form-control-input col-md-8"
                      placeholder="Enter Forename"
                      type="text"
                      name="foreName1"
                      value={values.foreName1}
                      onChange={handleChange}
                    />
                  </div>
                  { errors.foreName1 && <small className="span-warning">{errors.foreName1}</small>}
                </div>
                <div className="form-group ">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId w-50">ForeName2:</label>
                    <input
                      className="form-control-input col-md-8"
                      placeholder="Enter Forename"
                      type="text"
                      name="foreName2"
                      value={values.foreName2}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId w-50">ForeName3:</label>
                    <input
                      className="form-control-input col-md-8"
                      placeholder="Enter Forename"
                      type="text"
                      name="foreName3"
                      value={values.foreName3}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group d-flex align-items-center col-md-12">
                    <label htmlFor="customerId w-50">Residential Address:</label>
                    <input
                      className="form-control-input col-md-8"
                      placeholder="Enter Residential Address"
                      type="text"
                      name="rAddress"
                      value={values.rAddress}
                      onChange={handleChange}
                    />
                  </div>
                  { errors.rAddress && <small className="span-warning">{errors.rAddress}</small>}
                </div>
                <div className="form-group ">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId w-50">EmailID1:</label>
                    <input
                      className="form-control-input col-md-8"
                      placeholder="Enter Email Address"
                      type="email"
                      name="emailID1"
                      value={values.emailID1}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId w-50">EmailID2:</label>
                    <input
                      className="form-control-input col-md-8"
                      placeholder="Enter Email Address"
                      type="email"
                      name="emailID2"
                      value={values.emailID2}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group col-md-12">
                    <label className="w-25" htmlFor="customerId">Date of Birth:</label>
                    <input
                      className="form-control-input col-md-8"
                      type="date"
                      name="dateofbirth"
                      value={values.dateofbirth}
                      onChange={handleChange}
                    />
                  </div>
                  { errors.dateofbirth && <small className="span-warning">{errors.dateofbirth}</small>}
                </div>
              </div>
              <div className="right-inner-form-section">
                <div className="smaller-inner-section d-flex">
                  <div className="inner-left-section">
                    <div className="form-group mr-2">
                      <div className="left-form-group other-input-section col-md-12">
                        <label htmlFor="customerId w-50">Phone1:</label>
                        <input
                          className="form-control-input col-md-8"
                          placeholder="Enter Number.."
                          type="number"
                          name="phone1"
                          value={values.phone1}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group mr-2">
                      <div className="left-form-group other-input-section col-md-12">
                        <label htmlFor="customerId w-50">Phone2:</label>
                        <input
                          className="form-control-input col-md-8"
                          placeholder="Enter Number.."
                          type="number"
                          name="phone2"
                          value={values.phone2}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group d-flex  mr-2">
                      <div className="left-form-group other-input-section col-md-12">
                        <label htmlFor="customerId w-50">Phone3:</label>
                        <input
                          className="form-control-input col-md-8"
                          placeholder="Enter Number.."
                          type="number"
                          name="phone3"
                          value={values.phone3}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group mr-2">
                      <div className="left-form-group other-input-section col-md-12">
                        <label htmlFor="customerId w-50">Gender:</label>
                        <select
                          className="form-control-input col-md-8"
                          placeholder="Enter Gender"
                          onChange={handleChange}
                          name="genderID"
                          value={values.genderID}
                        >
                          <option value="" disabled selected hidden>Select Gender</option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                        </select>
                      </div>
                      { errors.genderID && <small className="span-warning">{errors.genderID}</small>}
                    </div>
                  </div>
                  <div className="image-section mb-2" />
                </div>
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25" htmlFor="customerId">Nationality:</label>
                    <select
                      className="form-control-input col-md-8"
                      placeholder="Enter Nationality"
                      onChange={handleChange}
                      name="nationalityID"
                      value={values.nationalityID}
                    >
                      <option value="" disabled selected hidden>Select Nationality</option>
                      <option value="U">Ugandan</option>
                      <option value="K">Kenyan</option>
                      <option value="T">Tanzanian</option>
                      <option value="R">Rwandan</option>
                      <option value="I">Indian</option>
                      <option value="N">Nigerian</option>
                    </select>
                  </div>
                  { errors.nationalityID && <small className="span-warning">{errors.nationalityID}</small>}
                </div>
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25" htmlFor="customerId">Marital Status:</label>
                    <select
                      className="form-control-input col-md-8"
                      onChange={handleChange}
                      name="maritalStatusID"
                      value={values.maritalStatusID}
                    >
                      <option value="" disabled selected hidden>Select Marital Status</option>
                      <option value="1">Single</option>
                      <option value="2">Divorced</option>
                      <option value="3">Married</option>
                      <option value="4">Separated</option>
                      <option value="5">Widowed</option>
                      <option value="6">Anulled</option>
                    </select>
                  </div>
                  { errors.maritalStatusID && <small className="span-warning">{errors.maritalStatusID}</small>}
                </div>
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25" htmlFor="customerId">Risk Profile:</label>
                    <select
                      className="form-control-input col-md-8"
                      onChange={handleChange}
                      name="riskProfileID"
                      value={values.riskProfileID}
                    >
                      <option value="" disabled selected hidden>Select Risk Profile</option>
                      <option value="H">High</option>
                      <option value="L">Low</option>
                      <option value="M">Medium</option>
                    </select>
                  </div>
                  { errors.riskProfileID && <small className="span-warning">{errors.riskProfileID}</small>}
                </div>
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25" htmlFor="customerId">Customer Type:</label>
                    <select
                      className="form-control-input col-md-8"
                      placeholder="Enter Marital Status"
                      onChange={handleChange}
                      name="custTypeID"
                      value={values.custTypeID}
                    >
                      <option value="" disabled selected hidden>Select Customer Type</option>
                      <option value="C">Client</option>
                      <option value="S">Staff</option>
                      <option value="E">Employee</option>
                      <option value="D">Director</option>
                      <option value="G">Guarantor</option>
                    </select>
                  </div>
                  { errors.custTypeID && <small className="span-warning">{errors.custTypeID}</small>}
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
                    className="search-customer-btn"
                  >
                    Search Customer
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

export default IndividualCustomerForm;
