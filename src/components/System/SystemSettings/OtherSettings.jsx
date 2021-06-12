/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */

import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SetingsSidebar from './SettingsSideBar';
import Modal from '../../Modal/Modal';
import ModalFunction from '../../Modal/ModalFunction';
import './index.css';
import Loader from '../../Loader/Loader';
import Label from "./Label"

const SystemSettingsOtherSettings = () => {
  const dispatch = useDispatch();

  const {
    modalCloser, modalOpener, openModel, modalText,
  } = ModalFunction();



  const individualCustomers = useSelector(state => state.individualCustomersReducer);
  const staticData = useSelector(state => state.staticDataReducer);


  return true ? (
    <div className="individual-customer-form">
      <Modal
        modalText={modalText}
        modalCloser={modalCloser}
        openModel={openModel}
      />
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>System Settings: Other Settings</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <SetingsSidebar />
          </div>
          <div className="main-area">
            <div className="left-column">
              <div className="password-policy">
                  <h4 class="text-center">Password Policy</h4>
                  <hr />
                  <form>
                    <div class="form-item">
                    <Label name="Enforce Password History" />
                      <div class="form-input">
                        <input type="number" class="form-input-input-select" />
                      </div>
                      <Label name="Passwords Remembered" icon="&#63;" />
                    </div>
                    <div class="form-item">
                      <Label name="Maximum Password Age"/>
                      <div class="form-input">
                        <input type="number" class="form-input-input-select" />
                      </div>
                      <Label name="Days" icon="&#63;" />
                    </div>
                    <div class="form-item">
                      <Label name="Minimum Password Length"/>
                      <div class="form-input">
                        <input type="number" class="form-input-input-select" />
                      </div>
                      <Label name="Characters" icon="&#63;" />
                    </div>
                    <div class="form-item">
                      <Label name="Password Must Meet Complexity Requirements"/>
                      <div class="form-input">
                        <input type="checkbox" class="form-input-input-check" />
                      </div>
                      <Label name="Disabled" icon="&#63;" />
                    </div>
                  </form>
              </div>
              <div className="other-setting">
                  <h4 class="text-center">Other settings</h4>
                  <hr />
                  <form>
                  <div class="form-item">
                      <Label name="Lock System After"/>
                      <div class="form-input">
                        <input type="number" class="form-input-input-select" />
                      </div>
                      <Label name="Secs" icon="&#63;" />
                    </div>
                  </form>
              </div>
              <div className="buttons-action">
                <NavLink to="/" style={{textDecoration: "none"}} className="buttons-link">Edit</NavLink>
                <NavLink to="/" style={{textDecoration: "none"}} className="buttons-link">Save</NavLink>
              </div>
            </div>
            <div className="right-column">
                  <div className="available-balance">
                    <h4>Available Balance Settings</h4>
                    <hr />
                    <form>
                      <div class="form-item">
                        <Label name="Clear Balance"/>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <Label  icon="&#43;" />
                      </div>
                      <div class="form-item">
                        <Label name="Lien Amount"/>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <Label  icon="&#43;" />
                      </div>
                      <div class="form-item">
                        <Label name="Frozen Amount"/>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <Label  icon="&#43;" />
                      </div>
                      <div class="form-item">
                        <Label name="Minimum Balance"/>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <Label  icon="&#43;" />
                      </div>
                      <div class="form-item">
                        <Label name="Unsupervised Credit"/>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <Label  icon="&#43;" />
                      </div>
                      <div class="form-item">
                        <Label name="Unsupervised Dedit"/>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <Label  icon="&#43;" />
                      </div>
                    </form>
                  </div>
                  <div className="total-balanace">
                  <h4>Total Balance Settings</h4>
                    <hr />
                    <form>
                    <div class="form-item">
                        <Label name="Clear Balance"/>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <Label  icon="&#43;" />
                      </div>
                      <div class="form-item">
                        <Label name="Lien Amount"/>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <Label  icon="&#43;" />
                      </div>
                      <div class="form-item">
                        <Label name="Frozen Amount"/>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <Label  icon="&#43;" />
                      </div>
                      <div class="form-item">
                        <Label name="Minimum Balance"/>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <Label  icon="&#43;" />
                      </div>
                      <div class="form-item">
                        <Label name="Unsupervised Credit"/>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <Label  icon="&#43;" />
                      </div>
                      <div class="form-item">
                        <Label name="Unsupervised Dedit"/>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <Label  icon="&#43;" />
                      </div>
                    </form>
                  </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  ) : (
    <div className="spinner section">
      <Loader />
    </div>
  );
};

export default SystemSettingsOtherSettings;
