/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */

import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SecuritySidebar from './SecuritySideBar';
import Modal from '../../Modal/Modal';
import ModalFunction from '../../Modal/ModalFunction';
import './index.css';
import Loader from '../../Loader/Loader';
import { fetchCompanyInfo } from "../../../actions/systemCompanyInfo"

const SystemSecurityDeleteUser = () => {
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
          <span>System Security: Delete User</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <SecuritySidebar />
          </div>
          <div className="submit-form-top-section">

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

export default SystemSecurityDeleteUser;
