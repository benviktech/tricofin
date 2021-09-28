/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */

import React, { useEffect, useState } from 'react';
import {
  Link, useRouteMatch, Switch, Route, useLocation,
} from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import SecuritySidebar from './SecuritySideBar';
import './index.css';
import Loader from './Loader/Loader';
import { Button, Input } from '../../_generics/Generics';
import SimpleLoader from './Loader/SimpleLoader';
import SystemSecurityUsers from './SystemUsers';
import UserBranches from './UserBranches';

const baseUrl = 'https://tricofin.azurewebsites.net';

const SystemSecurityBranches = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const path = location.pathname;
  const { path, url } = useRouteMatch();

  return false ? (
    <div>
      <Loader />
      <h1>Error</h1>
    </div>
  ) : true ? (
    <div className="system-individual-customer-form">
      <div className="system-lower-form-section">
        <div className="system-branches-topbar">
          <span>System Security: User Branches Management</span>
        </div>
        <div className="security-lower-downer-section">
          <div className="security-left-inner-form-section">
            <SecuritySidebar />
          </div>
          <div className="submit-form-top-section-role">
            <Switch>
              <Route path={`${path}`} exact component={() => <SystemSecurityUsers path={path} url={url} />} />
              <Route path={`${path}/:username`} component={() => <UserBranches url={url} />} />
            </Switch>
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

export default SystemSecurityBranches;
