/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import {
  Link,
  useRouteMatch,
  Switch,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import SecuritySidebar from './SecuritySideBar';
import './index.css';
import Loader from './Loader/Loader';
import { Button, Input } from '../../_generics/Generics';
import SimpleLoader from './Loader/SimpleLoader';

const baseUrl = 'https://tricofin.azurewebsites.net';

const UserBranches = ({ url }) => (
  <div className="system-branches-container">
    <h1>USER BRANCH MANAGEMENT PAGE</h1>
    <Link
      to={url}
    >
      Back to Users Page
    </Link>
  </div>
);

export default UserBranches;
