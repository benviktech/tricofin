/* eslint-disable  jsx-a11y/label-has-associated-control */
/* eslint-disable  no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ModalFunction from '../Modal/ModalFunction';
import MoreInfo from './MoreInfo';
import { NonIdividualSidebar } from '../Sidebar/Sidebar';
import Modal from '../Modal/Modal';
import { fetchSingleNonIndividualCustomer } from '../../actions/nonIdividualCustomer';
import Spinner from '../Spinner/Spinner';

const NonIndividualCustomerView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [sectors, setSectors] = useState([]);
  const [industries, setIndustry] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [staticData, setStaticData] = useState({});
  const history = useHistory();
  const {
    modalCloser, modalOpener, openModel, modalText,
  } = ModalFunction();

  const customer = useSelector(state => state.nonIndividualCustomersReducer);

  useEffect(() => {
    dispatch(fetchSingleNonIndividualCustomer(id));
  }, []);

  useEffect(async () => {
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

  const economicSector = id => {
    let result = '';
    if (sectors.length > 0) {
      sectors.forEach(sector => {
        if (sector.econID === id) {
          result = sector.economicSector;
        }
      });
    }
    return result.length < 35 ? (result)
      : (`${result.substring(0, 35)} ...`);
  };

  const industrySector = id => {
    let result = '';
    if (industries.length > 0) {
      industries.forEach(industry => {
        if (parseInt(industry.indSecID, 10) === id) {
          result = industry.industrySector;
        }
      });
    }
    return result.length < 35 ? (result)
      : (`${result.substring(0, 35)} ...`);
  };

  const businessType = id => {
    let result = '';
    if (businesses.length > 0) {
      businesses.forEach(business => {
        if (business.businessTypeID === id) {
          result = business.businessType;
        }
      });
    }
    return result.length < 35 ? (result)
      : (`${result.substring(0, 35)} ...`);
  };

  const riskProfile = id => {
    let result = '';
    if (Object.keys(staticData).includes('riskProfiles')) {
      staticData.riskProfiles.forEach(profile => {
        if (profile.riskProfileID === id) {
          result = profile.riskProfile;
        }
      });
    }
    return result;
  };

  const custType = id => {
    let result = '';
    if (Object.keys(staticData).includes('customerTypes')) {
      staticData.customerTypes.forEach(type => {
        if (type.custTypeID === id) {
          result = type.customerType;
        }
      });
    }
    return result;
  };

  const routeBack = () => history.goBack();

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
            <div className="back-button-section">
              <i
                className="fas fa-arrow-circle-left"
                style={{ fontSize: '20px', marginRight: '10px', cursor: 'pointer' }}
                onClick={routeBack}
              />
            </div>
            <NonIdividualSidebar />
          </div>
          <div className="submit-form-top-section">
            {
              customer.loading ? (
                <div className="main-form-color d-flex align-items-center justify-content-center">
                  <Spinner />
                </div>
              ) : customer.error.length > 0 ? (
                <div className="main-form-color">
                  { customer.error }
                </div>
              ) : Object.keys(customer.nonIndividualCustomer).length > 0 ? (
                <div className="main-form-color">
                  <div className="middle-inner-form-section">
                    <div className="form-group">
                      <div className="left-form-group col-md-12">
                        <label htmlFor="customerId">Customer ID:</label>
                        <div
                          className="form-control-input col-md-8"
                          type="text"
                          name="surName"
                        >
                          {customer.nonIndividualCustomer.custID
                          && customer.nonIndividualCustomer.custID}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="left-form-group col-md-12">
                        <label htmlFor="customerId">Business Name:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          {
                            customer.nonIndividualCustomer.bizName
                            && (customer.nonIndividualCustomer.bizName).toUpperCase()
                          }
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="left-form-group col-md-12">
                        <label htmlFor="customerId">Trading Name:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          { customer.nonIndividualCustomer.tradingName
                          && (customer.nonIndividualCustomer.tradingName).toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <div className="form-group ">
                      <div className="left-form-group col-md-12">
                        <label htmlFor="customerId w-50">Economic Sector:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          { customer.nonIndividualCustomer.econID
                          && economicSector(customer.nonIndividualCustomer.econID)}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="left-form-group col-md-12">
                        <label htmlFor="customerId w-50">Industry Sector:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          { customer.nonIndividualCustomer.indSecID
                            && industrySector(customer.nonIndividualCustomer.indSecID)}

                        </div>
                      </div>
                    </div>
                    <div className="form-group ">
                      <div className="left-form-group d-flex align-items-center col-md-12">
                        <label htmlFor="customerId">Business Type:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          { customer.nonIndividualCustomer.bizTypeID
                            && businessType(customer.nonIndividualCustomer.bizTypeID)}
                        </div>
                      </div>
                    </div>
                    <div className="form-group ">
                      <div className="left-form-group col-md-12">
                        <label className="w-25" htmlFor="customerId">Activity Description:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          {
                            customer.nonIndividualCustomer.activityDescription
                            && customer.nonIndividualCustomer.activityDescription.length < 35
                              ? (customer.nonIndividualCustomer.activityDescription).toUpperCase()
                              : (`${customer.nonIndividualCustomer.activityDescription.substring(0, 36)} ...`)
                                .toUpperCase()
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right-inner-form-section">
                    <div className="form-group ">
                      <div className="left-form-group other-input-section col-md-12">
                        <label className="w-25" htmlFor="customerId">Registration Date:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          { customer.nonIndividualCustomer.regDate
                            && new Date(customer.nonIndividualCustomer.regDate).toUTCString()
                              .split(' ').slice(0, 4)
                              .join(' ')}
                        </div>
                      </div>
                    </div>
                    <div className="form-group ">
                      <div className="left-form-group other-input-section col-md-12">
                        <label className="w-25" htmlFor="customerId">Risk Profile:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          { customer.nonIndividualCustomer.riskProfileID
                          && riskProfile(customer.nonIndividualCustomer.riskProfileID)}
                        </div>
                      </div>
                    </div>
                    <div className="form-group ">
                      <div className="left-form-group other-input-section col-md-12">
                        <label className="w-25" htmlFor="customerId">Customer Type:</label>
                        <div
                          className="form-control-input col-md-8"
                        >
                          { customer.nonIndividualCustomer.custTypeID
                          && custType(customer.nonIndividualCustomer.custTypeID)}
                        </div>
                      </div>
                    </div>
                    <div className="submit-button-section">
                      <Link
                        type="button"
                        className="add-customer-btn"
                        to={{
                          pathname: `/updatenonindividualcustomer/${customer.nonIndividualCustomer.custID}`,
                        }}
                      >
                        Update
                      </Link>
                      <Link
                        type="button"
                        className="add-customer-btn"
                        to={{
                          pathname: '/nonindidualcustomerform',
                        }}
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null
            }

            <MoreInfo modalOpener={modalOpener} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonIndividualCustomerView;
