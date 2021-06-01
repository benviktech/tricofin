/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import '../Customer/index.css';
import Spinner from '../Spinner/Spinner';
import { fetchCountriesData } from '../../actions/pages';

const ContactInfo = ({
  header,
  submitForm,
  handleChange,
  values,
  errors,
  clearErrors,
  postError,
  modal,
  setModal,
  postSuccess,
  contactInfo,
  updateContact,
  setContactInfo,
}) => {
  const regions = [{ id: 'N', name: 'NORTHERN' },
    { id: 'E', name: 'EASTERN' },
    { id: 'C', name: 'CENTRAL' },
    { id: 'W', name: 'WESTERN' },
    { id: 'S', name: 'SOUTHERN' }];
  const [countries, setCountries] = useState([]);
  const [numErrors, setNumErrors] = useState({});
  const dispatch = useDispatch();
  const countriesData = useSelector(state => state.individualCustomerIdentification.countries);

  useEffect(async () => {
    await dispatch(fetchCountriesData());
  }, []);

  const handleUpdateChange = e => {
    const { name, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    setCountries(countriesData);
  }, [countriesData]);

  useEffect(() => {
    const results = {};
    if (contactInfo.plotStreetNo && isNaN(contactInfo.plotStreetNo)) {
      results.plotStreetNo = 'Must be number';
    }
    if (contactInfo.floorNo && isNaN(contactInfo.floorNo)) {
      results.floorNo = 'Must be number';
    }
    if (contactInfo.poBoxNo && isNaN(contactInfo.poBoxNo)) {
      results.poBoxNo = 'Must be number';
    }
    if (contactInfo.pnTelNo && isNaN(contactInfo.pnTelNo)) {
      results.pnTelNo = 'Must be number';
    }
    if (contactInfo.mobNo && isNaN(contactInfo.mobNo)) {
      results.mobNo = 'Must be number';
    }
    setNumErrors(results);
  }, [contactInfo]);

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>{header}</span>
          {
            postError.includes('5050') ? (
              <div className={`${modal} submit-error-section shadow`}>
                <i
                  className="far fa-times-circle"
                  onClick={() => setModal('d-none')}
                />
                Contact already exist
              </div>
            ) : Object.keys(postSuccess).length > 0 ? (
              <div className={`${modal} submit-error-section shadow text-success`}>
                <i
                  className="far fa-times-circle"
                  onClick={() => setModal('d-none')}
                />
                Contact Created Succesfully
              </div>
            ) : Object.keys(contactInfo).length > 0 ? (
              <div className={`${modal} submit-error-section shadow text-success`}>
                <i
                  className="far fa-times-circle"
                  onClick={() => setModal('d-none')}
                />
                {header.split(' ')[0]}
                {' '}
                Contact Exists
              </div>
            ) : null
          }
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <Sidebar />
          </div>
          <div className="submit-form-top-section">
            {
              countries.length > 0 ? (
                <form className="contact-info-section" onSubmit={submitForm}>
                  <div className="left-address-section">
                    <div className="building-name">
                      <div className="label-unit">Building Name:</div>
                      <div className="building-input">
                        {
                        Object.keys(contactInfo).length > 0 ? (
                          <input
                            type="text"
                            value={contactInfo.buildingName}
                            onChange={handleUpdateChange}
                            name="buildingName"
                          />
                        ) : (

                          <input
                            type="text"
                            value={values.buildingName}
                            onChange={handleChange}
                            name="buildingName"
                          />
                        )
                      }
                      </div>
                    </div>
                    <div className="building-name">
                      <div className="label-unit">LC/Street:</div>
                      <div className="building-input">
                        {
                          Object.keys(contactInfo).length > 0 ? (
                            <input
                              type="text"
                              value={contactInfo.lcStreetName}
                              onChange={handleUpdateChange}
                              name="lcStreetName"
                            />
                          ) : (
                            <input
                              type="text"
                              value={values.lcStreetName}
                              onChange={handleChange}
                              name="lcStreetName"
                            />
                          )
                        }
                      </div>
                    </div>
                    <div className="unit-floor-section">
                      <div className="label-unit">
                        Plot/Street No:
                      </div>
                      <div className="unit-section street-no-content">
                        {
                          Object.keys(contactInfo).length > 0 ? (
                            <input
                              autoComplete="off"
                              value={contactInfo.plotStreetNo}
                              onChange={handleUpdateChange}
                              name="plotStreetNo"
                              type="text"
                            />
                          ) : (
                            <input
                              autoComplete="off"
                              value={values.plotStreetNo}
                              onChange={handleChange}
                              name="plotStreetNo"
                              type="text"
                            />
                          )
                        }
                        <div className="floor-section street-no-content">
                          <div className="inner-label-unit">
                            Floor No:
                          </div>
                          {
                            Object.keys(contactInfo).length > 0 ? (
                              <input
                                autoComplete="off"
                                value={contactInfo.floorNo}
                                onChange={handleUpdateChange}
                                name="floorNo"
                                type="text"
                              />
                            ) : (
                              <input
                                autoComplete="off"
                                value={values.floorNo}
                                onChange={handleChange}
                                name="floorNo"
                                type="text"
                              />
                            )
                          }
                          <div className="floor-no-error">
                            {numErrors.floorNo && numErrors.floorNo}
                          </div>
                        </div>
                        <div className="street-no-error">
                          {numErrors.plotStreetNo && numErrors.plotStreetNo}
                        </div>
                      </div>
                    </div>
                    <div className="unit-floor-section">
                      <div className="label-unit">
                        Parish:
                      </div>
                      <div className="unit-section select-area">
                        {
                          Object.keys(contactInfo).length > 0 ? (
                            <input
                              autoComplete="off"
                              value={contactInfo.parish}
                              onChange={handleUpdateChange}
                              name="parish"
                              type="text"
                            />
                          ) : (
                            <input
                              value={values.parish}
                              onChange={handleChange}
                              name="parish"
                              type="text"
                            />
                          )
                        }
                        <div className="floor-section">
                          <div className="inner-label-unit">
                            Suburb:
                          </div>
                          {
                            Object.keys(contactInfo).length > 0 ? (
                              <input
                                value={contactInfo.suburb}
                                onChange={handleUpdateChange}
                                name="suburb"
                                type="text"
                              />
                            ) : (
                              <input
                                value={values.suburb}
                                onChange={handleChange}
                                name="suburb"
                                type="text"
                              />
                            )
                          }
                        </div>
                      </div>
                    </div>
                    <div className="unit-floor-section">
                      <div className="label-unit">
                        Village:
                      </div>
                      <div className="unit-section select-area">
                        {
                          Object.keys(contactInfo).length > 0 ? (
                            <input
                              value={contactInfo.village}
                              onChange={handleUpdateChange}
                              name="village"
                              type="text"
                            />
                          ) : (
                            <input
                              value={values.village}
                              onChange={handleChange}
                              name="village"
                              type="text"
                            />
                          )
                        }
                        <div className="floor-section">
                          <div className="inner-label-unit">
                            County/Town:
                          </div>
                          {
                            Object.keys(contactInfo).length > 0 ? (
                              <input
                                value={contactInfo.countyTown}
                                onChange={handleUpdateChange}
                                name="countyTown"
                                type="text"
                              />
                            ) : (
                              <input
                                value={values.countyTown}
                                onChange={handleChange}
                                name="countyTown"
                                type="text"
                              />
                            )
                          }
                        </div>
                      </div>
                    </div>
                    <div className="building-name">
                      <div className="label-unit">District:</div>
                      <div className="building-input">
                        {
                          Object.keys(contactInfo).length > 0 ? (
                            <input
                              value={contactInfo.district}
                              onChange={handleUpdateChange}
                              name="district"
                              type="text"
                            />
                          ) : (
                            <input
                              value={values.district}
                              onChange={handleChange}
                              name="district"
                              type="text"
                            />
                          )
                        }
                      </div>
                    </div>
                    <div className="building-name">
                      <div className="label-unit">Region:</div>
                      <div className="building-input">
                        {
                          Object.keys(contactInfo).length > 0 ? (
                            <select
                              onChange={handleUpdateChange}
                              name="region"
                              value={contactInfo.region
                                && (contactInfo.region === 'N' ? 'NORTHERN'
                                  : contactInfo.region === 'S' ? 'SOUTHERN'
                                    : contactInfo.region === 'W' ? 'WESTERN'
                                      : contactInfo.region === 'E' ? 'EASTERN'
                                        : contactInfo.region === 'C' ? 'CENTRAL'
                                          : null)}
                            >
                              <option value="" disabled selected hidden>Select</option>
                              {
                                regions.map(region => (
                                  <option
                                    key={region.id}
                                    value={region.name}
                                  >
                                    {region.name}
                                  </option>
                                ))
                              }
                            </select>
                          ) : (
                            <select
                              onChange={handleChange}
                              name="region"
                              value={values.region}
                            >
                              <option value="" disabled selected hidden>Select</option>
                              {
                            regions.map(region => (
                              <option
                                key={region.id}
                                value={region.name}
                              >
                                {region.name}
                              </option>
                            ))
                          }
                            </select>
                          )
                        }
                      </div>
                    </div>
                    <div className="building-name">
                      <div className="label-unit">Country:</div>
                      <div className="building-input">
                        {
                          Object.keys(contactInfo).length > 0 ? (
                            <select
                              onChange={handleUpdateChange}
                              name="countryCode"
                              value={contactInfo.countryCode}
                            >
                              <option value="" disabled selected hidden>Select</option>
                              {
                                countries.map((country, index) => (
                                  <option
                                    key={index}
                                    value={country.countryID}
                                  >
                                    {country.country}
                                  </option>
                                ))
                              }
                            </select>
                          ) : (
                            <select
                              onChange={handleChange}
                              name="countryCode"
                              value={values.countryCode}
                            >
                              <option value="" disabled selected hidden>Select</option>
                              {
                            countries.map((country, index) => (
                              <option
                                key={index}
                                value={country.countryID}
                              >
                                {country.country}
                              </option>
                            ))
                          }
                            </select>
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div className="right-address-section">
                    <div className="unit-floor-section street-no-content">
                      <div className="label-unit unit-left-section">
                        P.O Box No:
                      </div>
                      <div className="unit-section unit-right-section">
                        {
                          Object.keys(contactInfo).length > 0 ? (
                            <input
                              autoComplete="off"
                              value={contactInfo.poBoxNo}
                              name="poBoxNo"
                              onChange={handleUpdateChange}
                              type="text"
                            />
                          ) : (
                            <input
                              autoComplete="off"
                              value={values.poBoxNo}
                              name="poBoxNo"
                              onChange={handleChange}
                              type="text"
                            />
                          )
                        }
                        <div className="floor-section lower-floor-section">
                          <div className="inner-label-unit">
                            Post Office Town:
                          </div>
                          {
                            Object.keys(contactInfo).length > 0 ? (
                              <input
                                value={contactInfo.postOfficeTown}
                                name="postOfficeTown"
                                onChange={handleUpdateChange}
                                type="text"
                              />
                            ) : (
                              <input
                                value={values.postOfficeTown}
                                name="postOfficeTown"
                                onChange={handleChange}
                                type="text"
                              />
                            )
                          }
                        </div>
                        <div className="office-no-error">
                          {numErrors.poBoxNo && numErrors.poBoxNo}
                        </div>
                      </div>
                    </div>
                    <div className="unit-floor-section">
                      <div className="label-unit unit-left-section">
                        Been At Address Since
                        <span className="text-danger mx-1">
                          *
                        </span>
                        :
                      </div>
                      <div className="unit-section unit-right-section street-no-content">
                        <div className="lower-floor-section">
                          {
                            Object.keys(contactInfo).length > 0 ? (
                              <input
                                value={contactInfo.atAddressSince}
                                name="atAddressSince"
                                onChange={handleUpdateChange}
                                type="date"
                              />
                            ) : (
                              <input
                                value={values.atAddressSince}
                                name="atAddressSince"
                                onChange={handleChange}
                                type="date"
                              />
                            )
                          }
                        </div>
                        <div className="street-no-error">
                          {errors.atAddressSince && errors.atAddressSince}
                        </div>
                      </div>
                    </div>
                    <div className="unit-floor-section">
                      <div className="label-unit unit-left-section">
                        Primary Tel No:
                      </div>
                      <div className="unit-section unit-right-section street-no-content">
                        {
                          Object.keys(contactInfo).length > 0 ? (
                            <input
                              autoComplete="off"
                              value={contactInfo.pnTelNo}
                              name="pnTelNo"
                              onChange={handleUpdateChange}
                              type="text"
                            />
                          ) : (
                            <input
                              autoComplete="off"
                              value={values.pnTelNo}
                              name="pnTelNo"
                              onChange={handleChange}
                              type="text"
                            />
                          )
                        }
                        <div className="floor-section lower-floor-section street-no-content">
                          <div className="inner-label-unit">
                            Mobile No:
                          </div>
                          {
                            Object.keys(contactInfo).length > 0 ? (
                              <input
                                autoComplete="off"
                                value={contactInfo.mobNo}
                                name="mobNo"
                                onChange={handleUpdateChange}
                                type="text"
                              />
                            ) : (
                              <input
                                autoComplete="off"
                                value={values.mobNo}
                                name="mobNo"
                                onChange={handleChange}
                                type="text"
                              />
                            )
                          }
                          <div className="floor-no-error">
                            {numErrors.mobNo && numErrors.mobNo}
                          </div>
                        </div>
                        <div className="street-no-error">
                          {numErrors.pnTelNo && numErrors.pnTelNo}
                        </div>
                      </div>
                    </div>
                    <div className="unit-floor-section">
                      <div className="label-unit unit-left-section">
                        Email Address:
                      </div>
                      <div className="unit-section unit-right-section">
                        <div className="lower-floor-section ">
                          {
                            Object.keys(contactInfo).length > 0 ? (
                              <input
                                value={contactInfo.emailAddress}
                                name="emailAddress"
                                onChange={handleUpdateChange}
                                type="input"
                              />
                            ) : (
                              <input
                                value={values.emailAddress}
                                name="emailAddress"
                                onChange={handleChange}
                                type="input"
                              />
                            )
                          }
                        </div>
                      </div>
                    </div>
                    <div className="unit-floor-section">
                      <div className="label-unit unit-left-section">
                        Website:
                      </div>
                      <div className="unit-section unit-right-section">
                        <div className="lower-floor-section ">
                          {
                            Object.keys(contactInfo).length > 0 ? (
                              <input
                                value={contactInfo.website}
                                name="website"
                                onChange={handleUpdateChange}
                                type="input"
                              />
                            ) : (
                              <input
                                value={values.website}
                                name="website"
                                onChange={handleChange}
                                type="input"
                              />
                            )
                          }
                        </div>
                      </div>
                    </div>
                    <div className="add-form-data-button">
                      {
                        Object.keys(contactInfo).length > 0 ? (
                          <button
                            type="button"
                            onClick={updateContact}
                          >
                            Update
                          </button>
                        ) : (
                          <button
                            type="submit"
                          >
                            Add
                          </button>
                        )
                      }
                      <button
                        type="button"
                        onClick={clearErrors}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="contact-info-section align-spinner-two">
                  <Spinner />
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
