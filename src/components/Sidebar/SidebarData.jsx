import React from 'react';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import * as HiIcons from 'react-icons/hi';
import * as GrIcons from 'react-icons/gr';

const iconStyles = { color: 'white', fontSize: '1.8em' };
const innerIconStyles = { fontSize: '1.2em' };

export const IndividualCustomerSidebarData = [
  {
    title: 'Personal Info',
    icon: <MdIcons.MdDashboard style={iconStyles} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Signature & Photo',
        path: '/signature',
        icon: <FaIcons.FaFileSignature style={innerIconStyles} />,
      },
      {
        title: 'Identification',
        path: '/identification',
        icon: <HiIcons.HiIdentification style={innerIconStyles} />,
      },
      {
        title: 'Primary Contact',
        path: '/primarycontactinfo',
        icon: <GrIcons.GrContact style={innerIconStyles} />,
      },
      {
        title: 'Secondary Contact',
        path: '/secondarycontactinfo',
        icon: <GrIcons.GrContact style={innerIconStyles} />,
      },
    ],
  },
];

export const NonIndidualCustomerSidebarData = [
  {
    title: 'Non Individual Customer Maintenance',
    icon: <MdIcons.MdDashboard style={iconStyles} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Directors Information',
        path: '/directorsinformation',
        icon: <HiIcons.HiIdentification style={innerIconStyles} />,
      },
      {
        title: 'Identification Info',
        path: '/identificationinfo',
        icon: <GrIcons.GrContact style={innerIconStyles} />,
      },
      {
        title: 'Primary Contact',
        path: '/nonindividualprimarycontactinfo',
        icon: <GrIcons.GrContact style={innerIconStyles} />,
      },
      {
        title: 'Secondary Contact',
        path: '/nonindividualsecondarycontactinfo',
        icon: <GrIcons.GrContact style={innerIconStyles} />,
      },
    ],
  },
];
