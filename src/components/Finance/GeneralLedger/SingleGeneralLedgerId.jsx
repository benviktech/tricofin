import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { getGeneralLedgerID } from '../../../actions/generalLedger';
import { GeneralLedgerSidebar } from '../../Sidebar/Sidebar';
import IdModal from './IdModal';
import fetchData from './fetchData';

const SingleGeneralLedgerId = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const generalLedgerID = useSelector(state => state.generalLedgerReducer.generalLedgerID);

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
                          generalLedgerID.glType && displayID(generalLedgerID.glType)
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-subtypes-section">
                  <div className="left-inner-subtypes-section">
                    <div className="left-subtypes-span">GL Name:</div>
                    <div className="left-subtypes-input">
                      <div className="id-information-section">{generalLedgerID.glName}</div>
                    </div>
                  </div>
                  <div className="left-inner-subtypes-section">
                    <div className="left-subtypes-span">GL Sub Type:</div>
                    <div className="left-subtypes-input">
                      <div className="id-information-section">
                        {
                          generalLedgerID.glType && displaySubID(generalLedgerID.glSubType)
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="submit-section">
                <button type="submit"> Update </button>
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
