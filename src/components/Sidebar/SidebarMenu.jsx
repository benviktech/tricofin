/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams, useRouteMatch } from 'react-router-dom';
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
    padding-left: 2rem;
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
  const { id } = useParams();

  const showSubnav = () => setSubnav(!subnav);
  const { url } = useRouteMatch();

  const currentUser = useSelector(state => state.individualCustomersReducer);

  React.useEffect(() => {
    if (url.split('/')[1] === 'signature'
    || url.split('/')[1] === 'identification'
    || url.split('/')[1] === 'primarycontactinfo'
    || url.split('/')[1] === 'secondarycontactinfo') {
      setSubnav(true);
    }
  }, []);

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
        (Object.keys(currentUser.individualCustomer).length > 0
        && url.split('/')[1] !== 'individualcustomerform')
        || url.split('/')[1] === 'signature'
        || url.split('/')[1] === 'identification'
        || url.split('/')[1] === 'primarycontactinfo'
        || url.split('/')[1] === 'secondarycontactinfo' ? (

            subnav && item.subNav.map((item, index) => (
              <DropdownLink
                onClick={item.subNav && showSubnav}
                activeStyle={{
                  background: '#AEAEAE',
                }}
                exact
                to={`${item.path}/${id}`}
                key={index}
              >
                <DropdownLinkIcon>
                  { item.icon }
                </DropdownLinkIcon>
                <SidebarLabel>{ item.title }</SidebarLabel>
              </DropdownLink>
            ))
          ) : null
        }
    </>
  );
};

export default SidebarMenu;
