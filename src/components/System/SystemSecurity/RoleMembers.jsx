/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */

import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useParams } from 'react-router';
import axios from 'axios';
import SimpleLoader from './Loader/SimpleLoader';

const baseUrl = 'https://tricofin.azurewebsites.net';

const RoleMembers = () => {
  const { id } = useParams();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
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

  const filterUsers = id => {
    if (id) {
      const filteredtempusers = users.filter(user => user.roleID.toLowerCase().includes(id.toLowerCase()));
      setFilteredUsers(filteredtempusers);
    } else {
      setFilteredUsers([]);
    }
  };

  useEffect(() => {
    fetchSystemUsers();
  }, []);

  useEffect(() => {
    filterUsers(id);
  }, [id, users]);

  useEffect(() => {
    if (filteredUsers.length > 0) {
      setHasMember(true);
    } else {
      setHasMember(false);
    }
  }, [filteredUsers]);

  return (
    <div>
      <div className="display-role-members-section">
        <div className="user-role-listings p-2">ROLE MEMBERS LISTING</div>

        { (hasMember && !loading) ? (
          <div className="role-members-table">
            <div className="roles-header-section">
              <div className="column-two">UserName</div>
              <div className="column-three">Surname</div>
            </div>
            {filteredUsers.map(user => (
              <div key={user.userName} className="roles-header-section">
                <div className="column-two">{user.userName}</div>
                <div className="column-three">{user.surName}</div>
              </div>
            ))}
          </div>
        ) : (loading) ? (
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

export default RoleMembers;
