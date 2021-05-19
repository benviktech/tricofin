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
import { fetchCompanyInfo } from "../../../actions/systemCompanyInfo"

const SystemSettingsCompanyInfo = () => {
  const dispatch = useDispatch();

  const {
    modalCloser, modalOpener, openModel, modalText,
  } = ModalFunction();



  const companyInfo = useSelector(state => state.companyInfoReducer);
  console.log(companyInfo)

  useEffect(() => {
    dispatch(fetchCompanyInfo());
  }, []);


  return companyInfo ? (
    <div className="individual-customer-form">
      <Modal
        modalText={modalText}
        modalCloser={modalCloser}
        openModel={openModel}
      />
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>System Settings: Company Information</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <SetingsSidebar />
          </div>
          <div className="submit-form-top-section">
            <div className="container-main  ">
                <div className="left-container-side">
                  <h4 class="text-center">Contact Information</h4>
                  <hr />
                  <form>
                    
                    <div class="form-item">
                      <label for="name" class="col-form-label">Company Name</label>
                      <div class="form-input">
                        <input type="text" class="form-input-input"  disabled/>
                      </div>
                    </div>
                    <div class="form-item">
                      <label for="physicaladdress" class=" col-form-label">Physical Adress</label>
                      <div class="form-input">
                        <input type="text" class="form-input-input"  disabled/>
                      </div>
                    </div>
                    <div class="form-item">
                      <label for="pobox" class=" col-form-label">P.O. Box Address</label>
                      <div class="form-input">
                        <input type="text" class="form-input-input"  disabled/>
                      </div>
                    </div>
                    <div class="form-item">
                      <label for="pobox" class="col-form-label">Email Address 1</label>
                      <div class="form-input">
                        <input type="email" class="form-input-input" placeholder="geshafinancialservices@gmail.com"  disabled/>
                      </div>
                    </div>
                    <div class="form-item">
                      <label for="pobox" class=" col-form-label">Email Address 2</label>
                      <div class="form-input">
                        <input type="email" class="form-input-input" placeholder=""  disabled/>
                      </div>
                    </div>
                    <div class="form-item">
                      <label for="pobox" class="col-form-label">Phone 1</label>
                      <div class="form-input">
                        <input type="text" class="form-control-1" placeholder="+256785450481"  disabled/>
                      </div>
                      <label for="pobox1" class="col-form-label">Phone 2</label>
                      <div class="form-input">
                        <input type="text" class="form-control-1" placeholder="+256785450481"  disabled/>
                      </div>
                    </div>
                    <div class="form-item">
                      <label for="pobox" class="col-form-label">Website</label>
                      <div class="form-input">
                        <input type="text" class="form-input-input" placeholder="www.geshamicrofinance.co.ug"  disabled/>
                      </div>
                    </div>
                    </form>
                </div>

                <div className="container-right-side">
                      <form>
                      <h4 class="text-center">Company Tag Line</h4>
                      <hr />
                      <div class="form-item">
                        <label for="pobox" class=" col-form-label">Tag Line</label>
                        <div class="form-input">
                          <input type="text" class="form-input-input" placeholder="Funding Your Dreams"  disabled/>
                        </div>
                      </div>
                      <hr />
                      
                      <div class="right-side-lower-section">
                        <div className="company-img">
                        <h4 class="">Company Logo</h4>
                        <img src="company-logo.jpg"  className="rounded company-logo-img " alt="company profile" />
                        <div class="file-input">
                          <input type="file" id="file" class="file" />
                          <label for="file">Browse</label>
                        </div>
                        </div>
                        <div className="buttons-action">
                          <NavLink to="/" style={{textDecoration: "none"}} className="buttons-link">Edit</NavLink>
                          <NavLink to="/" style={{textDecoration: "none"}} className="buttons-link">Save</NavLink>
                        </div>
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

export default SystemSettingsCompanyInfo;
