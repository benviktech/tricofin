/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { NonIdividualSidebar } from '../Sidebar/Sidebar';
import './index.css';
import '../Customer/index.css';
import MoreInfo from './MoreInfo';
import ModalFunction from '../Modal/ModalFunction';
import Modal from '../Modal/Modal';
import UseForm from './UseForm';
import validate from '../Validators/NonIndividualCustomer';
import SearchNonIndividual from './SearchNonIndividual';

const NonIndidualCustomerForm = () => {
  const [sectors, setSectors] = useState([]);
  const [industries, setIndustry] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [staticData, setStaticData] = useState({});
  const [dateError, setDateError] = useState({});
  const {
    handleChange, values, handleSubmit, errors, setErrors,
  } = UseForm(validate);

  const {
    modalCloser, modalOpener, openModel, modalText,
  } = ModalFunction();

  const {
    searchNonIndividualCustomer,
    searchedCustomer, finalSortedList,
    setSearchedCustomer,
  } = SearchNonIndividual();

  const clearInputsValues = () => {
    setSearchedCustomer('');
    setErrors({});
  };

  useEffect(() => {
    const errs = {};
    if (new Date(values.regDate) >= new Date()) {
      errs.regDate = 'Cannot be be future Date';
    }
    setDateError(errs);
  }, [values]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetEconomicSectors')
        .then(response => {
          setSectors(response.data);
          axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetIndustrySectorCodes')
            .then(response => {
              setIndustry(response.data);
              axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetBusinessTypes')
                .then(response => {
                  setBusinesses(response.data);
                  axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetStaticData')
                    .then(response => setStaticData(response.data))
                    .catch(error => console.log(error.message));
                }).catch(error => console.log(error.message));
            }).catch(error => console.log(error.message));
        })
        .catch(error => console.log(error.message));
    };
    fetchData();
  }, []);

  return (
    <div className="individual-customer-form">
      <Modal
        modalText={modalText}
        modalCloser={modalCloser}
        openModel={openModel}
      />
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Customer Information</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <NonIdividualSidebar />
          </div>
          <div className="submit-form-top-section">
            <form className="main-form-color" onSubmit={handleSubmit}>
              <div className="middle-inner-form-section">
                <div className="form-group">
                  <div className="left-form-group manage-drop-down col-md-12">
                    <label htmlFor="customerId w-50">Search By Name:</label>
                    <input
                      autoComplete="off"
                      className="form-control-input col-md-8"
                      type="text"
                      name="searchcustomer"
                      value={searchedCustomer}
                      onChange={searchNonIndividualCustomer}
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
                                    pathname: `/viewnonindividualcustomerform/${customer.custID}`,
                                  }}
                                  className="inner-section-modal-section-inner border"
                                  key={customer.custID}
                                >
                                  <div className="modal-customer-name-section mr-2">
                                    { customer.bizName }
                                  </div>
                                  <div className="modal-customer-name-section mr-2">
                                    { customer.tradingName}
                                  </div>
                                </Link>
                              ))
                            }
                             </div>
                           </div>
                         )
                      }
                  </div>
                </div>
                <div className="form-group">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId">
                      Business Name
                      <span className="text-danger mx-1">
                        *
                      </span>
                      :
                    </label>
                    <input
                      className="form-control-input col-md-8"
                      type="text"
                      name="bizName"
                      value={values.bizName}
                      onChange={handleChange}
                    />
                  </div>
                  { errors.bizName && <small className="span-warning-non mt-4">{errors.bizName}</small>}
                </div>
                <div className="form-group">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId">
                      Trading Name
                      <span className="text-danger mx-1">
                        *
                      </span>
                      :
                    </label>
                    <input
                      className="form-control-input col-md-8"
                      type="text"
                      name="tradingName"
                      value={values.tradingName}
                      onChange={handleChange}
                    />
                  </div>
                  { errors.tradingName && <small className="span-warning-non mt-4">{errors.tradingName}</small>}
                </div>
                <div className="form-group ">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId">Economic Sector:</label>
                    {' '}
                    {
                    sectors.length > 0 ? (
                      <select
                        className="form-control-input col-md-8"
                        name="econID"
                        value={values.econID}
                        onChange={handleChange}
                      >
                        <option value="" disabled selected hidden>Select</option>
                        {
                          sectors.map((sector, index) => (
                            <option
                              key={index}
                              value={sector.econID}
                            >
                              {sector.economicSector}
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
                  { errors.econID && <small className="span-warning-non mt-4">{errors.econID}</small>}
                </div>
                <div className="form-group">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId w-50">Industry Sector:</label>
                    {
                    sectors.length > 0 ? (
                      <select
                        className="form-control-input col-md-8"
                        name="indSecID"
                        value={values.indSecID}
                        onChange={handleChange}
                      >
                        <option value="" disabled selected hidden>Select</option>
                        {
                          industries.map((industry, index) => (
                            <option
                              key={index}
                              value={industry.indSecID}
                            >
                              {industry.industrySector}
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
                  { errors.indSecID && <small className="span-warning-non mt-4">{errors.indSecID}</small>}
                </div>
                <div className="form-group ">
                  <div className="left-form-group d-flex align-items-center col-md-12">
                    <label htmlFor="customerId">
                      Business Type
                      <span className="text-danger mx-1">
                        *
                      </span>
                      :
                    </label>
                    {
                    sectors.length > 0 ? (
                      <select
                        className="form-control-input col-md-8"
                        name="bizTypeID"
                        value={values.bizTypeID}
                        onChange={handleChange}
                      >
                        <option value="" disabled selected hidden>Select</option>
                        {
                          businesses.map((business, index) => (
                            <option
                              key={index}
                              value={business.businessTypeID}
                            >
                              {business.businessType}
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
                  { errors.bizTypeID && <small className="span-warning-non mt-4">{errors.bizTypeID}</small>}
                </div>
                <div className="form-group ">
                  <div className="left-form-group col-md-12">
                    <label className="w-25" htmlFor="customerId">
                      Activity Description
                      <span className="text-danger mx-1">
                        *
                      </span>
                      :
                    </label>
                    <textarea
                      className="form-control-input col-md-8"
                      id=""
                      cols="30"
                      rows="10"
                      name="activityDescription"
                      value={values.activityDescription}
                      onChange={handleChange}
                    />
                  </div>
                  { errors.activityDescription && <small className="span-warning-non mt-4">{errors.activityDescription}</small>}
                </div>
              </div>
              <div className="right-inner-form-section">
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25" htmlFor="customerId">
                      Registration Date
                      <span className="text-danger mx-1">
                        *
                      </span>
                      :
                    </label>
                    <input
                      className="form-control-input col-md-8"
                      type="date"
                      name="regDate"
                      value={values.regDate}
                      onChange={handleChange}
                    />
                  </div>
                  { dateError.regDate && <small className="span-warning-non mt-4">{dateError.regDate}</small>}
                </div>
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25" htmlFor="customerId">
                      Risk Profile
                      <span className="text-danger mx-1">
                        *
                      </span>
                      :
                    </label>
                    {
                    Object.keys(staticData).includes('riskProfiles') ? (
                      <select
                        className="form-control-input col-md-8"
                        name="riskProfileID"
                        value={values.riskProfileID}
                        onChange={handleChange}
                      >
                        <option value="" disabled selected hidden>Select</option>
                        {
                          staticData.riskProfiles.map((profile, index) => (
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
                        <option value="" disabled selected hidden>Select</option>
                      </select>
                    )
                  }
                  </div>
                  { errors.riskProfileID && <small className="span-warning-non mt-4">{errors.riskProfileID}</small>}
                </div>
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25" htmlFor="customerId">
                      Customer Type
                      <span className="text-danger mx-1">
                        *
                      </span>
                      :
                    </label>
                    {
                    Object.keys(staticData).includes('customerTypes') ? (
                      <select
                        className="form-control-input col-md-8"
                        name="custTypeID"
                        value={values.custTypeID}
                        onChange={handleChange}
                      >
                        <option value="" disabled selected hidden>Select</option>
                        {
                          staticData.customerTypes.map((type, index) => (
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
                        <option value="" disabled selected hidden>Select</option>
                      </select>
                    )
                  }
                  </div>
                  { errors.custTypeID && <small className="span-warning-non mt-4">{errors.custTypeID}</small>}
                </div>
                <div className="submit-button-section form-button-section">
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
