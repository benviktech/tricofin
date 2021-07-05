/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-globals */

import { useState, useEffect } from 'react';

const systemsProduct = () => {
  const [searchedCustomerProduct, setSearchedCustomerProduct] = useState('');
  const [finalSortedListProduct, setFinalSortedListProduct] = useState([]);
  const [testState, settestState] = useState([]);
  const sortedCustomersList = [];

  const searchIndividualCustomerProduct = e => {
    const { value } = e.target;
    displaySortedList(testState, value);
    setSearchedCustomerProduct(value);
  };

  useEffect(() => {
    const systemsProduct = [
      { id: 1, system: 'RE', name: 'FIRST SAVINGS SYSTEM' },
      { id: 2, system: 'DF', name: 'SECOND SAVINGS SYSTEM' },
      { id: 3, system: 'TZ', name: 'THIRD SAVINGS SYSTEM' },
      { id: 4, system: 'ZU', name: 'FORTH SAVINGS SYSTEM' },
      { id: 5, system: 'DQ', name: 'FIFTH SAVINGS SYSTEM' },
    ];
    settestState(systemsProduct);
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

    setFinalSortedListProduct(sortedCustomersList);
  };

  return {
    searchIndividualCustomerProduct,
    searchedCustomerProduct,
    finalSortedListProduct,
    setSearchedCustomerProduct,
  };
};

export default systemsProduct;
