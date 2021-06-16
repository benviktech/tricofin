/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from "react";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SecuritySidebar from "./SecuritySideBar";
import Modal from "../../Modal/Modal";
import ModalFunction from "../../Modal/ModalFunction";
import "./index.css";
import Loader from "./Loader/Loader";
import RoleMembers from "./RoleMembers";
import { Button, Input } from "../../_generics/Generics";
import {
  createSystemRole,
  fetchSystemRoles,
  UpdateSystemRole,
  DeleteSystemRole,
  RESET_ROLE_ALERT,
} from "../../../actions/systemRole";

const SystemSecurityRoles = () => {
  const dispatch = useDispatch();
  const initialState = {
    roleID: "",
    description: "",
    createdOn: "2021-05-30T15:02:01.437Z",
    createdBy: "BENVIK",
    modifiedOn: "2021-05-30T15:02:01.437Z",
    modifiedBy: "BENVIK",
  };
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const { path, url } = useRouteMatch();
  const { modalCloser, openModel, modalText } = ModalFunction();

  const roles = useSelector((state) => state.systemRoleReducer);
  const role = useSelector((state) => state.systemRoleReducer?.systemRoles);
  const companyInfo = useSelector((state) => state.companyInfoReducer);
  const roleCreated = useSelector(
    (state) => state?.systemRoleReducer?.roleCreated
  );
  const roleUpdated = useSelector(
    (state) => state?.systemRoleReducer?.roleUpdated
  );
  const deletedRole = useSelector(
    (state) => state?.systemRoleReducer?.deletedRole
  );

  useEffect(() => {
    dispatch(fetchSystemRoles());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: RESET_ROLE_ALERT });
    }, 2000);
  }, [roleCreated, roleUpdated, deletedRole]);

  const handleChange = (e) => {
    console.log("clicked");
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const RoleValidator = (values) => {
    const result = {};
    if (!values.description.trim("")) {
      result.description = "Description is required";
    }
    if (!values.roleID.trim("")) {
      result.roleID = "Role ID is required";
    }
    // if (values.roleID.length > 4) {
    //   result.roleID = "Max Length is 4 Characters";
    // }

    return result;
  };

  const updateRole = () => {
    console.log("fired");
    const response = RoleValidator(values);
    setErrors(response);
    if (Object.keys(errors).length === 0) {
      dispatch(UpdateSystemRole(values));
    }
  };

  const createRole = () => {
    const response = RoleValidator(values);
    setErrors(response);
    if (Object.keys(response).length === 0) {
      dispatch(createSystemRole(values));
    }
  };

  const removeRole = () => {
    const response = RoleValidator(values);
    setErrors(response);
    if (Object.keys(response).length === 0) {
      dispatch(DeleteSystemRole(values));
    }
  };

  // useEffect(() => {
  //   if (Object.keys(errors).length === 0) {
  //     console.log(values);
  //     dispatch(createSystemRole(values));
  //   }
  // }, [errors]);

  const clearFields = () => {
    setErrors({});
  };

  return roles.loading ? (
    <div>
      <Loader />
      <h1>{roles.error}</h1>
    </div>
  ) : roles.systemRoles.length > 0 ? (
    <div className="individual-customer-form">
      <Modal
        modalText={modalText}
        modalCloser={modalCloser}
        openModel={openModel}
      />
      {roleCreated && (
        <div
          className="alert user-alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Success</strong> Role {role.roleID} Created Successfully
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}

      {roleUpdated && (
        <div
          className="alert user-alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Success</strong> Role {role.roleID} Updated Successfully
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}

      {deletedRole && (
        <div
          className="alert user-alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Success</strong> {deletedRole.remarks}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>System Security: Roles</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <SecuritySidebar />
          </div>
          <div className="submit-form-top-section-role">
            <div className="create-role-section">
              <form>
                <div className="role-id d-flex">
                  <label htmlFor="role-id"> Role Id:</label>
                  <Input
                    name="roleID"
                    handleChange={handleChange}
                    value={values.roleID}
                    type="text"
                    maxlength="4"
                  />
                  <br />
                  {errors.roleID && (
                    <span className="error-display">{errors.roleID}</span>
                  )}
                </div>
                <div className="description my-2 d-flex">
                  <label htmlFor="description"> Description:</label>
                  <Input
                    name="description"
                    value={values.description}
                    handleChange={handleChange}
                    type="text"
                  />
                  <br />
                  {errors.description && (
                    <span className="error-display">{errors.description}</span>
                  )}
                </div>
              </form>
            </div>
            <div className="roles-lower-form-section">
              <div className="display-roles-section">
                <div className="user-role-listings p-2">USER ROLE LISTING</div>
                <div className="role-listing-table">
                  <div className="roles-header-section">
                    <div className="column-two">Role ID</div>
                    <div className="column-three">Description</div>
                  </div>
                  {roles.systemRoles.map((role) => (
                    <div className="roles-header-section">
                      <Link
                        to={{
                          pathname: `${url}/${role.roleID}`,
                        }}
                        className="column-two"
                        onClick={() =>
                          setValues({
                            ...values,
                            roleID: role.roleID,
                            description: role.description,
                          })
                        }
                      >
                        {role.roleID}
                      </Link>
                      <Link
                        to={{
                          pathname: `${url}/${role.roleID}`,
                        }}
                        className="column-three"
                        onClick={() =>
                          setValues({
                            ...values,
                            roleID: role.roleID,
                            description: role.description,
                          })
                        }
                      >
                        {role.description}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="display-users-section">
                <Switch>
                  <Route path={`${path}/:id`} component={RoleMembers}></Route>
                </Switch>
              </div>
            </div>
            <div className="role-buttons-section">
              <Button onClick={createRole} name="Add" />
              <Button onClick={updateRole} name="Update" />
              <Button onClick={removeRole} name="Delete" />
              <Button onClick={clearFields} name="Clear" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="spinner section">
      <Loader headerText="System Security: Roles Section" />
    </div>
  );
};

export default SystemSecurityRoles;
