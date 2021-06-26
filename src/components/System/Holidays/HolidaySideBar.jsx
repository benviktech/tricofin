import React from "react";
import styled from "styled-components";
import HolidaySidebarData from "./HolidaySideBarData";
import HolidaySidebarMenu from "./HolidaySideBarMenu";

const SideBar = styled.nav`
    width: 100%
    height: 100vh;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const HolidaySidebar = () => (
  <div className="sidebar-section">
    <SideBar>
      <SidebarWrap>
        {HolidaySidebarData.map((item) => (
          <HolidaySidebarMenu item={item} key={item.title} />
        ))}
      </SidebarWrap>
    </SideBar>
  </div>
);

export default HolidaySidebar;
