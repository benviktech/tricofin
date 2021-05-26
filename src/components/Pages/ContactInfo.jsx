/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import '../Customer/index.css';
import Spinner from '../Spinner/Spinner';

const ContactInfo = ({
  header, submitForm, handleChange, values, errors, clearErrors, postError, modal, setModal,
}) => {
  const regions = [{ id: 1, name: 'NORTHERN' },
    { id: 2, name: 'EASTERN' },
    { id: 3, name: 'CENTRAL' },
    { id: 4, name: 'WESTERN' },
    { id: 5, name: 'SOUTHERN' }];
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetCountries');
      if (response.data) {
        setCountries(response.data);
      }
    };
    fetchData();
  }, []);

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
                        <input
                          type="text"
                          value={values.buildingName}
                          onChange={handleChange}
                          name="buildingName"
                        />
                      </div>
                    </div>
                    <div className="building-name">
                      <div className="label-unit">LC/Street:</div>
                      <div className="building-input">
                        <input
                          type="text"
                          value={values.lcStreetName}
                          onChange={handleChange}
                          name="lcStreetName"
                        />
                      </div>
                    </div>
                    <div className="unit-floor-section">
                      <div className="label-unit">
                        Plot/Street No:
                      </div>
                      <div className="unit-section street-no-content">
                        <input
                          value={values.plotStreetNo}
                          onChange={handleChange}
                          name="plotStreetNo"
                          type="text"
                        />
                        <div className="floor-section street-no-content">
                          <div className="inner-label-unit">
                            Floor No:
                          </div>
                          <input
                            value={values.floorNo}
                            onChange={handleChange}
                            name="floorNo"
                            type="text"
                          />
                          <div className="floor-no-error">
                            {errors.floorNo && errors.floorNo}
                          </div>
                        </div>
                        <div className="street-no-error">
                          {errors.plotStreetNo && errors.plotStreetNo}
                        </div>
                      </div>
                    </div>
                    <div className="unit-floor-section">
                      <div className="label-unit">
                        Parish:
                      </div>
                      <div className="unit-section select-area">
                        <input
                          value={values.parish}
                          onChange={handleChange}
                          name="parish"
                          type="text"
                        />
                        <div className="floor-section">
                          <div className="inner-label-unit">
                            Suburb:
                          </div>
                          <input
                            value={values.suburb}
                            onChange={handleChange}
                            name="suburb"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="unit-floor-section">
                      <div className="label-unit">
                        Village:
                      </div>
                      <div className="unit-section select-area">
                        <input
                          value={values.village}
                          onChange={handleChange}
                          name="village"
                          type="text"
                        />
                        <div className="floor-section">
                          <div className="inner-label-unit">
                            County/Town:
                          </div>
                          <input
                            value={values.countyTown}
                            onChange={handleChange}
                            name="countyTown"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="building-name">
                      <div className="label-unit">District:</div>
                      <div className="building-input">
                        <input
                          value={values.district}
                          onChange={handleChange}
                          name="district"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="building-name">
                      <div className="label-unit">Region:</div>
                      <div className="building-input">
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
                      </div>
                    </div>
                    <div className="building-name">
                      <div className="label-unit">Country:</div>
                      <div className="building-input">
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
                      </div>
                    </div>
                  </div>
                  <div className="right-address-section">
                    <div className="unit-floor-section street-no-content">
                      <div className="label-unit unit-left-section">
                        P.O Box No:
                      </div>
                      <div className="unit-section unit-right-section">
                        <input
                          value={values.poBoxNo}
                          name="poBoxNo"
                          onChange={handleChange}
                          type="text"
                        />
                        <div className="floor-section lower-floor-section">
                          <div className="inner-label-unit">
                            Post Office Town:
                          </div>
                          <input
                            value={values.postOfficeTown}
                            name="postOfficeTown"
                            onChange={handleChange}
                            type="text"
                          />
                        </div>
                        <div className="office-no-error">
                          {errors.poBoxNo && errors.poBoxNo}
                        </div>
                      </div>
                    </div>
                    <div className="unit-floor-section">
                      <div className="label-unit unit-left-section">
                        Been At Address Since:
                      </div>
                      <div className="unit-section unit-right-section street-no-content">
                        <div className="lower-floor-section">
                          <input
                            value={values.atAddressSince}
                            name="atAddressSince"
                            onChange={handleChange}
                            type="date"
                          />
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
                        <input
                          value={values.pnTelNo}
                          name="pnTelNo"
                          onChange={handleChange}
                          type="text"
                        />
                        <div className="floor-section lower-floor-section street-no-content">
                          <div className="inner-label-unit">
                            Mobile No:
                          </div>
                          <input
                            value={values.mobNo}
                            name="mobNo"
                            onChange={handleChange}
                            type="text"
                          />
                          <div className="floor-no-error">
                            {errors.mobNo && errors.mobNo}
                          </div>
                        </div>
                        <div className="street-no-error">
                          {errors.pnTelNo && errors.pnTelNo}
                        </div>
                      </div>
                    </div>
                    <div className="unit-floor-section">
                      <div className="label-unit unit-left-section">
                        Email Address:
                      </div>
                      <div className="unit-section unit-right-section">
                        <div className="lower-floor-section ">
                          <input
                            value={values.emailAddress}
                            name="emailAddress"
                            onChange={handleChange}
                            type="input"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="unit-floor-section">
                      <div className="label-unit unit-left-section">
                        Website:
                      </div>
                      <div className="unit-section unit-right-section">
                        <div className="lower-floor-section ">
                          <input
                            value={values.website}
                            name="website"
                            onChange={handleChange}
                            type="input"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="add-form-data-button">
                      <button
                        type="submit"
                      >
                        Add
                      </button>
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
