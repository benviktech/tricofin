/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import {
  SidebarLink,
  SidebarLabel,
  DropdownLink,
  DropdownLinkIcon,
} from './StyledComponent';

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
