/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import SetingsSidebar from "./SettingsSideBar";
import axios from "axios";
import "./index.css";
import { updateCompanyInfo } from "../../../actions/systemCompanyInfo";
import Loader from "./Loader/Loader";
import updateCompanyInfoValidator from "../../Validators/CompanyInfoValidator";
import { Input } from "../../_generics/Generics";
import Label from "./Label";

const UpdateCompanyInfo = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({});
  //   const [staticData, setStaticData] = useState({});
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errors.hasOwnProperty(name)) {
      console.log("inside");
      setErrors({ ...errors, [name]: "" });
    }
    console.log(formState, "data state");
    setFormState(() => ({
      ...formState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://tricofin.azurewebsites.net/api/System/GetSystemSettings`)
        .then((response) => setFormState(response.data))
        .catch((error) => console.log(error.message));
    };
    fetchData();
  }, []);

  const updateData = (e) => {
    e.preventDefault();
    const response = updateCompanyInfoValidator(formState);
    setErrors(response);
    if (Object.keys(response).length === 0) {
      dispatch(updateCompanyInfo(formState));
    }
  };

  const clearForm = () => {
    setErrors({});
  };

  return Object.keys(formState).length > 0 ? (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>System Settings: Update Company Information</span>
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
                    <label for="name" class="form-label">
                      Company Name
                    </label>
                    <div class="form-input">
                      <div className="form-input-item">
                        {formState.companyName}
                      </div>
                    </div>
                  </div>
                  <div class="form-item">
                    <label
                      for="physicaladdress"
                      className={
                        errors.pAddress ? "required form-label" : "form-label"
                      }
                    >
                      Physical Adress
                    </label>
                    <div class="form-input">
                      <Input
                        handleChange={handleChange}
                        name="pAddress"
                        value={formState.pAddress}
                        type="text"
                        className="text-input-settings"
                      />
                    </div>
                  </div>
                  <div class="form-item">
                    <label
                      for="pobox"
                      className={
                        errors.boxAddress ? "required form-label" : "form-label"
                      }
                    >
                      P.O. Box Address
                    </label>
                    <div class="form-input">
                      <Input
                        handleChange={handleChange}
                        value={formState.boxAddress}
                        name="boxAddress"
                        type="text"
                        className="text-input-settings"
                      />
                    </div>
                  </div>
                  <div class="form-item">
                    <label
                      for="pobox"
                      className={
                        errors.email ? "required form-label" : "form-label"
                      }
                    >
                      Email Address 1
                    </label>
                    <div class="form-input">
                      <Input
                        handleChange={handleChange}
                        value={formState.email}
                        name="email"
                        type="email"
                        placeholder="geshafinancialservices@gmail.com"
                        className="text-input-settings"
                      />
                    </div>
                  </div>
                  <div class="form-item">
                    <label
                      for="pobox"
                      class={errors.phone ? "form-label" : "form-label"}
                    >
                      Phone 1
                    </label>
                    <div class="form-input">
                      <Input
                        handleChange={handleChange}
                        value={formState.phone}
                        name="phone"
                        type="text"
                        placeholder="+256785450481"
                        className="text-input-settings"
                      />
                    </div>
                  </div>
                  <div class="form-item">
                    <label for="pobox" class="form-label">
                      Website
                    </label>
                    <div class="form-input">
                      <Input
                        handleChange={handleChange}
                        value={formState.website}
                        name="website"
                        type="text"
                        placeholder="www.geshamicrofinance.co.ug"
                        className="text-input-settings"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="right-container-side">
                <div className="password-policy">
                  <h4 class="text-center">Password Policy</h4>
                  <hr />
                  <form>
                    <div class="form-item">
                      <Label name="Enforce Password History" />
                      <div class="form-input-number">
                        <Input
                          handleChange={handleChange}
                          value={formState.pswdHistory}
                          name="pswdHistory"
                          type="number"
                          className="number-input-settings"
                        />
                      </div>
                      <Label name="Passwords" icon="&#63;" />
                    </div>
                    <div class="form-item">
                      <Label name="Maximum Password Age" />
                      <div class="form-input-number">
                        <Input
                          handleChange={handleChange}
                          value={formState.pswdAge}
                          name="pswdAge"
                          type="number"
                          className="number-input-settings"
                        />
                      </div>
                      <Label name="Days" icon="&#63;" />
                    </div>
                    <div class="form-item">
                      <Label name="Minimum Password Length" />
                      <div class="form-input-number">
                        <Input
                          handleChange={handleChange}
                          value={formState.pswdLength}
                          name="pswdLength"
                          type="number"
                          className="number-input-settings"
                        />
                      </div>
                      <Label name="Characters" icon="&#63;" />
                    </div>

                    <div class="form-item">
                      <Label name="Lock System After" />
                      <div class="form-input-number">
                        <Input
                          handleChange={handleChange}
                          value={formState.lockSysPeriod}
                          name="lockSysPeriod"
                          type="number"
                          className="number-input-settings"
                        />
                      </div>
                      <Label name="Secs" icon="&#63;" />
                    </div>
                  </form>
                </div>
                <div className="buttons-section-settings">
                  <button
                    type="button"
                    onClick={updateData}
                    style={{ textDecoration: "none" }}
                    className="buttons-link"
                  >
                    Update Info
                  </button>
                  <button
                    type="button"
                    onClick={clearForm}
                    style={{ textDecoration: "none" }}
                    className="buttons-link"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="spinner section">
      <Loader headerText="System Settings: Company Information" />
    </div>
  );
};

export default UpdateCompanyInfo;
