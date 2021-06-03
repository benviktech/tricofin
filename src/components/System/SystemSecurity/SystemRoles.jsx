/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SecuritySidebar from './SecuritySideBar';
import Modal from '../../Modal/Modal';
import ModalFunction from '../../Modal/ModalFunction';
import './index.css';
import Loader from '../../Loader/Loader';
import RoleMembers from './RoleMembers';
import {Button, Input} from '../../_generics/Generics';
import { createSystemRole, fetchSystemRoles } from '../../../actions/systemRole';

const SystemSecurityRoles = () => {
  const dispatch = useDispatch();
  const initialState = {
    roleID: "",
    description: "",
    createdOn: "2021-05-30T15:02:01.437Z",
    createdBy: "BENVIK",
    modifiedOn: "2021-05-30T15:02:01.437Z",
    modifiedBy: "BENVIK"
  }
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const {path, url} = useRouteMatch();
  const {
    modalCloser, openModel, modalText,
  } = ModalFunction();

  const roles = useSelector(state => state.systemRoleReducer);
  const companyInfo = useSelector(state => state.companyInfoReducer);
  
  useEffect(() => {
    dispatch(fetchSystemRoles());
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  const submitRole = () => {
    const result = {}
    if(!values.description.trim('')){
      result.description = 'Description is required'
    }
    if(!values.roleID.trim('')){
      result.roleID = 'Role ID is required'
    }
    if(values.roleID.length > 4){
      result.roleID = 'Max Length is 4 Characters'
    }

    setErrors(result);
  }

  useEffect(() => {
    if(Object.keys(errors).length === 0){
      console.log(values);
      dispatch(createSystemRole(values));
    }
  }, [errors])

  const clearFields = () => {
    console.log('clear fields')
  }

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
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>System Security: Roles</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <SecuritySidebar />
          </div>
          <div className="submit-form-top-section">
            <div className="create-role-section">
              <form>
                <div className="role-id d-flex">
                  <label htmlFor="role-id"> Role Id:
                  </label>
                    <Input 
                    name = "roleID"
                    handleChange = {handleChange}
                    value = {values.roleID}
                    type="text" />
                </div>
                <div className="description my-2 d-flex">
                  <label htmlFor="description"> Description:
                  </label>
                    <Input 
                    name = "description"
                    value={values.description}
                    handleChange = {handleChange}
                    type="text" />
                </div>
              </form>
            </div>
            <div className="roles-lower-form-section">
              <div className="display-roles-section">
                <div className="user-role-listings p-2">
                  User Role Listing
                </div>
                <div className="roles-header-section">
                  <div className="column-one">

                  </div>
                  <div className="column-two">Role ID</div>
                  <div className="column-three">Description</div>
                </div>
                  {
                    roles.systemRoles.map(role => (
                      <div
                      className="roles-header-section">
                      <div className="column-one">
                      </div>
                      <Link
                      to={{
                        pathname: `${url}/${role.roleID}`
                      }}  className="column-two">{role.roleID}</Link>
                      <Link
                      to={{
                        pathname: `${url}/${role.roleID}`
                      }}  className="column-three">{role.description}</Link>
                    </div>
                    ))
                  }
              </div>
              <div className="display-users-section">
                <Switch>
                  <Route 
                    path={`${path}/:id`} 
                    component={RoleMembers}></Route>
                </Switch>
              </div>
          </div>
          <div className="cancel-submit-buttons-section">
                <Button 
                onClick = {submitRole}
                name="Add"/>
                <Button 
                onClick = {clearFields}
                name="Cancel"/>
              </div>
            </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="spinner section">
      {roles.error}
    </div>
  );
};

export default SystemSecurityRoles;
