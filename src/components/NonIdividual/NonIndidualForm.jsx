/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import './index.css';
import MoreInfo from './MoreInfo';
import ModalFunction from '../Modal/ModalFunction';
import Modal from '../Modal/Modal';
import UseForm from './UseForm';
import validate from '../Validators/NonIndividualCustomer';

const NonIndidualCustomerForm = () => {
  const [sectors, setSectors] = useState([]);
  const [industries, setIndustry] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [staticData, setStaticData] = useState({});
  const {
    handleChange, values, handleSubmit, errors, setErrors,
  } = UseForm(validate);

  const {
    modalCloser, modalOpener, openModel, modalText,
  } = ModalFunction();

  const clearInputsValues = () => {
    console.log('clear content');
    setErrors({});
  };

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
        .catch(errors => console.log(errors.message));
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
                      name="bizName"
                      value={values.bizName}
                      onChange={handleChange}
                    />
                  </div>
                  { errors.bizName && <small className="span-warning mt-4">{errors.bizName}</small>}
                </div>
                <div className="form-group">
                  <div className="left-form-group col-md-12">
                    <label className="text-info" htmlFor="customerId">Trading Name:</label>
                    <input
                      className="form-control-input col-md-8"
                      type="text"
                      name="tradingName"
                      value={values.tradingName}
                      onChange={handleChange}
                    />
                  </div>
                  { errors.bizName && <small className="span-warning mt-4">{errors.bizName}</small>}
                </div>
                <div className="form-group ">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId w-50">Economic Sector:</label>
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
                        className="form-control-input col-md-9 ml-2"
                      >
                        <option value="" disabled selected hidden>Select</option>
                      </select>
                    )
                  }
                  </div>
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
                        className="form-control-input col-md-9 ml-2"
                      >
                        <option value="" disabled selected hidden>Select</option>
                      </select>
                    )
                  }
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group d-flex align-items-center col-md-12">
                    <label className="text-info" htmlFor="customerId">Business Type:</label>
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
                        className="form-control-input col-md-9 ml-2"
                      >
                        <option value="" disabled selected hidden>Select</option>
                      </select>
                    )
                  }
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
                      name="activityDescription"
                      value={values.activityDescription}
                      onChange={handleChange}
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
                      name="regDate"
                      value={values.regDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25 text-info" htmlFor="customerId">Risk Profile:</label>
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
                        className="form-control-input col-md-9 ml-2"
                      >
                        <option value="" disabled selected hidden>Select</option>
                      </select>
                    )
                  }
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25 text-info" htmlFor="customerId">Customer Type:</label>
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
                        className="form-control-input col-md-9 ml-2"
                      >
                        <option value="" disabled selected hidden>Select</option>
                      </select>
                    )
                  }
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
