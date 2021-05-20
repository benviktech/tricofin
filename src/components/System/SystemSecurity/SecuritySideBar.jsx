import React from 'react';
import styled from 'styled-components';
import SetingsSidebarData from './SecuritySideBarData';
import SetingsSidebarMenu from './SecuritySideBarMenu';

const SideBar = styled.nav`
    width: 100%
    height: 100vh;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

const SecuritySidebar = () => (
  <div className="sidebar-section">
    <SideBar>
      <SidebarWrap>
        {
            SetingsSidebarData.map(item => (
              <SetingsSidebarMenu item={item} key={item.title} />
            ))
        }
      </SidebarWrap>
    </SideBar>
  </div>
);

export default SecuritySidebar;
