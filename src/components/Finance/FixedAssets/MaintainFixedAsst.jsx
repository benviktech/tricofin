/* eslint-disable no-restricted-globals */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FixedAssetsSidebar } from '../../Sidebar/Sidebar';
import './index.css';
import BehindScene from './BehindScene';

const initialState = {
  accountID: '',
  supplierID: '',
  serialNo: '',
  tagNo: '',
  brandName: '',
  location: '',
  depMthd: '',
  depRate: 0,
  costPrice: 0,
  terms: 0,
  residualValue: 0,
  depAmount: 0,
  disposalValue: 0,
  profitLoss: 0,
  netBookValue: 0,
  isBooked: true,
  tranID: 0,
  isDeleted: false,
  purchasedOn: '',
  depFrom: '',
  disposalDate: '',
};

const MaintainFixedAsset = () => {
  const [values, setValues] = useState(initialState);
  const [depMethods, setDepMethods] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [calculationMthds, setCalculationMthds] = useState([]);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetSystemDepreciationMethods')
      .then(response => setDepMethods(response?.data))
      .catch(error => error.message);
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetSuppliers')
      .then(response => setSuppliers(response?.data))
      .catch(error => error.message);
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetSystemCalculationMethods')
      .then(response => setCalculationMthds(response?.data))
      .catch(error => console.log(error.message));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (parseInt(values.terms, 10) > 0) {
      const result = (100 / parseInt(values.terms, 10)).toFixed(2);
      setValues({ ...values, depRate: result });
    } else { setValues({ ...values, depRate: 0 }); }
  }, [values.terms]);

  useEffect(() => {
    if (!isNaN(values.costPrice) && !isNaN(values.residualValue)) {
      const result = (values.costPrice - values.residualValue).toFixed(2);
      setValues({ ...values, depAmount: result });
    }
  }, [values.costPrice, values.residualValue]);

  console.log(calculationMthds, 'calculationMthds');
  const saveFixedAsset = () => console.log(values, 'values');

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Fixed Assets Maintenance</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <div className="back-button-section">
              <i
                className="fas fa-arrow-circle-left"
                style={{ fontSize: '20px', marginRight: '10px', cursor: 'pointer' }}
              />
            </div>
            <FixedAssetsSidebar />
          </div>
          <div className="submit-form-top-section">
            <div className="fixed-assets-product-info-section">
              <div className="fixed-assets-product-info-section-header">
                Product Info
              </div>
              <div className="fixed-assets-product-info-section-content">
                <div className="fixed-assets-product-info-section-first">
                  <div className="fixed-assets-product-info-section-label">Product ID:</div>
                  <input type="text" />
                </div>
                <div className="fixed-assets-product-info-section-first">
                  <div className="fixed-assets-product-info-section-label">Account Prefix:</div>
                  <input type="text" />
                </div>
                <div className="fixed-assets-product-info-section-first">
                  <div className="fixed-assets-product-info-section-label">Product Name:</div>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="fixed-assets-product-info-section">
              <div className="fixed-assets-product-info-section-header">
                Fixed Assets Details
              </div>
              <div className="fixed-assets-details-info-section-content">
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Branch:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <input type="text" />
                    <div className="fixed-assets-details-info-section-input-inner">BENVIK</div>
                  </div>
                </div>
                <div className="fixed-assets-details-info-section-first-two">
                  <div className="fixed-assets-details-info-section-label">Supplier:</div>
                  {
                    suppliers.length > 0 ? (
                      <select
                        name="supplierID"
                        value={values.supplierID}
                        onChange={handleChange}
                      >
                        <option value="" disabled selected hidden>Select</option>
                        {
                          suppliers.map(data => (
                            <option
                              key={data.supplierID}
                              value={data.supplierID}
                            >
                              {data.supplier}
                            </option>
                          ))
                        }
                      </select>
                    ) : (
                      <select>
                        <option value="" disabled selected hidden>Select</option>
                      </select>
                    )
                  }
                </div>
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Account ID:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <input onChange={handleChange} value={values.accountID} name="accountID" type="text" />
                    <div className="fixed-assets-details-info-section-input-inner">BENVIK</div>
                  </div>
                </div>
                <div className="fixed-assets-details-info-section-first-two">
                  <div className="fixed-assets-details-info-section-label">Serial #:</div>
                  <input value={values.serialNo} name="serialNo" onChange={handleChange} type="text" />
                </div>
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Brand Name:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <input value={values.brandName} name="brandName" onChange={handleChange} type="text" />
                    <div className="fixed-assets-details-info-section-input-inner-two">
                      <div className="fixed-assets-details-info-section-input-inner-div">Tag Number:</div>
                      <input value={values.tagNo} name="tagNo" onChange={handleChange} type="text" />
                    </div>
                  </div>
                </div>
                <div className="fixed-assets-details-info-section-first-two">
                  <div className="fixed-assets-details-info-section-label">Location:</div>
                  <input value={values.location} name="location" onChange={handleChange} type="text" />
                </div>
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Cost Price:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <input value={values.costPrice} name="costPrice" onChange={handleChange} type="text" />

                    <div className="fixed-assets-details-info-section-input-inner-two">
                      <div className="fixed-assets-details-info-section-input-inner-div">Dep Rate:</div>
                      <div className="fixed-assets-details-info-section-input-container">
                        <input value={values.depRate} name="depRate" disabled="true" type="text" />
                        <div className="fixed-assets-details-info-section-input-container-label">% P.M</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fixed-assets-details-info-section-first-two">
                  <div className="fixed-assets-details-info-section-label">Depreciation Mthd:</div>
                  {
                    depMethods.length > 0 ? (
                      <select
                        name="depMthd"
                        value={values.depMthd}
                        onChange={handleChange}
                      >
                        <option value="" disabled selected hidden>Select</option>
                        {
                          depMethods.map(data => (
                            <option
                              key={data.depMthdID}
                              value={data.depMthdID}
                            >
                              {data.depMthd}
                            </option>
                          ))
                        }
                      </select>
                    ) : (
                      <select>
                        <option value="" disabled selected hidden>Select</option>
                      </select>
                    )
                  }
                </div>
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Residual Value:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <input name="residualValue" onChange={handleChange} value={values.residualValue} type="text" />
                    <div className="fixed-assets-details-info-section-input-inner-two">
                      <div className="fixed-assets-details-info-section-input-inner-div">Useful Life / Terms:</div>
                      <div className="fixed-assets-details-info-section-input-container">
                        <input value={values.terms} name="terms" onChange={handleChange} type="text" />
                        <div className="fixed-assets-details-info-section-input-container-label">Months</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fixed-assets-details-info-section-first-two">
                  <div className="fixed-assets-details-info-section-label">Purchased On:</div>
                  <input onChange={handleChange} value={values.purchasedOn} name="purchasedOn" type="date" />
                </div>
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Amount to Depreciate:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <input value={values.depAmount} name="depAmount" onChange={handleChange} type="text" />
                    <div className="fixed-assets-details-info-section-input-inner-two">
                      <div className="fixed-assets-details-info-section-input-inner-div">Depreciation From:</div>
                      <input onChange={handleChange} value={values.depFrom} name="depFrom" type="date" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <BehindScene saveFixedAsset={saveFixedAsset} />
          </div>
        </div>
      </div>
    </div>

  );
};

export default MaintainFixedAsset;
