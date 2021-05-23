/* eslint-disable  react/no-array-index-key */
/* eslint-disable  jsx-a11y/control-has-associated-label */
/* eslint-disable  no-nested-ternary */

import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import '../Customer/index.css';
import Spinner from '../Spinner/Spinner';
import { getCustomerIdentification, postCustomerIdentification } from '../../actions/pages';

const Indentification = () => {
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [isCountry, setIsCountry] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [staticData, setStaticData] = useState({});
  const [IDTypes, setIDTypes] = useState([]);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

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
  };

  useEffect(() => {
    if (Object.values(errors).length === 0) {
      const data = {
        custID: id,
        idCode: parseInt(idType, 10),
        idNo: idNumber,
        countryID: isCountry,
        createdBy: 'BENVIK',
        createdOn: (new Date()).toISOString(),
        modifiedBy: 'BENVIK',
        modifiedOn: (new Date()).toISOString(),
      };

      dispatch(postCustomerIdentification(data, history));
      setIdNumber('');
      setIsCountry('');
      setIssueDate('');
      setIdType('');
    }
  }, [errors]);

  const clearErrors = () => {
    setErrors({
      idNumber: '',
      idType: '',
      isCountry: '',
      issueDate: '',
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetStaticData')
        .then(response => {
          setStaticData(response.data);
          axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetIdentificationTypes')
            .then(response => setIDTypes(response.data))
            .catch(error => console.log(error.message));
        }).catch(error => console.log(error.message));
    };
    fetchData();
  }, []);

  const identificationData = useSelector(state => state.individualCustomerIdentification);

  useEffect(() => {
    dispatch(getCustomerIdentification(id));
  }, []);

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
          {
            Object.keys(staticData).length > 0 ? (
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
                            IDTypes.map((type, index) => (
                              <option key={index} value={type.idCode}>
                                {type.identificationType}
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
                            staticData.nationality.map((country, index) => (
                              <option key={index} value={country.nationalityID}>
                                {country.description}
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
                      Object.keys(identificationData.indentifications).length > 0 ? (
                        identificationData.indentifications.map((content, index) => (
                          <div className="middle-section" key={index}>
                            <div className="idcode-section-inner first-border-left">
                              {content.idCode}
                            </div>
                            <div className="idcode-section-inner">
                              {content.idCode === 1 ? 'TIN NUMBER'
                                : content.idCode === 2 ? 'KACITA NUMBER'
                                  : content.idCode === 3 ? 'NATIONAL ID'
                                    : content.idCode === 4 ? 'PASSPORT NUMBER'
                                      : content.idCode === 5 ? 'DRIVERS LICENSE'
                                        : content.idCode === 6 ? 'VOTERS ID'
                                          : content.idCode === 7 ? 'NSSF NUMBER'
                                            : content.idCode === 8 ? 'POLICE ID'
                                              : content.idCode === 9 ? 'UPDF NUMBER'
                                                : content.idCode === 10 ? 'PENSION NUMBER'
                                                  : content.idCode === 11 ? 'TEACHER REGNO'
                                                    : 'NIN'}
                            </div>
                            <div className="idcode-section-inner">
                              {content.idNo}
                            </div>
                            <div className="idcode-section-inner">
                              {content.countryID}
                            </div>
                            <div className="idcode-section-inner">
                              {content.countryID === 'IN' ? 'INDIA'
                                : content.countryID === 'KE' ? 'KENYA'
                                  : content.countryID === 'NG' ? 'NIGERIA'
                                    : content.countryID === 'RW' ? 'RWANDA'
                                      : content.countryID === 'TZ' ? 'TANZANIA'
                                        : content.countryID === 'UG' ? 'UGANDA'
                                          : 'NIN'}
                            </div>
                            <div className="idcode-section-inner">
                              {(content.createdOn).split('T')[0].split('-')[1] === '01'
                                ? (content.createdOn).split('T')[0].split('-').reverse().join('/').replace('01', 'Jan')
                                : (content.createdOn).split('T')[0].split('-')[1] === '02'
                                  ? (content.createdOn).split('T')[0].split('-').reverse().join('/').replace('02', 'Feb')
                                  : (content.createdOn).split('T')[0].split('-')[1] === '03'
                                    ? (content.createdOn).split('T')[0].split('-').reverse().join('/').replace('03', 'Mar')
                                    : (content.createdOn).split('T')[0].split('-')[1] === '04'
                                      ? (content.createdOn).split('T')[0].split('-').reverse().join('/').replace('04', 'Apr')
                                      : (content.createdOn).split('T')[0].split('-')[1] === '05'
                                        ? (content.createdOn).split('T')[0].split('-').reverse().join('/').replace('05', 'May')
                                        : (content.createdOn).split('T')[0].split('-')[1] === '06'
                                          ? (content.createdOn).split('T')[0].split('-').reverse().join('/').replace('06', 'Jun')
                                          : (content.createdOn).split('T')[0].split('-')[1] === '07'
                                            ? (content.createdOn).split('T')[0].split('-').reverse().join('/').replace('07', 'Jul')
                                            : (content.createdOn).split('T')[0].split('-')[1] === '08'
                                              ? (content.createdOn).split('T')[0].split('-').reverse().join('/').replace('08', 'Aug')
                                              : (content.createdOn).split('T')[0].split('-')[1] === '09'
                                                ? (content.createdOn).split('T')[0].split('-').reverse().join('/').replace('09', 'Sep')
                                                : (content.createdOn).split('T')[0].split('-')[1] === '10'
                                                  ? (content.createdOn).split('T')[0].split('-').reverse().join('/').replace('10', 'Oct')
                                                  : (content.createdOn).split('T')[0].split('-')[1] === '11'
                                                    ? (content.createdOn).split('T')[0].split('-').reverse().join('/').replace('11', 'Nov')
                                                    : (content.createdOn).split('T')[0].split('-')[1] === '12'
                                                      ? (content.createdOn).split('T')[0].split('-').reverse().join('/').replace('12', 'Dec')
                                                      : null }
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="middle-section">
                          Loading
                        </div>
                      )

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
            ) : (
              <div className="submit-form-top-section align-spinner">
                <Spinner />
              </div>
            )
          }

        </div>
      </div>
    </div>
  );
};

export default Indentification;
