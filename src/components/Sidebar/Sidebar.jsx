import React from 'react';
import styled from 'styled-components';
import {
  IndividualCustomerSidebarData,
  NonIndidualCustomerSidebarData,
  GroupMaintenanceData,
} from './SidebarData';
import SidebarMenu from './SidebarMenu';
import NonIndividualSidebarMenu from './NonIdividualSidebarMenu';
import GroupMaintenanceMenu from './GroupMaintenanceMenu';

const SideBar = styled.nav`
    width: 100%
    height: 100vh;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

export const Sidebar = () => (
  <div className="sidebar-section">
    <SideBar>
      <SidebarWrap>
        {
            IndividualCustomerSidebarData.map(item => (
              <SidebarMenu item={item} key={item.title} />
            ))
        }
      </SidebarWrap>
    </SideBar>
  </div>
);

export const NonIdividualSidebar = () => (
  <div className="sidebar-section">
    <SideBar>
      <SidebarWrap>
        {
          NonIndidualCustomerSidebarData.map(item => (
            <NonIndividualSidebarMenu item={item} key={item.title} />
          ))
      }
      </SidebarWrap>
    </SideBar>
  </div>
);

export const GroupMaintenanceSidebar = () => (
  <div className="sidebar-section">
    <SideBar>
      <SidebarWrap>
        {
        GroupMaintenanceData.map(item => (
          <GroupMaintenanceMenu item={item} key={item.title} />
        ))
    }
      </SidebarWrap>
    </SideBar>
  </div>
);
