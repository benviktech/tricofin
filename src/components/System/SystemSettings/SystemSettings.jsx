/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SetingsSidebar from "./SettingsSideBar";
import Modal from "../../Modal/Modal";
import ModalFunction from "../../Modal/ModalFunction";
import "./index.css";
import avatar from "../../../dist/images/company-logo.jpg";
import Loader from "../../Loader/Loader";
import { fetchCompanyInfo } from "../../../actions/systemCompanyInfo";
import Spinner from "../../Spinner/Spinner";
import { Input } from "../../_generics/Generics";
import Label from "./Label";

const SystemSettingsCompanyInfo = () => {
  const dispatch = useDispatch();

  const companyInfo = useSelector(
    (state) => state.companyInfoReducer.companyInfo
  );

  useEffect(() => {
    dispatch(fetchCompanyInfo());
  }, []);

  return Object.keys(companyInfo).length !== 0 ? (
    <div className="individual-customer-form">
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
                <p class="text-center">Contact Information</p>
                <hr />
                <form>
                  <div class="form-item">
                    <label for="name" class="col-form-label form-label">
                      Company Name
                    </label>
                    <div class="form-input">{companyInfo.companyName}</div>
                  </div>
                  <div class="form-item">
                    <label
                      for="physicaladdress"
                      class=" col-form-label form-label"
                    >
                      Physical Adress
                    </label>
                    <div class="form-input">{companyInfo.boxAddress}</div>
                  </div>
                  <div class="form-item">
                    <label for="pobox" class=" col-form-label form-label">
                      P.O. Box Address
                    </label>
                    <div class="form-input">{companyInfo.pAddress}</div>
                  </div>
                  <div class="form-item">
                    <label for="pobox" class="col-form-label form-label">
                      Email Address 1
                    </label>
                    <div class="form-input">{companyInfo.email}</div>
                  </div>
                  <div class="form-item">
                    <label for="pobox" class="col-form-label form-label">
                      Phone 1
                    </label>
                    <div class="form-input">{companyInfo.phone}</div>
                  </div>
                  <div class="form-item">
                    <label for="pobox" class="col-form-label form-label">
                      Website
                    </label>
                    <div class="form-input">{companyInfo.website}</div>
                  </div>
                </form>
                <div className="buttons-action">
                  <NavLink
                    to="/system/systemsettings/updatecompanyinfo"
                    style={{ textDecoration: "none" }}
                    className="buttons-link"
                  >
                    Edit
                  </NavLink>
                </div>
              </div>
              <div className="right-container-side">
                <div className="password-policy">
                  <p class="text-center">Password Policy</p>
                  <hr />
                  <form>
                    <div class="form-item">
                      <Label name="Enforce Password History" />
                      <div class="form-input">{companyInfo.pswdHistory}</div>
                    </div>
                    <div class="form-item">
                      <Label name="Maximum Password Age" />
                      <div class="form-input">{companyInfo.pswdAge}</div>
                    </div>
                    <div class="form-item">
                      <Label name="Minimum Password Length" />
                      <div class="form-input">{companyInfo.pswdLength}</div>
                    </div>

                    <div class="form-item">
                      <Label name="Lock System After" />
                      <div class="form-input">{companyInfo.lockSysPeriod}</div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="spinner-companyinfo">
      <Spinner />
    </div>
  );
};

export default SystemSettingsCompanyInfo;
