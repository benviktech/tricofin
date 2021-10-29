const NavbarData = [
  {
    mainText: 'System',
    innerLinks: [
      {
        to: '#',
        linkText: 'Log Out',
      },
      {
        to: '/system/systemsecurity/roles',
        linkText: 'System Security',
      },
      {
        to: '/system/systemsettings/updatecompanyinfo',
        linkText: 'System Settings',
      },
    ],
  },
  {
    mainText: 'Customers',
    innerLinks: [
      {
        to: '/individualcustomerform',
        linkText: 'Individual Customers',
      },
      {
        to: '/nonindidualcustomerform',
        linkText: 'Non Individual Customers',
      },
      {
        to: '/groupmaintenanceform',
        linkText: 'Group Maintenance',
      },
    ],
  },
  {
    mainText: 'Loans',
    innerLinks: [
      {
        to: '#',
        linkText: 'Action one',
      },
      {
        to: '#',
        linkText: 'Another action two',
      },
      {
        to: '#',
        linkText: 'Something else there',
      },
    ],
  },
  {
    mainText: 'Finance',
    innerLinks: [
      {
        to: '#',

        linkText: 'General Ledger',
        subNavList: [
          {
            to: '/generaledgermaintenance',
            linkText: 'GL Maintenance',
          },
          {
            to: '/generaledgerpayments',
            linkText: 'General Ledger Payments',
          },
          {
            to: '/generaledgerreports',
            linkText: 'General Ledger Reports',
          },
        ],
      },
      {
        to: '/transactions',
        linkText: 'Transactions',
      },
      {
        to: '#',
        linkText: 'Batch Transactions',
      },
      {
        to: '/transactionscodes',
        linkText: 'Transaction Codes',
      },
      {
        to: '#',
        linkText: 'Fixed Accounts',
      },
    ],
  },
  {
    mainText: 'Savings',
    innerLinks: [
      {
        to: '#',
        linkText: 'Action',
      },
      {
        to: '#',
        linkText: 'Another action',
      },
      {
        to: '#',
        linkText: 'Something else here',
      },
    ],
  },
  {
    mainText: 'Utilities',
    innerLinks: [
      {
        to: '#',
        linkText: 'Action',
      },
      {
        to: '#',
        linkText: 'Another action',
      },
      {
        to: '#',
        linkText: 'Something else here',
      },
    ],
  },
  {
    mainText: 'Processes',
    innerLinks: [
      {
        to: '#',
        linkText: 'Action',
      },
      {
        to: '#',
        linkText: 'Another action',
      },
      {
        to: '#',
        linkText: 'Something else here',
      },
    ],
  },
  {
    mainText: 'Reports',
    innerLinks: [
      {
        to: '#',
        linkText: 'Action',
      },
      {
        to: '#',
        linkText: 'Another action',
      },
      {
        to: '#',
        linkText: 'Something else here',
      },
    ],
  },
  {
    mainText: 'Help',
    innerLinks: [
      {
        to: '#',
        linkText: 'Action',
      },
      {
        to: '#',
        linkText: 'Another action',
      },
      {
        to: '#',
        linkText: 'Something else here',
      },
    ],
  },
];

export default NavbarData;
