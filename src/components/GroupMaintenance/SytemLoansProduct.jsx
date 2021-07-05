/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-globals */

import { useState, useEffect } from 'react';

const systemsLoan = () => {
  const [searchedCustomerLoan, setSearchedCustomerLoan] = useState('');
  const [finalSortedListLoan, setFinalSortedListLoan] = useState([]);
  const [testState, settestState] = useState([]);
  const sortedCustomersList = [];

  const searchIndividualCustomerLoan = e => {
    const { value } = e.target;
    displaySortedList(testState, value);
    setSearchedCustomerLoan(value);
  };

  useEffect(() => {
    const systemsLoan = [
      { id: 1, system: 'RE', name: 'FIRST LOANS SYSTEM' },
      { id: 2, system: 'DF', name: 'SECOND LOANS SYSTEM' },
      { id: 3, system: 'TZ', name: 'THIRD LOANS SYSTEM' },
      { id: 4, system: 'ZU', name: 'FORTH LOANS SYSTEM' },
      { id: 5, system: 'DQ', name: 'FIFTH LOANS SYSTEM' },
    ];
    settestState(systemsLoan);
  }, []);

  const displaySortedList = (data, value) => {
    data.forEach(customer => {
      Object.values(customer).forEach(element => {
        if (isNaN(element)) {
          if (element.indexOf(value.toLocaleUpperCase()) !== -1) {
            sortedCustomersList.push(customer);
          }
        }
      });
    });

    setFinalSortedListLoan(sortedCustomersList);
  };

  return {
    searchIndividualCustomerLoan,
    searchedCustomerLoan,
    finalSortedListLoan,
    setSearchedCustomerLoan,
  };
};

export default systemsLoan;
