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

const NonIndividualSidebarMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const { id } = useParams();

  const showSubnav = () => setSubnav(!subnav);
  const { url } = useRouteMatch();

  const currentCustomer = useSelector(state => state.nonIndividualCustomersReducer);

  React.useEffect(() => {
    if (url.split('/')[1] === 'directorsinformation'
    || url.split('/')[1] === 'nonindividualprimarycontactinfo'
    || url.split('/')[1] === 'nonindividualsecondarycontactinfo'
    || url.split('/')[1] === 'identificationinfo') {
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
        && url.split('/')[1] !== 'nonindidualcustomerform')
        || url.split('/')[1] === 'directorsinformation'
        || url.split('/')[1] === 'nonindividualprimarycontactinfo'
        || url.split('/')[1] === 'nonindividualsecondarycontactinfo'
        || url.split('/')[1] === 'updatenonindividualcustomer'
        || url.split('/')[1] === 'viewnonindividualcustomerform'
        || url.split('/')[1] === 'identificationinfo' ? (

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

export default NonIndividualSidebarMenu;
