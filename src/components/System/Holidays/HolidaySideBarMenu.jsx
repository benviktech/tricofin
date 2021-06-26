/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */

import React, { useState } from "react";
import { NavLink, Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled.div`
    display: flex;
    color: #777;
    text-decoration: none
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
    list-style: none;
    border-left: 4px solid #D7D7D7;
    font-weight: bold;
    &:hover {
        background: #D3D3D3;
        border-left: 4px solid #fff;
        cursor: pointer;
    }
`;
const SidebarLabel = styled.span`
  margin-left: 10px;
  font-size: 13px;
`;

const HolidaySidebarMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  let match = useRouteMatch();
  return (
    <NavLink
      to={item.path}
      style={{ textDecoration: "none", display: "block" }}
      activeStyle={{ backgroundColor: "#F3F2F1", color: "#777" }}
    >
      <SidebarLink>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
      </SidebarLink>
    </NavLink>
  );
};

export default HolidaySidebarMenu;
