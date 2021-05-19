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
                      <label for="name" class="col-form-label" style={{color:"#0178d4"}}>Enforce Password History</label>
                      <div class="form-input">
                        <input type="number" class="form-input-input-select" />
                      </div>
                      <label for="name" class="col-form-label">Passwords Remembered <span style={{display:"inline-block",padding:"3px",backgroundColor:"#D7D7D7"}}>&#63;</span> </label>
                    </div>
                    <div class="form-item">
                      <label for="name" class="col-form-label" style={{color:"#0178d4"}}>Maximum Password Age</label>
                      <div class="form-input">
                        <input type="number" class="form-input-input-select" />
                      </div>
                      <label for="name" class="col-form-label">Days <span style={{display:"inline-block",padding:"3px",backgroundColor:"#D7D7D7"}}>&#63;</span> </label>
                    </div>
                    <div class="form-item">
                      <label for="name" class="col-form-label" style={{color:"#0178d4"}}>Minimum Password Length</label>
                      <div class="form-input">
                        <input type="number" class="form-input-input-select" />
                      </div>
                      <label for="name" class="col-form-label">Characters <span style={{display:"inline-block",padding:"3px",backgroundColor:"#D7D7D7"}}>&#63;</span> </label>
                    </div>
                    <div class="form-item">
                      <label for="name" class="col-form-label" style={{color:"#0178d4"}}>Password Must Meet Complexity Requirements</label>
                      <div class="form-input">
                        <input type="checkbox" class="form-input-input-check" />
                      </div>
                      <label for="name" class="col-form-label">Disabled <span style={{display:"inline-block",padding:"3px",backgroundColor:"#D7D7D7"}}>&#63;</span> </label>
                    </div>
                  </form>
              </div>
              <div className="other-setting">
                  <h4 class="text-center">Other settings</h4>
                  <hr />
                  <form>
                  <div class="form-item">
                      <label for="name" class="col-form-label" style={{color:"#0178d4"}}>Lock System After</label>
                      <div class="form-input">
                        <input type="number" class="form-input-input-select" />
                      </div>
                      <label for="name" class="col-form-label">Secs <span style={{display:"inline-block",padding:"3px",backgroundColor:"#D7D7D7"}}>&#63;</span> </label>
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
                        <label for="name" class="col-form-label" style={{color:"#0178d4"}}>Clear Balance</label>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <label for="name" class="col-form-label"><span style={{display:"inline-block",padding:"3px",backgroundColor:"#D7D7D7"}}>&#43;</span> </label>
                      </div>
                      <div class="form-item">
                        <label for="name" class="col-form-label" style={{color:"#0178d4"}}>Lien Amount</label>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <label for="name" class="col-form-label"><span style={{display:"inline-block",padding:"3px",backgroundColor:"#D7D7D7"}}>&#43;</span> </label>
                      </div>
                      <div class="form-item">
                        <label for="name" class="col-form-label" style={{color:"#0178d4"}}>Frozen Amount</label>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <label for="name" class="col-form-label"><span style={{display:"inline-block",padding:"3px",backgroundColor:"#D7D7D7"}}>&#43;</span> </label>
                      </div>
                      <div class="form-item">
                        <label for="name" class="col-form-label" style={{color:"#0178d4"}}>Minimum Balance</label>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <label for="name" class="col-form-label"><span style={{display:"inline-block",padding:"3px",backgroundColor:"#D7D7D7"}}>&#43;</span> </label>
                      </div>
                      <div class="form-item">
                        <label for="name" class="col-form-label" style={{color:"#0178d4"}}>Unsupervised Credit</label>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <label for="name" class="col-form-label"><span style={{display:"inline-block",padding:"3px",backgroundColor:"#D7D7D7"}}>&#43;</span> </label>
                      </div>
                      <div class="form-item">
                        <label for="name" class="col-form-label" style={{color:"#0178d4"}}>Unsupervised Dedit</label>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <label for="name" class="col-form-label"><span style={{display:"inline-block",padding:"3px",backgroundColor:"#D7D7D7"}}>&#43;</span> </label>
                      </div>
                    </form>
                  </div>
                  <div className="total-balanace">
                  <h4>Total Balance Settings</h4>
                    <hr />
                    <form>
                    <div class="form-item">
                        <label for="name" class="col-form-label" style={{color:"#0178d4"}}>Clear Balance</label>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <label for="name" class="col-form-label"><span style={{display:"inline-block",padding:"3px",backgroundColor:"#D7D7D7"}}>&#43;</span> </label>
                      </div>
                      <div class="form-item">
                        <label for="name" class="col-form-label" style={{color:"#0178d4"}}>Lien Amount</label>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <label for="name" class="col-form-label"><span style={{display:"inline-block",padding:"3px",backgroundColor:"#D7D7D7"}}>&#43;</span> </label>
                      </div>
                      <div class="form-item">
                        <label for="name" class="col-form-label" style={{color:"#0178d4"}}>Frozen Amount</label>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <label for="name" class="col-form-label"><span style={{display:"inline-block",padding:"3px",backgroundColor:"#D7D7D7"}}>&#43;</span> </label>
                      </div>
                      <div class="form-item">
                        <label for="name" class="col-form-label" style={{color:"#0178d4"}}>Minimum Balance</label>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <label for="name" class="col-form-label"><span style={{display:"inline-block",padding:"3px",backgroundColor:"#D7D7D7"}}>&#43;</span> </label>
                      </div>
                      <div class="form-item">
                        <label for="name" class="col-form-label" style={{color:"#0178d4"}}>Unsupervised Credit</label>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <label for="name" class="col-form-label"><span style={{display:"inline-block",padding:"3px",backgroundColor:"#D7D7D7"}}>&#43;</span> </label>
                      </div>
                      <div class="form-item">
                        <label for="name" class="col-form-label" style={{color:"#0178d4"}}>Unsupervised Dedit</label>
                        <div class="form-input">
                          <input type="checkbox" class="form-input-input-check" />
                        </div>
                        <label for="name" class="col-form-label"><span style={{display:"inline-block",padding:"3px",backgroundColor:"#D7D7D7"}}>&#43;</span> </label>
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
