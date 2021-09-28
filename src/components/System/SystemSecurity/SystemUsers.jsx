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
import UserBranches from './UserBranches';

const baseUrl = 'https://tricofin.azurewebsites.net';

const SystemSecurityUsers = ({ path, url }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [hasMember, setHasMember] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSystemUsers = async () => {
    axios
      .get(`${baseUrl}/api/System/GetSystemUsers`)
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {});
  };

  const filterUsers = userName => {
    if (userName.length > 0) {
      const filteredtempusers = users.filter(
        user => user.userName.toLowerCase().includes(userName.toLowerCase()),
      );
      setFilteredUsers(filteredtempusers);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    fetchSystemUsers();
  }, []);

  useEffect(() => {
    filterUsers(userName);
  }, [users, userName]);

  useEffect(() => {
    if (filteredUsers.length > 0) {
      setHasMember(true);
    } else {
      setHasMember(false);
    }
  }, [filteredUsers]);

  return (
    <div className="system-branches-container">
      <div className="user-search-box">
        <div style={{ fontSize: '13px', paddingLeft: '10px' }}>
          Search a User
        </div>
        <Input
          value={userName}
          name="userName"
          handleChange={e => setUserName(e.target.value)}
          type="text"
          className="text-input-user"
        />
      </div>
      <div className="display-users-section">
        <div className="users-listings p-2 user-table-header">SYSTEM USERS</div>
        <div className="users-table-row">
          <div
            className="users-table-column2 user-table-header"
            style={{
              padding: '3px 3px',
              backgroundColor: '#1991da',
              color: 'white',
            }}
          >
            SURNAME
          </div>
          <div
            className="users-table-column3 user-table-header"
            style={{
              padding: '3px 4px',
              backgroundColor: '#1991da',
              color: 'white',
            }}
          >
            SURNAME
          </div>
        </div>

        {hasMember && !loading ? (
          <div className="user-branches-table">
            {filteredUsers.map(user => (
              <div key={user.userName} className="users-table-row">
                <Link
                  className="users-table-column2"
                  to={`${url}/${user.userName}`}
                >
                  {user.userName}
                </Link>

                <Link
                  className="users-table-column3"
                  to={`${url}/${user.userName}`}
                >
                  {user.surName}
                </Link>
              </div>
            ))}
          </div>
        ) : loading ? (
          <div className="center-loader">
            <SimpleLoader />
          </div>
        ) : (
          <div className="center-loader">No users Added to this Role</div>
        )}
      </div>
    </div>
  );
};

export default SystemSecurityUsers;
