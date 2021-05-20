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
    title: 'Company Info',
    icon: <MdIcons.MdAccountBalance style={iconStyles} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    path:'/systemsettingscompanyinfo',
  },
  {
    title: 'Other Settings',
    icon: <MdIcons.MdDashboard style={iconStyles} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    path:'/systemsettingsothersettings',
  },
];

export default SecuritySidebarData;
