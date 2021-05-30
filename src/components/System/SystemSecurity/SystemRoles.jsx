/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */

import React, { useEffect } from 'react';
import { Link, NavLink, useRouteMatch, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SecuritySidebar from './SecuritySideBar';
import Modal from '../../Modal/Modal';
import ModalFunction from '../../Modal/ModalFunction';
import './index.css';
import Loader from '../../Loader/Loader';
import { fetchCompanyInfo } from "../../../actions/systemCompanyInfo"
import RoleMembers from './RoleMembers';
import {Button} from '../../_generics/Generics';

const SystemSecurityRoles = () => {
  const dispatch = useDispatch();
  const {path, url} = useRouteMatch();
  const btnName = 'Add';

  const {
    modalCloser, modalOpener, openModel, modalText,
  } = ModalFunction();

  const rolesList = [
    {
      id: "ADMIN",
      desc: "Aministrator",
    },
    {
      id: "CASHIER",
      desc: "Cashier",
    },
    {
      id: "USER",
      desc: "User",
    },
  ]

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
          <span>System Security: Roles</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <SecuritySidebar />
          </div>
          <div className="submit-form-top-section">
            <div className="create-role-section">
              <form>
                <div className="role-id w-50 d-flex justify-content-end">
                  <label htmlFor="role-id"> Role Id:
                    <input className="ml-2" type="text" />
                  </label>
                </div>
                <div className="description w-50 d-flex justify-content-end">
                  <label htmlFor="description"> Description:
                  <input className="ml-2" type="text" />
                  </label>
                </div>
              </form>
            </div>
            <div className="roles-lower-form-section">
              <div className="display-roles-section bg-warning">
                <div className="user-role-listings">
                  User Role Listing
                </div>
                <div className="roles-header-section">
                  <div className="column-one">

                  </div>
                  <div className="column-two">Role ID</div>
                  <div className="column-three">Description</div>
                </div>
                  {
                    rolesList.map(role => (
                      <div
                      className="roles-header-section">
                      <div className="column-one">
    
                      </div>
                      <Link
                      to={{
                        pathname: `${url}/${role.id}`
                      }}  className="column-two">{role.id}</Link>
                      <Link
                      to={{
                        pathname: `${url}/${role.id}`
                      }}  className="column-three">{role.desc}</Link>
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
                <Button name="Add"/>
                <Button name="Cancel"/>
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

export default SystemSecurityRoles;
