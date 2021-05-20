/* eslint-disable  react/no-array-index-key */
/* eslint-disable  jsx-a11y/control-has-associated-label */

import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import '../Customer/index.css';

const Indentification = () => {
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [isCountry, setIsCountry] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [errors, setErrors] = useState({});

  const submitData = e => {
    e.preventDefault();
    const value = {};
    if (!idNumber.trim()) {
      value.idNumber = 'ID Number is required';
    }

    if (!idType.trim()) {
      value.idType = 'ID Type is Required';
    }

    if (!isCountry.trim()) {
      value.isCountry = 'Country is Required';
    }

    if (!issueDate.trim()) {
      value.issueDate = 'Issue Date is Required';
    }

    setErrors(value);

    if (Object.keys(errors).length === 0) {
      console.log({
        idType, idNumber, isCountry, issueDate,
      });
    }
  };

  const clearErrors = () => {
    setErrors({});
    setIdType('');
    setIdNumber('');
    setIsCountry('');
    setIssueDate('');
  };

  const idTypes = [
    { type: 'FSCNo', value: 'FC' },
    { type: 'TIN No', value: 'TN' },
    { type: 'National ID', value: 'NIN' },
    { type: 'Passport No', value: 'PP' },
    { type: 'Drivers License No', value: 'LN' },
    { type: 'Drivers Permit No', value: 'DP' },
    { type: 'Voters ID', value: 'VID' },
    { type: 'NSSF No', value: 'NSSF' },
    { type: 'Police ID', value: 'PID' },
    { type: 'UPDF No', value: 'UPDF' },
    { type: 'Pension No', value: 'PN' },
    { type: 'TEACHER REGNO', value: 'TR' },
  ];

  const countries = [
    { type: 'UGANDA', value: 'UG' },
    { type: 'KENYA', value: 'KY' },
    { type: 'TANZANIA', value: 'TZ' },
    { type: 'RWANDA', value: 'RW' },
    { type: 'SUDAN', value: 'SD' },
    { type: 'SOUTH SUDAN', value: 'SSD' },
    { type: 'NIGERIA', value: 'NG' },
  ];

  const formContent = [
    {
      IDcode: '03',
      ID: 'TIN No',
      IDNo: '4444',
      CountryID: 'UG',
      Country: 'UGANDA',
      ExpriryDate: '30/Apr/2021',
    },
    {
      IDcode: '07',
      ID: 'UPDF',
      IDNo: '45272',
      CountryID: 'TZ',
      Country: 'TANZANIA',
      ExpriryDate: '3/June/2021',
    },
    {
      IDcode: '21',
      ID: 'NSSF',
      IDNo: '9036',
      CountryID: 'RW',
      Country: 'RWANDA',
      ExpriryDate: '02/Aug/2021',
    },
  ];
  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Identification Section Section</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <Sidebar />
          </div>
          <form onSubmit={submitData} className="submit-form-top-section">
            <div className="identification-section">
              <div className="upper-inputs-section">
                <div className="top-inputs-section">
                  <div className="id-type-section">
                    <div className="input-label">
                      ID Types:
                    </div>
                    <select
                      onChange={e => setIdType(e.target.value)}
                      value={idType}
                      className="select-option"
                    >
                      <option value="" disabled selected hidden>Select</option>
                      {
                      idTypes.map((type, index) => (
                        <option key={index} value={type.value}>
                          {type.type}
                        </option>
                      ))
                    }
                    </select>
                    <div className="error-section">
                      {
                        Object.keys(errors).includes('idType')
                          ? errors.idType : null
                      }
                    </div>
                  </div>
                  <div className="id-number-section">
                    <div className="id-input-label">ID No:</div>
                    <input
                      value={idNumber}
                      onChange={e => setIdNumber(e.target.value)}
                      type="text"
                    />
                    <div className="error-section">
                      {
                        Object.keys(errors).includes('idNumber')
                          ? errors.idNumber : null
                      }
                    </div>
                  </div>
                </div>
                <div className="bottom-input-section">
                  <div className="id-type-section">
                    <div className="input-label">
                      Country of Issue:
                    </div>
                    <select
                      onChange={e => setIsCountry(e.target.value)}
                      value={isCountry}
                      className="select-option"
                    >
                      <option value="" disabled selected hidden>Select</option>
                      {
                      countries.map((country, index) => (
                        <option key={index} value={country.value}>
                          {country.type}
                        </option>
                      ))
                    }
                    </select>
                    <div className="error-section">
                      {
                        Object.keys(errors).includes('isCountry')
                          ? errors.isCountry : null
                      }
                    </div>
                  </div>
                  <div className="id-number-section">
                    <div className="input-label">
                      Expiry Date:
                    </div>
                    <input
                      value={issueDate}
                      onChange={e => setIssueDate(e.target.value)}
                      type="date"
                    />
                    <div className="error-section">
                      {
                        Object.keys(errors).includes('issueDate')
                          ? errors.issueDate : null
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="identification-listing">
              <div className="top-section">
                <div className="idcode-section">
                  IDCode
                </div>
                <div className="idcode-section">
                  ID
                </div>
                <div className="idcode-section">
                  IDNo
                </div>
                <div className="idcode-section">
                  CountryID
                </div>
                <div className="idcode-section">
                  Country
                </div>
                <div className="idcode-section">
                  ExpiryDate
                </div>
              </div>
              <div className="out-form-loop">
                {
                formContent.map((content, index) => (
                  <div className="middle-section" key={index}>
                    <div className="idcode-section-inner first-border-left">
                      {content.IDcode}
                    </div>
                    <div className="idcode-section-inner">
                      {content.ID}
                    </div>
                    <div className="idcode-section-inner">
                      {content.IDNo}
                    </div>
                    <div className="idcode-section-inner">
                      {content.CountryID}
                    </div>
                    <div className="idcode-section-inner">
                      {content.Country}
                    </div>
                    <div className="idcode-section-inner">
                      {content.ExpriryDate}
                    </div>
                  </div>
                ))
              }
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
        </div>
      </div>
    </div>
  );
};

export default Indentification;
