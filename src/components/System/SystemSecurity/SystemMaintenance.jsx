/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import SecuritySidebar from "./SecuritySideBar";
import "./index.css";
import Loader from "./Loader/Loader";
import { Button, Input } from "../../_generics/Generics";
import { fetchSystemRoles } from "../../../actions/systemRole";
import userMaintenanceValidator from "../../Validators/UserMaintenanceValidator";
import axios from "axios";
import {
  createSystemUser,
  updateSystemUser,
  deleteSystemUser,
} from "../../../actions/systemUser";

const baseUrl = "https://tricofin.azurewebsites.net";

const SystemSecurityMaintenance = () => {
  const dispatch = useDispatch();

  const [isCashier, setIsCashier] = useState(false);
  const [sortedRoles, setSortedRoles] = useState([]);
  const [sortedTempRoles, setSortedTempRoles] = useState([]);
  const [sortedTempUsers, setSortedTempUsers] = useState([]);
  // const [value, setValue] = useState("");
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [roleDisable, setRoleDisable] = useState(false);
  const [isCashierDisable, setIsCashierDisable] = useState(false);
  const [dataLoadFailed, setDataLoadFailed] = useState(false);

  const companyInfo = useSelector((state) => state.companyInfoReducer);
  const user = useSelector((state) => state?.systemUserReducer?.systemUser);

  useEffect(() => {
    fetchSystemUsers();
  }, []);

  useEffect(() => {
    dispatch(fetchSystemRoles());
    if (!formState.tempRole) {
      setRoleDisable(true);
    } else if (formState.tempRole) {
      setRoleDisable(false);
    }

    if (!formState.isCashier) {
      setIsCashierDisable(true);
    } else if (formState.isCashier) {
      setIsCashierDisable(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errors.hasOwnProperty(name)) {
      setErrors({ ...errors, [name]: "" });
    }
    setFormState(() => ({
      ...formState,
      [name]: value,
    }));
  };

  const handleChecking = (e) => {
    const { name, checked } = e.target;
    if (name === "tempRole" && !checked) {
      setRoleDisable(true);
    } else if (name === "tempRole" && checked) {
      setRoleDisable(false);
    }
    if (name === "isCashier" && !checked) {
      setIsCashierDisable(true);
    } else if (name === "isCashier" && checked) {
      setIsCashierDisable(false);
    }
    if (errors.hasOwnProperty(name)) {
      setErrors({ ...errors, [name]: "" });
    }
    setFormState(() => ({
      ...formState,
      [name]: checked,
    }));
  };

  const selectRole = (e) => {
    setFormState(() => ({
      ...formState,
      [e.target.dataset.name]: e.target.dataset.selected,
    }));
    setSortedRoles([]);
  };

  const selectTempRole = (e) => {
    setFormState(() => ({
      ...formState,
      [e.target.dataset.name]: e.target.dataset.selected,
    }));
    setSortedTempRoles([]);
  };

  const selectTempUser = (e) => {
    fetchSelectedUser(e.target.dataset.selected);
    setSortedTempUsers([]);
  };

  const fetchSelectedUser = async (userName) => {
    axios
      .get(`${baseUrl}/api/System/GetSystemUser/${userName}`)
      .then(function (response) {
        setFormState({
          ...response.data,
          password: response.data.userPassword,
        });
        if (response.data.tempRole) {
          setRoleDisable(false);
        } else if (!response.data.tempRole) {
          setRoleDisable(true);
        }
        if (response.data.isCashier) {
          setIsCashierDisable(false);
        } else if (!response.data.isCashier) {
          setIsCashierDisable(true);
        }
      })
      .catch(function (error) {
        setDataLoadFailed(true);
      });
  };

  const fetchSystemUsers = async () => {
    axios
      .get(`${baseUrl}/api/System/GetSystemUsers`)
      .then(function (response) {
        setUsers(response.data);
        axios
          .get(`${baseUrl}/api/System/GetRoles`)
          .then(function (response) {
            setRoles(response.data);
          })
          .catch(function (error) {
            setDataLoadFailed(true);
          });
      })
      .catch(function (error) {
        setDataLoadFailed(true);
      });
  };

  const filterRoles = (e) => {
    const { name, value } = e.target;
    setFormState(() => ({
      ...formState,
      [name]: value,
    }));
    if (value.trim().length > 0) {
      const filteredroles = roles.filter((role) =>
        role.roleID.toLowerCase().includes(value.toLowerCase())
      );
      setSortedRoles(filteredroles);
    } else {
      setSortedRoles([]);
    }
  };

  const filterTempRoles = (e) => {
    const { name, value } = e.target;
    setFormState(() => ({
      ...formState,
      [name]: value,
    }));
    if (value.trim().length > 0) {
      const filteredtemproles = roles.filter((role) =>
        role.roleID.toLowerCase().includes(value.toLowerCase())
      );
      setSortedTempRoles(filteredtemproles);
    } else {
      setSortedTempRoles([]);
    }
  };

  const filterTempUsers = (e) => {
    const { name, value } = e.target;
    setFormState(() => ({
      ...formState,
      [name]: value,
    }));
    if (value.trim().length > 0) {
      const filteredtempusers = users.filter((user) =>
        user.userName.toLowerCase().includes(value.toLowerCase())
      );
      setSortedTempUsers(filteredtempusers);
    } else {
      setSortedTempUsers([]);
    }
  };

  const formatDateTime = (datevalue) => {
    let currentDate = new Date(datevalue);
    let date = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    return currentDate.toISOString().split("T")[0];
  };

  const clearFields = () => {
    setErrors({});
  };

  const createUser = () => {
    const response = userMaintenanceValidator(formState);
    setErrors(response);
    if (Object.keys(response).length === 0) {
      dispatch(createSystemUser(formState));
    }
  };

  const updateUser = () => {
    const response = userMaintenanceValidator(formState);
    setErrors(response);
    if (Object.keys(response).length === 0) {
      dispatch(updateSystemUser(formState));
    }
  };

  const deleteUser = () => {
    const response = userMaintenanceValidator(formState);
    setErrors(response);
    if (Object.keys(response).length === 0) {
      dispatch(deleteSystemUser(formState));
    }
  };

  return roles.length > 0 ? (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>System Security: User Maintenance</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <SecuritySidebar />
          </div>
          <div className="usermaintenance-section">
            <div className="user-details-section">
              <div className="userroleadd-section">
                <div className="userrole-create-header">User Role</div>
                <form>
                  <div className="input-div">
                    <div className="label">Search a Role ID</div>
                    <div className="input-box">
                      <Input
                        value={formState.roleID}
                        name="roleID"
                        handleChange={filterRoles}
                        type="text"
                      />
                      <br />
                      {errors.roleID && (
                        <span className="error-display">{errors.roleID}</span>
                      )}
                    </div>
                    {sortedRoles.length <= 0 ? (
                      <div className="modal-hide-section" />
                    ) : (
                      <div className="modal-popup-section">
                        <div className="inner-section-modal-section">
                          {sortedRoles.map((role) => (
                            <div
                              className="inner-section-modal-section-inner border"
                              key={role.roleID}
                            >
                              <div
                                data-name="roleID"
                                data-selected={role.roleID}
                                onClick={selectRole}
                                className="modal-customer-name-section mr-2"
                              >
                                {role.roleID}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
              <div className="user-details-section">
                <hr />
                <div className="userdetails-create-header">User Details</div>
                <form>
                  <div className="input-div">
                    <div className="label">Login ID</div>
                    <div className="input-box">
                      <Input
                        handleChange={filterTempUsers}
                        value={formState.userName}
                        name="userName"
                        type="text"
                      />
                      <br />
                      {errors.userName && (
                        <span className="error-display">{errors.userName}</span>
                      )}
                    </div>
                    {sortedTempUsers.length <= 0 ? (
                      <div className="modal-hide-section-user-useredit" />
                    ) : (
                      <div className="modal-popup-section">
                        <div className="inner-section-modal-section-user-useredit">
                          {sortedTempUsers.map((user) => (
                            <div
                              className="inner-section-modal-section-inner-user-useredit border"
                              key={user.userName}
                            >
                              <div
                                data-name="userName"
                                data-selected={user.userName}
                                onClick={selectTempUser}
                                className="modal-customer-name-section mr-2"
                              >
                                {user.userName}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="input-div">
                    <div className="input-div">
                      <div className="label">Password</div>
                      <div className="input-box-password">
                        <Input
                          handleChange={handleChange}
                          value={formState.userPassword}
                          name="userPassword"
                          type="password"
                        />
                        <br />
                        {errors.userPassword && (
                          <span className="error-display">
                            {errors.userPassword}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="input-div">
                      <div className="label">Confirm Password</div>
                      <div className="input-box-password">
                        <Input
                          handleChange={handleChange}
                          value={formState.password}
                          name="password"
                          type="password"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input-div">
                    <div className="label">Surname</div>
                    <div className="input-box">
                      <Input
                        handleChange={handleChange}
                        value={formState.surName}
                        name="surName"
                        type="text"
                      />
                      <br />
                      {errors.surName && (
                        <span className="error-display">{errors.surName}</span>
                      )}
                    </div>
                  </div>
                  <div className="input-div">
                    <div className="label">Other Names</div>
                    <div className="input-box">
                      <Input
                        handleChange={handleChange}
                        value={formState.otherNames}
                        name="otherNames"
                        type="text"
                      />
                      <br />
                      {errors.otherNames && (
                        <span className="error-display">
                          {errors.otherNames}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="input-div">
                    <div className="input-div">
                      <div className="label">Phone1</div>
                      <div className="input-box-phone">
                        <Input
                          handleChange={handleChange}
                          value={formState.phoneNo1}
                          name="phoneNo1"
                          type="text"
                        />
                        <br />
                        {errors.phoneNo1 && (
                          <span className="error-display">
                            {errors.phoneNo1}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="input-div">
                      <div className="label">Phone2</div>
                      <div className="input-box-phone">
                        <Input
                          handleChange={handleChange}
                          value={formState.phoneNo2}
                          name="phoneNo2"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input-div">
                    <div className="label">Account is Verified</div>
                    <div className="input-box">
                      <Input
                        handleChange={handleChecking}
                        value={formState.isVerified}
                        name="isVerified"
                        type="checkbox"
                        checked={formState.isVerified}
                      />
                    </div>
                  </div>
                  <div className="input-div">
                    <div className="label">Account is Deleted</div>
                    <div className="input-box">
                      <Input
                        handleChange={handleChecking}
                        value={formState.isDeleted}
                        name="isDeleted"
                        type="checkbox"
                        checked={formState.isDeleted}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="user-settings-section">
              <div className="user-temporary-role">
                <form>
                  <div className="input-div">
                    <div className="label">Temporary Role</div>
                    <div className="input-box">
                      <Input
                        handleChange={handleChecking}
                        value={formState.tempRole}
                        name="tempRole"
                        type="checkbox"
                        checked={formState.tempRole}
                      />
                    </div>
                  </div>

                  <div className="input-div">
                    <div className="label">Role</div>
                    <div className="input-box">
                      <Input
                        disabled={roleDisable}
                        value={formState.tempRoleID}
                        name="tempRoleID"
                        type="text"
                        handleChange={filterTempRoles}
                      />
                    </div>
                    {sortedTempRoles.length <= 0 ? (
                      <div className="modal-hide-section-role" />
                    ) : (
                      <div className="modal-popup-section">
                        <div className="inner-section-modal-section-role">
                          {sortedTempRoles.map((role) => (
                            <div
                              className="inner-section-modal-section-inner-role border"
                              key={role.roleID}
                            >
                              <div
                                data-name="tempRoleID"
                                data-selected={role.roleID}
                                onClick={selectTempRole}
                                className="modal-customer-name-section mr-2"
                              >
                                {role.roleID}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="input-div">
                    <div className="label">Expiry Date</div>
                    <div className="input-box">
                      <Input
                        handleChange={handleChange}
                        value={
                          formState.tempExpiryDate
                            ? formatDateTime(formState.tempExpiryDate)
                            : formState.tempExpiryDate
                        }
                        name="tempExpiryDate"
                        type="date"
                        disabled={roleDisable}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="user-advanced-settings">
                <div className="userdetails-create-header">
                  Advanced Settings
                </div>
                <hr />
                <form>
                  <div className="input-div">
                    <div className="label">Is Cashier</div>
                    <div className="input-box">
                      <Input
                        handleChange={handleChecking}
                        value={formState.isCashier}
                        name="isCashier"
                        type="checkbox"
                      />
                    </div>
                  </div>
                  <div className="input-div">
                    <div className="label">CashierGL</div>
                    <div className="input-box">
                      <Input
                        name="cashierGL"
                        disabled={isCashierDisable}
                        type="search"
                        placeholder="Search a GL"
                      />
                      <span></span>
                    </div>
                  </div>
                  <div className="input-div">
                    <div className="label">Password Never Expires</div>
                    <div className="input-box">
                      <Input
                        handleChange={handleChecking}
                        value={formState.passwordNeverExpires}
                        name="passwordNeverExpires"
                        type="checkbox"
                      />
                    </div>
                  </div>

                  <div className="input-div">
                    <div className="label">
                      User must change password at next Logon
                    </div>
                    <div className="input-box">
                      <Input
                        handleChange={handleChecking}
                        value={formState.mustChangePassword}
                        name="mustChangePassword"
                        type="checkbox"
                      />
                    </div>
                  </div>

                  <div className="input-div">
                    <div className="label">Account is Disabled</div>
                    <div className="input-box">
                      <Input
                        handleChange={handleChecking}
                        value={formState.isDisabled}
                        name="isDisabled"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </form>

                <div className="user-maintenance-buttons-section">
                  <Button onClick={createUser} name="Add" />
                  <Button onClick={updateUser} name="Update User" />
                  <Button onClick={clearFields} name="Clear Data" />
                  <Button onClick={deleteUser} name="Delete User" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="spinner section">
      <Loader headerText="System Security: User Maintenance" />
    </div>
  );
};

export default SystemSecurityMaintenance;
