/* eslint-disable react/no-array-index-key */
/* eslint-disable  jsx-a11y/click-events-have-key-events */
/* eslint-disable  jsx-a11y/no-static-element-interactions */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { GeneralLedgerSidebar } from '../../Sidebar/Sidebar';
import IdModal from './IdModal';
import { saveGeneralLedgerID } from '../../../actions/generalLedger';
import fetchData from './fetchData';

const initialState = {
  glMainType: '',
  name: '',
  glSubType: '',
};

const GeneralLedgerIds = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialState);
  const [sortedList, setSortedList] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    glTypes, glSubTypes,
    searchIndividualCustomer,
    searchedCustomer,
    finalSortedList,
    setSearchedCustomer,
  } = fetchData();

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const submitData = e => {
    e.preventDefault();
    const formErrors = {};
    formErrors.state = 'Creating';
    if (!values.glMainType) {
      formErrors.glMainType = 'GL type required';
    }
    if (!values.name) {
      formErrors.name = 'Name is required';
    }
    if (!values.glSubType) {
      formErrors.glSubType = 'GL sub type is required';
    }
    setErrors(formErrors);
  };

  useEffect(() => {
    if (Object.values(errors).includes('Creating')) {
      if (Object.keys(errors).length === 1) {
        dispatch(saveGeneralLedgerID(values, history));
      }
    }
  }, [errors]);

  const cancelSubmit = () => {
    setValues(initialState);
    setErrors({});
    setSearchedCustomer('');
  };

  useEffect(() => {
    if (glSubTypes.length > 0) {
      setSortedList(glSubTypes.filter(element => element.glTypeID === values.glMainType));
    }
  }, [values]);

  useEffect(() => {
    setValues({
      ...values,
      glMainType: 'A',
    });
  }, [glSubTypes]);

  const routeBack = () => history.goBack();

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>GL Sub Types Data Entry</span>
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
            <GeneralLedgerSidebar />
          </div>
          <div className="submit-form-top-section">
            <form className="ledger-form-ledger" onSubmit={submitData}>
              <div className="subtypes-body-section mb-3">
                <div className="left-subtypes-section">
                  <div className="left-inner-subtypes-section">
                    <div className="left-subtypes-span">Search GL:</div>
                    <div className="left-subtypes-input">
                      <input
                        autoComplete="off"
                        name="description"
                        type="text"
                        value={searchedCustomer}
                        onChange={searchIndividualCustomer}
                      />
                      {
                           searchedCustomer === '' ? (
                             <div className="modal-hide-section" />
                           ) : (

                             <div className="modal-popup-section">
                               <div className="inner-section-modal-section">
                                 {
                                Array.from(new Set(finalSortedList)).map(customer => (
                                  <Link
                                    exact
                                    to={{
                                      pathname: `/genlidentification/${customer.glid}`,
                                    }}
                                    className="inner-section-modal-section-inner border"
                                    key={customer.glid}
                                  >
                                    <div className="modal-customer-name-section mr-2">
                                      { customer.glid }
                                    </div>
                                    <div className="modal-customer-name-section mr-2">
                                      { customer.glName }
                                    </div>
                                  </Link>
                                ))
                              }
                               </div>
                             </div>
                           )
                        }
                    </div>
                  </div>
                  <div className="left-inner-subtypes-section mt-4">
                    <div className="left-subtypes-span">GL Type:</div>
                    <div className="left-subtypes-input">
                      {
                          glTypes.length > 0 ? (
                            <select
                              name="glMainType"
                              onChange={handleChange}
                              value={values.glMainType}
                              className="w-100"
                            >
                              <option value="" disabled selected hidden>Select </option>
                              {
                                glTypes.map((type, index) => (
                                  <option
                                    key={index}
                                    value={type.glTypeID}
                                  >
                                    {type.glType}
                                  </option>
                                ))
                              }
                            </select>
                          ) : (
                            <select className="w-100">
                              <option value="" disabled selected hidden>Select </option>
                            </select>
                          )
                      }
                      <div className="form-error-section">
                        { errors.glMainType && errors.glMainType}
                        {' '}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-subtypes-section">
                  <div className="right-inner-subtypes-section">
                    <div className="right-subtypes-span">GL Name:</div>
                    <div className="right-subtypes-input">
                      <input
                        autoComplete="off"
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                        type="text"
                      />
                      <div className="form-error-section">
                        { errors.name && errors.name}
                        {' '}
                      </div>
                    </div>
                  </div>
                  <div className="right-inner-subtypes-section mt-4">
                    <div className="right-subtypes-span">GL Sub Types:</div>
                    <div className="right-subtypes-input">
                      {
                          sortedList.length > 0 ? (
                            <select
                              name="glSubType"
                              className="w-100"
                              onChange={handleChange}
                              value={values.glSubType}
                            >
                              <option value="" disabled selected hidden>Select </option>
                              {
                                sortedList.map((subType, index) => (
                                  <option
                                    key={index}
                                    value={subType.glSubTypeID}
                                  >
                                    {subType.glSubType}
                                  </option>
                                ))
                              }
                            </select>
                          ) : (
                            <select className="w-100">
                              <option value="" disabled selected hidden>Select </option>
                            </select>
                          )
                      }
                      <div className="form-error-section">
                        { errors.glSubType && errors.glSubType}
                        {' '}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="submit-section">
                <button type="submit"> Add </button>
                <button type="button" onClick={cancelSubmit}> Cancel </button>
              </div>
            </form>
            <IdModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralLedgerIds;
