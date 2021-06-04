import React from 'react';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import * as HiIcons from 'react-icons/hi';
import * as GrIcons from 'react-icons/gr';

const iconStyles = { color: 'white', fontSize: '1.8em' };
const innerIconStyles = { fontSize: '1.2em' };

const SecuritySidebarData = [
  {
    title: 'Roles',
    icon: <RiIcons.RiTeamLine style={iconStyles} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    path:'/system/systemsecurity/roles',
  },
  {
    title: 'Access Rights',
    icon: <RiIcons.RiUserAddLine style={iconStyles} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    path:'/system/systemsecurity/rights',
  },
  {
    title: 'Add User',
    icon: <RiIcons.RiUserLine style={iconStyles} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    path:'/system/systemsecurity/adduser',
  },
  {
    title: 'Edit User',
    icon: <RiIcons.RiUserLine style={iconStyles} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    path:'/system/systemsecurity/editUser',
  },

];

export default SecuritySidebarData;
