import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { getGeneralLedgerID, updateGeneralLedgerID } from '../../../actions/generalLedger';
import { GeneralLedgerSidebar } from '../../Sidebar/Sidebar';
import IdModal from './IdModal';
import fetchData from './fetchData';

const SingleGeneralLedgerId = () => {
  const { id } = useParams();
  const [sortedList, setSortedList] = useState([]);
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const generalLedgerID = useSelector(state => state.generalLedgerReducer.generalLedgerID);
  const [updateData, setUpdateData] = useState({});
  const [errors, setErrors] = useState({});

  const { glTypes, glSubTypes } = fetchData();

  useEffect(() => {
    dispatch(getGeneralLedgerID(id));
  }, []);

  const displayID = id => {
    let result = '';
    glTypes.forEach(element => {
      if (element.glTypeID === id) {
        result = element.glType;
      }
    });
    return result;
  };

  const displaySubID = id => {
    let result = '';
    glSubTypes.forEach(element => {
      if (element.glSubTypeID === id) {
        result = element.glSubType;
      }
    });
    return result;
  };

  const updataState = e => {
    e.preventDefault();
    setUpdateData(generalLedgerID);
    setUpdate(true);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  const cancelUpdate = () => {
    setUpdateData({});
    setUpdate(false);
  };

  const saveUpdate = e => {
    e.preventDefault();
    const formErrors = {};
    formErrors.state = 'Updating';
    if (!updateData.glType) {
      formErrors.glType = 'GL type required';
    }
    if (!updateData.glName) {
      formErrors.glName = 'Name is required';
    }
    if (!updateData.glSubType) {
      formErrors.glSubType = 'GL sub type is required';
    }
    setErrors(formErrors);
  };

  useEffect(async () => {
    if (Object.values(errors).includes('Updating')) {
      if (Object.keys(errors).length === 1) {
        await dispatch(updateGeneralLedgerID(updateData));
        setUpdateData({});
        setUpdate(false);
      }
    }
  }, [errors]);

  useEffect(() => {
    if (glSubTypes.length > 0) {
      setSortedList(glSubTypes.filter(
        element => element.glTypeID === updateData.glType,
      ));
    }
  }, [updateData.glType]);

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>GL Sub Types Data Entry</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <GeneralLedgerSidebar />
          </div>
          <div className="submit-form-top-section">
            <form className="ledger-form-ledger">
              <div className="subtypes-body-section mb-3">
                <div className="left-subtypes-section">
                  <div className="left-inner-subtypes-section">
                    <div className="left-subtypes-span">GL ID:</div>
                    <div className="left-subtypes-input">
                      <div className="id-information-section">{generalLedgerID.glid}</div>
                    </div>
                  </div>
                  <div className="left-inner-subtypes-section">
                    <div className="left-subtypes-span">GL Type:</div>
                    <div className="left-subtypes-input">
                      <div className="id-information-section">
                        {
                          Object.keys(updateData).length > 0 ? (
                            <select
                              className="w-100 pl-0"
                              onChange={handleChange}
                              name="glType"
                              value={updateData.glType}
                            >
                              <option value="" disabled selected hidden>Select</option>
                              {
                                glTypes.map(type => (
                                  <option key={type.glTypeID} value={type.glTypeID}>
                                    {type.glType}
                                  </option>
                                ))
                              }
                            </select>
                          ) : (displayID(generalLedgerID.glType))
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-subtypes-section">
                  <div className="left-inner-subtypes-section">
                    <div className="left-subtypes-span">GL Name:</div>
                    {
                      Object.keys(updateData).length > 0 && update ? (
                        <div className="left-subtypes-input">
                          <input
                            name="glName"
                            onChange={handleChange}
                            value={updateData.glName}
                            type="text"
                          />
                          <div className="form-error-section-update">
                            { errors.glName && errors.glName}
                            {' '}
                          </div>
                        </div>
                      ) : (
                        <div className="left-subtypes-input">
                          <div className="id-information-section">{generalLedgerID.glName}</div>
                        </div>
                      )
                    }
                  </div>
                  <div className="left-inner-subtypes-section">
                    <div className="left-subtypes-span">GL Sub Type:</div>
                    <div className="left-subtypes-input">
                      <div className="id-information-section">
                        {
                          Object.keys(updateData).length > 0 && update ? (
                            <select
                              className="w-100 pl-0"
                              onChange={handleChange}
                              name="glSubType"
                              value={updateData.glSubType}
                            >
                              <option value="" disabled selected hidden>Select</option>
                              {
                                sortedList.map(type => (
                                  <option key={type.glSubTypeID} value={type.glSubTypeID}>
                                    {type.glSubType}
                                  </option>
                                ))
                              }
                            </select>
                          ) : (displaySubID(generalLedgerID.glSubType))
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {
                update ? (
                  <div className="submit-section">
                    <button type="submit" onClick={saveUpdate}> Save </button>
                    <button type="submit" onClick={cancelUpdate}> Cancel </button>
                  </div>
                ) : (
                  <div className="submit-section">
                    <button type="submit" onClick={updataState}> Update </button>
                    <Link
                      type="button"
                      className="ml-1 edit-button"
                      to={{
                        pathname: '/glidentification',
                      }}
                    >
                      Cancel
                    </Link>
                  </div>
                )
              }
            </form>
            {
              Object.keys(generalLedgerID).length > 0
                ? (
                  <IdModal generalLedgerID={generalLedgerID} />
                ) : null
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGeneralLedgerId;
