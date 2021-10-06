/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
  SidebarLink,
  SidebarLabel,
  DropdownLink,
  DropdownLinkIcon,
} from './StyledComponent';

const TransactionSideBarMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const [homeRoute, setHomeRoute] = useState(false);
  const history = useHistory();

  const showSubnav = () => {
    setSubnav(!subnav);
    setHomeRoute(true);
  };
  const { url } = useRouteMatch();

  React.useEffect(() => {
    if (url.split('/')[1] === 'cashregister') {
      setSubnav(true);
    }
  }, []);

  React.useEffect(() => {
    if (subnav === false && homeRoute) {
      history.push('/transactions');
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
      { (url.split('/')[1] === 'transactions')
      || url.split('/')[1] === 'cashregister' ? (

          subnav && item.subNav.map((item, index) => (
            <DropdownLink
              onClick={item.subNav && showSubnav}
              activeStyle={{
                background: '#AEAEAE',
              }}
              exact
              to={`${item.path}`}
              key={index}
            >
              <DropdownLinkIcon>
                { item.icon }
              </DropdownLinkIcon>
              <SidebarLabel>{ item.title }</SidebarLabel>
            </DropdownLink>
          ))
        ) : null}
    </>
  );
};

export default TransactionSideBarMenu;
