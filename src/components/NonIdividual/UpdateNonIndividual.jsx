/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import { NonIdividualSidebar } from '../Sidebar/Sidebar';
import './index.css';
import '../Customer/index.css';
import MoreInfo from './MoreInfo';
import ModalFunction from '../Modal/ModalFunction';
import Modal from '../Modal/Modal';
import validate from '../Validators/NonIndividualCustomer';
import {
  fetchSingleNonIndividualCustomer,
  updateNonIndividualCustomer,
} from '../../actions/nonIdividualCustomer';

const UpdateNonIndidualCustomerForm = () => {
  const [sectors, setSectors] = useState([]);
  const [industries, setIndustry] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [staticData, setStaticData] = useState({});
  const [dataState, setDataState] = useState({});
  const [errors, setErrors] = useState({});
  const [dateError, setDateError] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleChange = e => {
    const { name, value } = e.target;
    setDataState({
      ...dataState,
      [name]: value,
    });
  };

  const {
    modalCloser, modalOpener, openModel, modalText,
  } = ModalFunction();

  const customer = useSelector(state => state.nonIndividualCustomersReducer);

  const clearInputsValues = () => {
    setErrors({});
    if (Object.keys(customer.nonIndividualCustomer).length > 0) {
      setDataState(customer.nonIndividualCustomer);
    }
  };

  useEffect(() => {
    dispatch(fetchSingleNonIndividualCustomer(id));
  }, []);

  useEffect(() => {
    if (Object.keys(customer.nonIndividualCustomer).length > 0) {
      setDataState(customer.nonIndividualCustomer);
    }
  }, [customer.nonIndividualCustomer]);

  const updateCustomer = e => {
    e.preventDefault();
    const state = 'Update Non Individual Customer';
    const response = validate(dataState, state);
    setErrors(response);
    if (Object.values(response).includes('Updating')) {
      if (Object.keys(response).length === 1) {
        dispatch(updateNonIndividualCustomer(dataState, history, id));
      }
    }
  };

  useEffect(() => {
    const errs = {};
    if (new Date(dataState.regDate) >= new Date()) {
      errs.regDate = 'Cannot be a future Date';
    }
    setDateError(errs);
  }, [dataState]);

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
          <span>Non Individual Customer Information</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <NonIdividualSidebar />
          </div>
          <div className="submit-form-top-section">
            <form className="main-form-color" onSubmit={updateCustomer}>
              <div className="middle-inner-form-section">
                <div className="form-group">
                  <div className="left-form-group manage-drop-down col-md-12">
                    <label htmlFor="customerId w-50">Customer ID:</label>
                    <div
                      autoComplete="off"
                      className="form-control-input col-md-8"
                      type="text"
                    >
                      {customer.nonIndividualCustomer.custID
                      && customer.nonIndividualCustomer.custID}
                    </div>
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
                      value={dataState.bizName}
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
                      value={dataState.tradingName}
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
                        value={dataState.econID}
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
                        value={dataState.indSecID}
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
                        value={dataState.bizTypeID}
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
                      value={dataState.activityDescription}
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
                      value={dataState.regDate
                        && new Date(dataState.regDate).toISOString().substring(0, 10)}
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
                        value={dataState.riskProfileID}
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
                        value={dataState.custTypeID}
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
                    Save
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

export default UpdateNonIndidualCustomerForm;
