/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import {
  SidebarLink,
  SidebarLabel,
  DropdownLink,
  DropdownLinkIcon,
} from './StyledComponent';

const GeneralLedger = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const { id } = useParams();

  const showSubnav = () => setSubnav(!subnav);
  const { url } = useRouteMatch();

//   const currentUser = useSelector(state => state.individualCustomersReducer);

  React.useEffect(() => {
    if (url.split('/')[1] === 'glidentification'
    || url.split('/')[1] === 'bulkauthorize'
    || url.split('/')[1] === 'glsubtypes'
    || url.split('/')[1] === 'glreplicate') {
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
        && url.split('/')[1] !== 'glaccounts')
        || url.split('/')[1] === 'glidentification'
        || url.split('/')[1] === 'bulkauthorize'
        || url.split('/')[1] === 'glsubtypes'
        || url.split('/')[1] === 'glreplicate' ? (

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

export default GeneralLedger;
