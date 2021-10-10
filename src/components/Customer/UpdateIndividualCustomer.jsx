/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import { updateIndividualCustomer } from '../../actions/individualCustomer';
import ModalFunction from '../Modal/ModalFunction';
import { Sidebar } from '../Sidebar/Sidebar';
import IndividualCustomerValidator from '../Validators/IndividualCustomerValidator';
import MoreInfo from './MoreInfo';
import Modal from '../Modal/Modal';
import './index.css';
import Loader from '../Loader/Loader';

const UpdateIndividualCustomer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [dataState, setDataState] = useState({});
  const [staticData, setStaticData] = useState({});
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = e => {
    const { name, value } = e.target;
    setDataState({
      ...dataState,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetStaticData')
        .then(response => {
          setStaticData(response.data);
          axios.get(
            `https://tricofin.azurewebsites.net/api/Customers/GetIndividualCustomer/${id}`,
          ).then(response => setDataState(response.data))
            .catch(error => console.log(error.message));
        }).catch(error => console.log(error.message));
    };
    fetchData();
  }, []);

  const {
    modalCloser, modalOpener, openModel, modalText,
  } = ModalFunction();

  const updateCustomer = e => {
    e.preventDefault();
    const response = IndividualCustomerValidator(dataState);
    setErrors(response);
    if (Object.keys(response).length === 0) {
      dispatch(updateIndividualCustomer(dataState, history));
    }
  };

  const routeBack = () => history.goBack();

  return Object.keys(dataState).length > 0 ? (
    <div className="view-individual-customer-form">
      <Modal
        modalText={modalText}
        modalCloser={modalCloser}
        openModel={openModel}
      />
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>
            Update
            {' '}
            {(dataState.surName).toLowerCase()}
            ´s Personal Information
          </span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <div className="back-button-section">
              <i
                className="fas fa-arrow-circle-left"
                style={{ fontSize: '20px', marginRight: '10px', cursor: 'pointer' }}
                onClick={routeBack}
              />
            </div>
            <Sidebar />
          </div>
          <div className="submit-form-top-section">
            <form className="main-form-color" onSubmit={updateCustomer}>
              <div className="middle-inner-form-section">
                <div className="form-group">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId">Customer ID:</label>
                    <div className="form-control-input-div col-md-9 p-0">
                      <div className="form-control-input-update w-75">
                        {dataState.custID}

                      </div>
                      <div className="right-form-group-div col-md-5">
                        <label htmlFor="title">Title:</label>
                        <div
                          className="form-control-input-update w-75"
                        >
                          {
                            Object.keys(staticData).includes('titles') ? (
                              <select
                                className="form-control-input col-md-9 ml-2"
                                onChange={handleChange}
                                name="title"
                                value={dataState.title}
                              >
                                <option value="" disabled selected hidden>Select Title</option>
                                {
                                  staticData.titles.map((title, index) => (
                                    <option key={index} value={title.titleID}>
                                      {title.titleID}
                                    </option>
                                  ))
                                }
                              </select>
                            ) : (
                              <select
                                className="form-control-input col-md-9 ml-2"
                              >
                                <option value="" disabled selected hidden>Select Title</option>
                              </select>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId">
                      SurName
                      <span className="text-danger">
                        {' '}
                        *
                      </span>
                      {' '}
                      {' '}
                      :
                    </label>
                    <input
                      className="form-control-input-update col-md-9"
                      type="text"
                      name="surName"
                      value={dataState.surName}
                      onChange={handleChange}
                    />
                  </div>
                  { errors.surName && <small className="span-warning">{errors.surName}</small>}
                </div>
                <div className="form-group">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId">
                      ForeName1
                      <span className="text-danger">
                        {' '}
                        *
                      </span>
                      {' '}
                      {' '}
                      :
                    </label>
                    <input
                      className="form-control-input-update col-md-9"
                      type="text"
                      name="foreName1"
                      value={dataState.foreName1}
                      onChange={handleChange}
                    />
                  </div>
                  { errors.foreName1 && <small className="span-warning">{errors.foreName1}</small>}
                </div>
                <div className="form-group ">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId w-50">ForeName2:</label>
                    <input
                      className="form-control-input-update col-md-9"
                      type="text"
                      name="foreName2"
                      value={dataState.foreName2}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId w-50">ForeName3:</label>
                    <input
                      className="form-control-input-update col-md-9"
                      type="text"
                      name="foreName3"
                      value={dataState.foreName3}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group d-flex align-items-center col-md-12">
                    <label htmlFor="customerId">
                      Residential Address
                      <span className="text-danger">
                        {' '}
                        *
                      </span>
                      {' '}
                      {' '}
                      :
                    </label>
                    <input
                      className="form-control-input-update col-md-9"
                      type="text"
                      name="rAddress"
                      value={dataState.rAddress}
                      onChange={handleChange}
                    />
                  </div>
                  { errors.rAddress && <small className="span-warning">{errors.rAddress}</small>}
                </div>
                <div className="form-group ">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId w-50">EmailID1:</label>
                    <input
                      className="form-control-input-update col-md-9"
                      type="email"
                      name="emailID1"
                      value={dataState.emailID1}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group col-md-12">
                    <label htmlFor="customerId w-50">EmailID2:</label>
                    <input
                      className="form-control-input-update col-md-9"
                      type="email"
                      name="emailID2"
                      value={dataState.emailID2}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group col-md-12">
                    <label className="w-25" htmlFor="customerId">
                      Date of Birth
                      <span className="text-danger">
                        {' '}
                        *
                      </span>
                      {' '}
                      {' '}
                      :
                    </label>
                    <input
                      className="form-control-input-update col-md-9"
                      type="date"
                      name="dateofbirth"
                      value={dataState.dateofbirth
                        && new Date(dataState.dateofbirth).toISOString().substring(0, 10)}
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
                          value={dataState.phone1}
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
                          value={dataState.phone2}
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
                          value={dataState.phone3}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group mr-2">
                      <div className="left-form-group other-input-section col-md-12">
                        <label htmlFor="customerId">
                          Gender
                          <span className="text-danger">
                            *
                          </span>
                          :
                        </label>
                        {
                          Object.keys(staticData).includes('gender') ? (
                            <select
                              className="form-control-input col-md-8"
                              onChange={handleChange}
                              name="genderID"
                              value={dataState.genderID}
                            >
                              <option value="" disabled selected hidden>Select Gender</option>
                              {
                                staticData.gender.map((value, index) => (
                                  <option key={index} value={value.genderID}>
                                    {value.description}
                                  </option>
                                ))
                              }
                            </select>
                          ) : (
                            <select
                              className="form-control-input col-md-8"
                            >
                              <option value="" disabled selected hidden>Select Gender</option>
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
                    <label className="w-25" htmlFor="customerId">
                      Nationality
                      <span className="text-danger">
                        {' '}
                        *
                      </span>
                      {' '}
                      {' '}
                      :
                    </label>
                    {
                      Object.keys(staticData).includes('nationality') ? (
                        <select
                          className="form-control-input col-md-8"
                          onChange={handleChange}
                          name="nationalityID"
                          value={dataState.nationalityID}
                        >
                          {
                          staticData.nationality.map((nation, index) => (
                            <option key={index} value={nation.nationalityID}>
                              {nation.description}
                            </option>
                          ))
                          }
                        </select>
                      ) : (
                        <select
                          className="form-control-input col-md-8"
                        >
                          <option value="" disabled selected hidden>Select Nationality</option>
                        </select>
                      )
                    }
                  </div>
                  { errors.nationalityID && <small className="span-warning">{errors.nationalityID}</small>}
                </div>
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25" htmlFor="customerId">
                      Marital Status
                      <span className="text-danger">
                        {' '}
                        *
                      </span>
                      {' '}
                      {' '}
                      :
                    </label>
                    {
                      Object.keys(staticData).includes('nationality') ? (
                        <select
                          className="form-control-input col-md-8"
                          onChange={handleChange}
                          name="maritalStatusID"
                          value={dataState.maritalStatusID}
                        >
                          <option value="" disabled selected hidden>Select Marital Status</option>
                          {
                          staticData.maritalStatus.map((status, index) => (
                            <option key={index} value={status.maritalStatusID}>
                              {status.status}
                            </option>
                          ))
                          }
                        </select>
                      ) : (
                        <select
                          className="form-control-input col-md-8"
                        >
                          <option value="" disabled selected hidden>Select Marital Status</option>
                        </select>
                      )
                    }
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25" htmlFor="customerId">
                      Risk Profile
                      <span className="text-danger">
                        {' '}
                        *
                      </span>
                      {' '}
                      {' '}
                      :
                    </label>
                    {
                      Object.keys(staticData).includes('nationality') ? (
                        <select
                          className="form-control-input col-md-8"
                          onChange={handleChange}
                          name="riskProfileID"
                          value={dataState.riskProfileID}
                        >
                          <option value="" disabled selected hidden>Select Risk Profile</option>
                          {
                          staticData.riskProfiles.map((profile, index) => (
                            <option key={index} value={profile.riskProfileID}>
                              {profile.riskProfile}
                            </option>
                          ))
                          }
                        </select>
                      ) : (
                        <select
                          className="form-control-input col-md-8"
                        >
                          <option value="" disabled selected hidden>Select Risk Profile</option>
                        </select>
                      )
                    }
                  </div>
                </div>
                <div className="form-group ">
                  <div className="left-form-group other-input-section col-md-12">
                    <label className="w-25" htmlFor="customerId">
                      Customer Type
                      <span className="text-danger">
                        {' '}
                        *
                      </span>
                      {' '}
                      {' '}
                      :
                    </label>
                    {
                      Object.keys(staticData).includes('customerTypes') ? (
                        <select
                          className="form-control-input col-md-8"
                          onChange={handleChange}
                          name="custTypeID"
                          value={dataState.custTypeID}
                        >
                          <option value="" disabled selected hidden>Select Customer Type</option>
                          {
                          staticData.customerTypes.map((type, index) => (
                            <option key={index} value={type.custTypeID}>
                              {type.customerType}
                            </option>
                          ))
                          }
                        </select>
                      ) : (
                        <select
                          className="form-control-input col-md-8"
                        >
                          <option value="" disabled selected hidden>Select Customer Type</option>
                        </select>
                      )
                    }
                  </div>
                </div>
                <div className="submit-button-section">
                  <button
                    type="submit"
                    className="update-customer-btn px-4"
                  >
                    Save
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

export default UpdateIndividualCustomer;
