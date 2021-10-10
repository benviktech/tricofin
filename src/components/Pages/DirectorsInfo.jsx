/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import ModalFunction from '../Modal/ModalFunction';
import Modal from '../Modal/Modal';
import { NonIdividualSidebar } from '../Sidebar/Sidebar';
import MoreInfo from '../NonIdividual/MoreInfo';
import SearchCustomer from '../Customer/SearchCustomer';
import { saveCustomerDirector, getCustomerDirector, removeCustomerDirector } from '../../actions/pages';

const DirectorInfo = () => {
  const [director, setDirector] = useState({});
  const [hideErrorDiv, setHideErrorDiv] = useState('d-none');
  const [errors, setErrors] = useState('');
  const [customerList, setCutomerList] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [directorArrayList, setDirectorArrayList] = useState([]);
  const {
    modalCloser, modalOpener, openModel, modalText,
  } = ModalFunction();

  const {
    searchIndividualCustomer,
    searchedCustomer, finalSortedList,
    setSearchedCustomer,
  } = SearchCustomer();

  const directorMethod = customer => {
    setDirector(customer);
    setSearchedCustomer('');
  };

  const saveDirector = async e => {
    e.preventDefault();
    if (Object.keys(director).length > 0) {
      const data = {
        columnID: 0,
        custID: id,
        directorID: director.custID,
        isDeleted: true,
        createdOn: (new Date()).toISOString(),
        createdBy: 'BENVIK',
        modifiedOn: (new Date()).toISOString(),
        modifiedBy: 'BENVIK',
        deletedOn: (new Date()).toISOString(),
        deletedBy: 'BENVIK',
      };
      await dispatch(saveCustomerDirector(data));
      setDirector({});
      setHideErrorDiv('');
    } else {
      setErrors('Please select a Director!');
    }
  };

  const directorsList = useSelector(state => state.individualCustomerIdentification);

  const sortDirectors = () => {
    const result = [];
    if (directorsList.directors.length > 0) {
      directorsList.directors.forEach(director => {
        customerList.forEach(customer => {
          if ((director.directorID) === (customer.custID)) {
            result.push(customer);
          }
        });
      });
    }
    setDirectorArrayList(result);
  };

  useEffect(async () => {
    await axios.get('https://tricofin.azurewebsites.net/api/Customers/GetIndividualCustomers')
      .then(response => {
        setCutomerList(response.data);
        dispatch(getCustomerDirector(id));
      }).catch(error => console.log(error));
  }, []);

  useEffect(() => {
    sortDirectors();
  }, [directorsList.directors]);

  const closePopUp = () => setErrors('');

  const clearInputs = () => setDirector({});

  const displayError = () => setHideErrorDiv('d-none');

  const removeDirector = dirId => {
    dispatch(removeCustomerDirector(id, dirId));
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
          <span>Identification Information</span>
        </div>
        {
          errors && (
            <div className="notification-errors-section shadow">
              <i
                onClick={closePopUp}
                className="fas fa-times-circle"
              />
              { errors }
            </div>
          )
        }
        {
          directorsList.error.includes('5020') ? (
            <div className={`${hideErrorDiv} notification-errors-section shadow text`}>
              <i
                onClick={displayError}
                className="far fa-times-circle"
              />
              Director already exist
            </div>
          ) : null
        }
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
          <div className="submit-form-top-section top-identification-section">
            <form
              onSubmit={saveDirector}
              className="submit-form-top-section identification-form"
            >
              <div className="top-inputs-section">
                <div className="label-input-section">
                  <div className="first-section">

                    <div className="first-section-inner manage-drop-down">
                      <div className="first-label-section">
                        Search:
                      </div>
                      <div className="first-input-section">
                        <input
                          autoComplete="off"
                          type="text"
                          name="searchcustomer"
                          value={searchedCustomer}
                          onChange={searchIndividualCustomer}
                        />
                      </div>
                      {
                         searchedCustomer === '' ? (
                           <div className="modal-hide-section" />
                         ) : (

                           <div className="modal-popup-section">
                             <div className="inner-section-modal-section">
                               {
                              Array.from(new Set(finalSortedList)).map(customer => (
                                <div
                                  className="inner-section-modal-section-inner border"
                                  key={customer.custID}
                                  onClick={() => directorMethod(customer)}
                                >
                                  <div className="modal-customer-name-section mr-2">
                                    { customer.title }
                                  </div>
                                  <div className="modal-customer-name-section mr-2">
                                    { customer.surName}
                                  </div>
                                  <div className="modal-customer-surname-section">
                                    { customer.foreName1 }
                                  </div>
                                </div>
                              ))
                            }
                             </div>
                           </div>
                         )
                      }
                    </div>
                    <div className="first-section-inner">
                      <div className="first-label-section">
                        Title:
                      </div>
                      <div className="first-input-section">
                        {
                          Object.keys(director).length > 0 ? (
                            <input
                              value={director.title}
                              className="w-25"
                              type="text"
                            />
                          ) : (
                            <input
                              value=""
                              className="w-25"
                              type="text"
                            />
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div className="first-section">
                    <div className="first-section-inner">
                      <div className="first-label-section">
                        Sur Name:
                      </div>
                      <div className="first-input-section">
                        {
                          Object.keys(director).length > 0 ? (
                            <input
                              value={director.surName}
                              type="text"
                            />
                          ) : (
                            <input
                              value=""
                              type="text"
                            />
                          )
                        }
                      </div>
                    </div>
                    <div className="first-section-inner">
                      <div className="first-label-section">
                        Fore Name 1:
                      </div>
                      <div className="first-input-section">
                        {
                          Object.keys(director).length > 0 ? (
                            <input
                              value={director.foreName1}
                              type="text"
                            />
                          ) : (
                            <input
                              value=""
                              type="text"
                            />
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div className="first-section">
                    <div className="first-section-inner">
                      <div className="first-label-section">
                        Fore Name 2:
                      </div>
                      <div className="first-input-section">
                        {
                          Object.keys(director).length > 0 ? (
                            <input
                              value={director.foreName2}
                              type="text"
                            />
                          ) : (
                            <input
                              value=""
                              type="text"
                            />
                          )
                        }
                      </div>
                    </div>
                    <div className="first-section-inner">
                      <div className="first-label-section">
                        Fore Name 3:
                      </div>
                      <div className="first-input-section">
                        {
                          Object.keys(director).length > 0 ? (
                            <input
                              value={director.foreName3}
                              type="text"
                            />
                          ) : (
                            <input
                              value=""
                              type="text"
                            />
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div className="first-section w-50">
                    <div className="first-section-inner">
                      <div className="first-label-section">
                        Residence:
                      </div>
                      <div className="first-input-section">
                        {
                          Object.keys(director).length > 0 ? (
                            <input
                              value={director.rAddress}
                              type="text"
                            />
                          ) : (
                            <input
                              value=""
                              type="text"
                            />
                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="image-section" style={{ background: '#F3F2F1' }}>
                  Image here
                </div>
              </div>
              <div className="identification-listing">
                <div className="top-section">
                  <div className="idcode-section">
                    Director ID
                  </div>
                  <div className="idcode-section">
                    Title
                  </div>
                  <div className="idcode-section">
                    Surname
                  </div>
                  <div className="idcode-section">
                    Forename1
                  </div>
                  <div className="idcode-section">
                    Forename2
                  </div>
                  <div className="idcode-section">
                    Forename3
                  </div>
                  <div className="idcode-section">
                    Remove
                  </div>
                </div>
                <div className="lower-content-display">
                  {
                   directorArrayList.length > 0 ? (
                     directorArrayList.map(director => (
                       <div key={director.custID} className="middle-section">
                         <div className="idcode-section-inner first-border-left">
                           {director.custID}
                         </div>
                         <div className="idcode-section-inner">
                           {director.title}
                         </div>
                         <div className="idcode-section-inner">
                           {director.surName}
                         </div>
                         <div className="idcode-section-inner">
                           {director.foreName1}
                         </div>
                         <div className="idcode-section-inner">
                           {director.foreName2}
                         </div>
                         <div className="idcode-section-inner">
                           {director.foreName3}
                         </div>
                         <div className="idcode-section-inner delete-info">
                           <button
                             type="button"
                             onClick={() => removeDirector(director.custID)}
                           >
                             Delete
                           </button>
                         </div>
                       </div>

                     ))) : (
                       <div className="middle-section empty-section">
                         <i className="far fa-folder-open" />
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
                    onClick={clearInputs}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
            <MoreInfo modalOpener={modalOpener} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorInfo;
