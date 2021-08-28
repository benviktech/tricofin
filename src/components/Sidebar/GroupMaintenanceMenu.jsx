/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import {
  SidebarLink,
  SidebarLabel,
  DropdownLink,
  DropdownLinkIcon,
} from './StyledComponent';

const GroupMaintenanceMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const { id } = useParams();

  const showSubnav = () => setSubnav(!subnav);
  const { url } = useRouteMatch();

  const currentCustomer = useSelector(state => state.nonIndividualCustomersReducer);

  React.useEffect(() => {
    if (url.split('/')[1] === 'groupmaintenanceview'
    || url.split('/')[1] === 'groupmembers') {
      setSubnav(true);
    }
  }, []);

  return (
    <>
      <SidebarLink onClick={item.subNav && showSubnav}>
        <div className="d-flex">
          <div>
            {' '}
            {item.icon}
          </div>
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
        (Object.keys(currentCustomer.nonIndividualCustomer).length > 0
        && url.split('/')[1] !== 'groupmaintenanceform')
        || url.split('/')[1] === 'groupmaintenanceview'
        || url.split('/')[1] === 'groupmembers' ? (

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

export default GroupMaintenanceMenu;
