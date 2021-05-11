/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled.div`
    display: flex;
    color: #777;
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

const DropdownLink = styled(NavLink)`
    height: 60px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    color: #444;
    &:hover {
        background: #D3D3D3;
        cursor: pointer;
        text-decoration: none;
        color: #f5f5f5
    }
`;

const DropdownLinkIcon = styled.div`
    padding: 2px
    background: teal;
`;

const SidebarMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {
            item.subNav && subnav ? item.iconOpened
              : item.subNav ? item.iconClosed : null
            }
        </div>
      </SidebarLink>
      {
            subnav && item.subNav.map((item, index) => (
              <DropdownLink to={item.path} key={index}>
                <DropdownLinkIcon>
                  { item.icon }
                </DropdownLinkIcon>
                <SidebarLabel>{ item.title }</SidebarLabel>
              </DropdownLink>
            ))
        }
    </>
  );
};

export default SidebarMenu;
