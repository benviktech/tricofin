/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchCustomer = () => {
  const [searchedCustomerSourced, setSearchedCustomerSourced] = useState('');
  const [finalSortedListSourced, setFinalSortedListSourced] = useState([]);
  const [testState, settestState] = useState([]);
  const sortedCustomersList = [];

  const searchIndividualCustomerSourced = e => {
    const { value } = e.target;
    displaySortedList(testState, value);
    setSearchedCustomerSourced(value);
  };

  useEffect(async () => {
    try {
      const response = await axios.get('https://tricofin.azurewebsites.net/api/System/GetSystemUsers');
      settestState(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const displaySortedList = (data, value) => {
    data.forEach(customer => {
      Object.values(customer).forEach(element => {
        if (isNaN(element)) {
          const elementResult = element.toLowerCase();
          if (elementResult.indexOf(value.toLowerCase()) !== -1) {
            sortedCustomersList.push(customer);
          }
        }
      });
    });

    setFinalSortedListSourced(sortedCustomersList);
  };

  return {
    searchIndividualCustomerSourced,
    searchedCustomerSourced,
    finalSortedListSourced,
    setSearchedCustomerSourced,
  };
};

export default SearchCustomer;
