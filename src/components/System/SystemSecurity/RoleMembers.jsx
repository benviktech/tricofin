import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";

const baseUrl = "https://tricofin.azurewebsites.net";

const RoleMembers = () => {
  const { id } = useParams();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const fetchSystemUsers = async () => {
    axios
      .get(`${baseUrl}/api/System/GetSystemUsers`)
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function (error) {});
  };

  const filterUsers = (id) => {
    if (id) {
      const filteredtempusers = users.filter((user) =>
        user.roleID.toLowerCase().includes(id.toLowerCase())
      );
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

  return (
    <div>
      <div className="display-role-members-section">
        <div className="user-role-listings p-2">ROLE MEMBERS LISTING</div>
        <div className="role-members-table">
          <div className="roles-header-section">
            <div className="column-two">UserName</div>
            <div className="column-three">Surname</div>
          </div>
          {filteredUsers.map((user) => (
            <div className="roles-header-section">
              <div className="column-two">{user.userName}</div>
              <div className="column-three">{user.surName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleMembers;
