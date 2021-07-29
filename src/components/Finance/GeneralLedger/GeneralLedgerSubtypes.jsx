/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { GeneralLedgerSidebar } from '../../Sidebar/Sidebar';
import './index.css';
import { getGeneralLedgerSubTypes, postGeneralLedgerSubTypes } from '../../../actions/generalLedger';
import UpdateSubtype from './UpdateSubtype';

const GeneralLedgerSubtypes = () => {
  const [glTypes, setGlTypes] = useState([]);
  const [currentType, setCurrentType] = useState('');
  const [sortedList, setSortedList] = useState([]);
  const [errors, setErrors] = useState({});
  const [typeUpdate, setTypeUpdate] = useState({});
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://tricofin.azurewebsites.net/api/Finance/GetGeneralLedgerTypes')
        .then(response => setGlTypes(response.data))
        .catch(error => console.log(error.message));
    };
    fetchData();
  }, []);

  const subTypeList = useSelector(state => state.generalLedgerReducer.subTypeList);

  useEffect(() => {
    dispatch(getGeneralLedgerSubTypes());
  }, []);

  const initialState = {
    subtype: '',
    description: '',
  };

  const [values, setValues] = useState(initialState);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const submitData = e => {
    e.preventDefault();
    const errorValue = {};
    errorValue.state = 'Creating';
    if (!values.subtype) {
      errorValue.subtype = 'Subtype is required';
    }
    if (!values.description) {
      errorValue.description = 'Description is required';
    }

    setErrors(errorValue);
  };

  useEffect(() => {
    if (Object.values(errors).includes('Creating')) {
      if (Object.keys(errors).length === 1) {
        dispatch(postGeneralLedgerSubTypes(values));
        setValues({ ...values, description: '' });
      }
    }
  }, [errors]);

  useEffect(() => {
    if (values.subtype.length > 0) {
      glTypes.forEach(val => {
        if (val.glTypeID === values.subtype) {
          setCurrentType(val.glShortCode);
        }
      });
      if (subTypeList.length > 0) {
        setSortedList(subTypeList.filter(element => element.glTypeID === values.subtype));
      }
    }
  }, [values.subtype, subTypeList]);

  const updateSubType = element => {
    setModal(true);
    setTypeUpdate(element);
  };

  return (
    <div className="individual-customer-form">
      { modal ? (<UpdateSubtype typeUpdate={typeUpdate} setModal={setModal} />) : null }
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>GL Sub Types Data Entry</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <GeneralLedgerSidebar />
          </div>
          <div className="submit-form-top-section">
            <form className="ledger-form-ledger" onSubmit={submitData}>
              <div className="subtypes-body-section mb-3">
                <div className="left-subtypes-section">
                  <div className="left-inner-subtypes-section">
                    <div className="left-subtypes-span">GL Types:</div>
                    <div className="left-subtypes-input display-current-type">
                      {
                        glTypes.length > 0 ? (
                          <select
                            name="subtype"
                            onChange={handleChange}
                            value={values.subtype}
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
                          <select>
                            <option value="" disabled selected hidden>Select </option>
                          </select>
                        )
                    }
                      <div className="current-type-number">{ currentType }</div>
                      <div className="form-error-section">
                        { errors.subtype && errors.subtype}
                        {' '}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-subtypes-section">
                  <div className="right-inner-subtypes-section">
                    <div className="right-subtypes-span">Sub Types Description:</div>
                    <div className="right-subtypes-input">
                      <input
                        name="description"
                        onChange={handleChange}
                        value={values.description}
                        type="text"
                      />
                      <div className="form-error-section">
                        { errors.description && errors.description}
                        {' '}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sub-types-listing">
                <div className="gl-listing-header">
                  GL SubTypes Listing
                </div>
                <div className="gl-listing-body">
                  <div className="gl-inner-listing-header">
                    <div className="listing-id-section">GL SubType ID</div>
                    <div className="listing-type-section">GL SubType</div>
                    <div className="listing-type-section listing-type-section-last" />
                  </div>
                  {
                    sortedList.length === 0
                      ? (
                        <div className="main-gl-listing-section folder-center">
                          <i className="far fa-folder-open" />
                        </div>
                      )
                      : (
                        <div className="listing-container">
                          {
                            sortedList.map(el => (
                              <div key={el.glSubTypeID} className="main-gl-listing-section">
                                <div className="listing-id-section listing-loop-one">{el.glSubTypeID}</div>
                                <div className="listing-type-section listing-loop-two">{el.glSubType}</div>
                                <div className="listing-sort-section  listing-loop-three">
                                  <button
                                    onClick={() => updateSubType(el)}
                                    className="bg-secondary"
                                    type="button"
                                  >
                                    Edit
                                  </button>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      )
                  }
                </div>
              </div>
              <div className="submit-section">
                <button type="submit"> Add </button>
                <button type="button"> Cancel </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralLedgerSubtypes;
