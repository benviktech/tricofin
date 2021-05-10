/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable  no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import Profile from '../../images/avatar.png';
import { fetchSingleIndividualCustomer } from '../../actions/individualCustomer';
import Spinner from '../Spinner/Spinner';
import ModalFunction from '../Modal/ModalFunction';
import Modal from '../Modal/Modal';
import './index.css';
import MoreInfo from './MoreInfo';
import Loader from '../Loader/Loader';

const ViewIndividualCustomer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    modalCloser, modalOpener, openModel, modalText,
  } = ModalFunction();

  const personalData = useSelector(state => state.individualCustomersReducer);

  useEffect(() => {
    dispatch(fetchSingleIndividualCustomer(id));
  }, []);

  return personalData.loading ? (
    <div className="spinner section">
      <Loader />
    </div>
  ) : (
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
          <div className="left-inner-form-section">
            <Sidebar />
          </div>
          <div className="submit-form-top-section">
            {
              personalData.individualCustomer === undefined ? (
                <div className="loading-content-section">
                  <Spinner />
                </div>
              ) : (
                <div className="main-form-color">
                  <div className="middle-inner-form-section">
                    <div className="form-group d-flex ">
                      <div className="left-form-group col-md-8">
                        <label htmlFor="customerId w-50">Customer ID:</label>
                        <div
                          className="form-control-input col-md-8"
                          placeholder="Enter Keyword"
                          type="text"
                          name="searchcustomer"
                        >
                          {personalData.individualCustomer.custID}
                        </div>
                      </div>
                      <div className="right-form-group-view ml-auto col-md-4">
                        <div
                          className="header-title-div"
                        >
                          Title:
                        </div>
                        <div
                          className="form-control-input view-header col-md-7 ml-2"
                        >
                          {personalData.individualCustomer.title}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="left-form-group col-md-12">
                        <label htmlFor="customerId w-50">SurName:</label>
                        <div
                          className="form-control-input col-md-8"
                          placeholder="Enter Surename"
                          type="text"
                        >
                          {personalData.individualCustomer.surName}
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="left-form-group col-md-12">
                        <label htmlFor="customerId w-50">ForeName1:</label>
                        <div
                          className="form-control-input col-md-8"
                          placeholder="Enter Forename"
                        >
                          {personalData.individualCustomer.foreName1}
                        </div>
                      </div>
                    </div>
                    <div className="form-group ">
                      <div className="left-form-group col-md-12">
                        <label htmlFor="customerId w-50">ForeName2:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          {personalData.individualCustomer.foreName2}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="left-form-group col-md-12">
                        <label htmlFor="customerId w-50">ForeName3:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          {personalData.individualCustomer.foreName3}
                        </div>
                      </div>
                    </div>
                    <div className="form-group ">
                      <div className="left-form-group d-flex align-items-center col-md-12">
                        <label htmlFor="customerId w-50">Residential Address:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          {personalData.individualCustomer.rAddress}
                        </div>
                      </div>
                    </div>
                    <div className="form-group ">
                      <div className="left-form-group col-md-12">
                        <label htmlFor="customerId w-50">EmailID1:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          {personalData.individualCustomer.emailID1}
                        </div>
                      </div>
                    </div>
                    <div className="form-group ">
                      <div className="left-form-group col-md-12">
                        <label htmlFor="customerId w-50">EmailID2:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          {personalData.individualCustomer.emailID2}
                        </div>
                      </div>
                    </div>
                    <div className="form-group ">
                      <div className="left-form-group col-md-12">
                        <label className="w-25" htmlFor="customerId">Date of Birth:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          {new Date(personalData.individualCustomer.dateofbirth).toUTCString().split(' ').slice(0, 4)
                            .join(' ')}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right-inner-form-section">
                    <div className="smaller-inner-section d-flex">
                      <div className="inner-left-section-image">
                        <div className="form-group mr-2">
                          <div className="left-form-group other-input-section col-md-12">
                            <label htmlFor="customerId w-50">Phone1:</label>
                            <div
                              className="form-control-input col-md-8"
                            >
                              {personalData.individualCustomer.phone1}
                            </div>
                          </div>
                        </div>
                        <div className="form-group mr-2">
                          <div className="left-form-group other-input-section col-md-12">
                            <label htmlFor="customerId w-50">Phone2:</label>
                            <div
                              className="form-control-input col-md-8"
                            >
                              { personalData.individualCustomer.phone2 }
                            </div>
                          </div>
                        </div>
                        <div className="form-group d-flex  mr-2">
                          <div className="left-form-group other-input-section col-md-12">
                            <label htmlFor="customerId w-50">Phone3:</label>
                            <div
                              className="form-control-input col-md-8"
                            >
                              {personalData.individualCustomer.phone3}
                            </div>
                          </div>
                        </div>

                        <div className="form-group mr-2">
                          <div className="left-form-group other-input-section col-md-12">
                            <label htmlFor="customerId w-50">Gender:</label>
                            <div
                              className="form-control-input col-md-8"
                            >
                              {personalData.individualCustomer.genderID === 'M' ? 'Male' : 'Female'}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="image-section mb-2">
                        <img src={Profile} alt="profile" />
                      </div>
                    </div>
                    <div className="form-group ">
                      <div className="left-form-group other-input-section col-md-12">
                        <label className="w-25" htmlFor="customerId">Nationality:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          {
                          personalData.individualCustomer.nationalityID === 'N' ? 'Nigerian'
                            : personalData.individualCustomer.nationalityID === 'U' ? 'Ugandan'
                              : personalData.individualCustomer.nationalityID === 'K' ? 'Kenyan'
                                : personalData.individualCustomer.nationalityID === 'T' ? 'Tanzanian'
                                  : personalData.individualCustomer.nationalityID === 'R' ? 'Rwandan'
                                    : 'Indian'
                          }
                        </div>
                      </div>
                    </div>
                    <div className="form-group ">
                      <div className="left-form-group other-input-section col-md-12">
                        <label className="w-25" htmlFor="customerId">Marital Status:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          {
                          personalData.individualCustomer.maritalStatusID === 1 ? 'Single'
                            : personalData.individualCustomer.maritalStatusID === 2 ? 'Divorced'
                              : personalData.individualCustomer.maritalStatusID === 3 ? 'Married'
                                : personalData.individualCustomer.maritalStatusID === 4 ? 'Separated'
                                  : personalData.individualCustomer.maritalStatusID === 5 ? 'Widowed'
                                    : 'Anulled'
                          }
                        </div>
                      </div>
                    </div>
                    <div className="form-group ">
                      <div className="left-form-group other-input-section col-md-12">
                        <label className="w-25" htmlFor="customerId">Risk Profile:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          {
                          personalData.individualCustomer.riskProfileID === 'L' ? 'Low'
                            : personalData.individualCustomer.riskProfileID === 'M' ? 'Medium'
                              : 'High'
                          }
                        </div>
                      </div>
                    </div>
                    <div className="form-group ">
                      <div className="left-form-group other-input-section col-md-12">
                        <label className="w-25" htmlFor="customerId">Customer Type:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          {
                          personalData.individualCustomer.custTypeID === 'C' ? 'Client'
                            : personalData.individualCustomer.custTypeID === 'S' ? 'Staff'
                              : personalData.individualCustomer.custTypeID === 'E' ? 'Employee'
                                : personalData.individualCustomer.custTypeID === 'D' ? 'Director'
                                  : 'Guarantor'
                          }
                        </div>
                      </div>
                    </div>
                    <div className="submit-button-section d-flex">
                      <Link
                        className="edit-button"
                        to={{
                          pathname: `/updatecustomer/${personalData.individualCustomer.custID}`,
                        }}
                      >
                        Update
                      </Link>
                    </div>
                  </div>
                </div>
              )
            }
            <MoreInfo modalOpener={modalOpener} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewIndividualCustomer;
