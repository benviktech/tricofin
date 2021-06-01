/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import Modal from '../Modal/Modal';
import UseForm from './UseForm';
import validate from '../Validators/IndividualCustomerValidator';
import ModalFunction from '../Modal/ModalFunction';
import './index.css';
import MoreInfo from './MoreInfo';
import SearchCustomer from './SearchCustomer';
import Loader from '../Loader/Loader';
import { fetchIndividualCustomers } from '../../actions/individualCustomer';
import { fetchUiStaticData } from '../../actions';

const IndividualCustomerForm = () => {
  const dispatch = useDispatch();
  const {
    handleChange, values, handleSubmit, errors, setErrors,
  } = UseForm(validate);

  const {
    modalCloser, modalOpener, openModel, modalText,
  } = ModalFunction();

  const {
    searchIndividualCustomer,
    searchedCustomer, finalSortedList,
    setSearchedCustomer,
  } = SearchCustomer();

  const clearInputsValues = e => {
    e.preventDefault();
    setSearchedCustomer('');
    setErrors({});
  };

  const individualCustomers = useSelector(state => state.individualCustomersReducer);
  const staticData = useSelector(state => state.staticDataReducer);

  useEffect(() => {
    dispatch(fetchUiStaticData());
    dispatch(fetchIndividualCustomers());
  }, []);

  return individualCustomers.individualCustomers.length > 0 ? (
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
                      autoComplete="off"
                      className="form-control-input col-md-8"
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
                    {
                    Object.keys(staticData.staticData).includes('titles') ? (
                      <select
                        className="form-control-input col-md-9 ml-2"
                        onChange={handleChange}
                        name="title"
                        value={values.title}
                      >
                        <option value="" disabled selected hidden>Select</option>
                        {
                          staticData.staticData.titles.map((title, index) => (
                            <option
                              key={index}
                              value={title.titleID}
                            >
                              {title.titleID}
                            </option>
                          ))
                        }
                      </select>
                    ) : (
                      <select
                        className="form-control-input col-md-9 ml-2"
                      >
                        <option value="" disabled selected hidden>Select</option>
                      </select>
                    )
                  }
                  </div>
                  { errors.title && <small className="span-warning mt-4">{errors.title}</small>}
                </div>
                <div className="form-group">
                  <div className="left-form-group col-md-12">
                    <label className="text-info" htmlFor="customerId">SurName:</label>
                    <input
                      className="form-control-input col-md-8"
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
                    <label className="text-info" htmlFor="customerId">ForeName1:</label>
                    <input
                      className="form-control-input col-md-8"
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
                      type="text"
                      name="foreName3"
                      value={values.foreName3}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group d-flex align-items-center col-md-12">
                    <label className="text-info" htmlFor="customerId">Residential Address:</label>
                    <input
                      className="form-control-input col-md-8"
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
                      type="email"
                      name="emailID2"
                      value={values.emailID2}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group col-md-12">
                    <label className="w-25 text-info" htmlFor="customerId">Date of Birth:</label>
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
                          type="text"
                          name="phone1"
                          value={values.phone1}
                          onChange={handleChange}
                        />
                      </div>
                      { errors.phone1 && <small className="span-warning">{errors.phone1}</small>}
                    </div>
                    <div className="form-group mr-2">
                      <div className="left-form-group other-input-section col-md-12">
                        <label htmlFor="customerId w-50">Phone2:</label>
                        <input
                          className="form-control-input col-md-8"
                          type="text"
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
                          type="text"
                          name="phone3"
                          value={values.phone3}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group mr-2">
                      <div className="left-form-group other-input-section col-md-12">
                        <label className="text-info" htmlFor="customerId">Gender:</label>
                        {
                        Object.keys(staticData.staticData).includes('gender') ? (
                          <select
                            className="form-control-input col-md-8"
                            onChange={handleChange}
                            name="genderID"
                            value={values.genderID}
                          >
                            <option value="" disabled selected hidden>Select </option>
                            {
                              staticData.staticData.gender.map((value, index) => (
                                <option
                                  key={index}
                                  value={value.genderID}
                                >
                                  {value.description}
                                </option>
                              ))
                            }
                          </select>
                        ) : (
                          <select
                            className="form-control-input col-md-8"
                          >
                            <option value="" disabled selected hidden>Select </option>
                          </select>
                        )
                      }
                      </div>
                      { errors.genderID && <small className="span-warning">{errors.genderID}</small>}
                    </div>
                  </div>
                  <div className="image-section mb-2" />
                </div>
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25 text-info" htmlFor="customerId">Nationality:</label>
                    {
                    Object.keys(staticData.staticData).includes('nationality') ? (
                      <select
                        className="form-control-input col-md-8"
                        onChange={handleChange}
                        name="nationalityID"
                        value={values.nationalityID}
                      >
                        <option value="" disabled selected hidden>Select </option>
                        {
                          staticData.staticData.nationality.map((nation, index) => (
                            <option
                              key={index}
                              value={nation.nationalityID}
                            >
                              {nation.description}
                            </option>
                          ))
                        }
                      </select>
                    ) : (
                      <select
                        className="form-control-input col-md-8"
                      >
                        <option value="" disabled selected hidden>Select</option>
                      </select>
                    )
                  }
                  </div>
                  { errors.nationalityID && <small className="span-warning">{errors.nationalityID}</small>}
                </div>
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25 text-info" htmlFor="customerId">Marital Status:</label>
                    {
                      Object.keys(staticData.staticData).includes('maritalStatus') ? (
                        <select
                          className="form-control-input col-md-8"
                          onChange={handleChange}
                          name="maritalStatusID"
                          value={values.maritalStatusID}
                        >
                          <option value="" disabled selected hidden>Select </option>
                          {
                            staticData.staticData.maritalStatus.map((status, index) => (
                              <option
                                key={index}
                                value={status.maritalStatusID}
                              >
                                {status.status}
                              </option>
                            ))
                          }
                        </select>
                      ) : (
                        <select
                          className="form-control-input col-md-8"
                        >
                          <option value="" disabled selected hidden>Select </option>
                        </select>
                      )
                    }
                  </div>
                  { errors.maritalStatusID && <small className="span-warning">{errors.maritalStatusID}</small>}
                </div>
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25 text-info" htmlFor="customerId">Risk Profile:</label>
                    {
                      Object.keys(staticData.staticData).includes('riskProfiles') ? (
                        <select
                          className="form-control-input col-md-8"
                          onChange={handleChange}
                          name="riskProfileID"
                          value={values.riskProfileID}
                        >
                          <option value="" disabled selected hidden>Select </option>
                          {
                            staticData.staticData.riskProfiles.map((profile, index) => (
                              <option
                                key={index}
                                value={profile.riskProfileID}
                              >
                                {profile.riskProfile}
                              </option>
                            ))
                          }
                        </select>
                      ) : (
                        <select
                          className="form-control-input col-md-8"
                        >
                          <option value="" disabled selected hidden>Select </option>
                        </select>
                      )
                    }
                  </div>
                  { errors.riskProfileID && <small className="span-warning">{errors.riskProfileID}</small>}
                </div>
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25 text-info" htmlFor="customerId">Customer Type:</label>
                    {
                      Object.keys(staticData.staticData).includes('customerTypes') ? (
                        <select
                          className="form-control-input col-md-8"
                          onChange={handleChange}
                          name="custTypeID"
                          value={values.custTypeID}
                        >
                          <option value="" disabled selected hidden>Select </option>
                          {
                            staticData.staticData.customerTypes.map((type, index) => (
                              <option
                                key={index}
                                value={type.custTypeID}
                              >
                                {type.customerType}
                              </option>
                            ))
                          }
                        </select>
                      ) : (
                        <select
                          className="form-control-input col-md-8"
                        >
                          <option value="" disabled selected hidden>Select </option>
                        </select>
                      )
                    }
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
  ) : (
    <div className="spinner section">
      <Loader />
    </div>
  );
};

export default IndividualCustomerForm;
