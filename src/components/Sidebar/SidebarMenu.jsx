/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import {
  SidebarLink,
  SidebarLabel,
  DropdownLink,
  DropdownLinkIcon,
} from './StyledComponent';

const SidebarMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const [homeRoute, setHomeRoute] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  const showSubnav = () => {
    setSubnav(!subnav);
    setHomeRoute(true);
  };
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

  React.useEffect(() => {
    if (subnav === false && homeRoute) {
      history.push('/individualcustomerform');
    }
  }, [homeRoute]);

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
