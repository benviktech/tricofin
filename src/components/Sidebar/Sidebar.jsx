import React from 'react';
import styled from 'styled-components';
import SidebarData from './SidebarData';
import SidebarMenu from './SidebarMenu';

const SideBar = styled.nav`
    width: 100%
    height: 100vh;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

const Sidebar = () => (
  <div className="sidebar-section">
    <SideBar>
      <SidebarWrap>
        {
            SidebarData.map(item => (
              <SidebarMenu item={item} key={item.title} />
            ))
        }
      </SidebarWrap>
    </SideBar>
  </div>
);

export default Sidebar;
