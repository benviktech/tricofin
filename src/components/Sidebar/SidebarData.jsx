import React from 'react';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import * as HiIcons from 'react-icons/hi';
import * as GrIcons from 'react-icons/gr';

const iconStyles = { color: 'white', fontSize: '1.8em' };
const innerIconStyles = { fontSize: '1.2em' };

const SidebarData = [
  {
    title: 'Personal Info',
    icon: <MdIcons.MdDashboard style={iconStyles} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Signature',
        path: '/signature',
        icon: <FaIcons.FaFileSignature style={innerIconStyles} />,
      },
      {
        title: 'Identification',
        path: '/identification',
        icon: <HiIcons.HiIdentification style={innerIconStyles} />,
      },
      {
        title: 'Contact Info',
        path: '/contactinfo',
        icon: <GrIcons.GrContact style={innerIconStyles} />,
      },
    ],
  },
];

export default SidebarData;
