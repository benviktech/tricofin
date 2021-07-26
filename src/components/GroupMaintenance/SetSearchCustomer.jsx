/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-globals */

import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchCustomer = () => {
  const [searchedCustomerSet, setSearchedCustomerSet] = useState('');
  const [finalSortedListSet, setFinalSortedListSet] = useState([]);
  const [testState, settestState] = useState([]);
  const sortedCustomersList = [];

  const searchIndividualCustomerSet = e => {
    const { value } = e.target;
    displaySortedList(testState, value);
    setSearchedCustomerSet(value);
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

    setFinalSortedListSet(sortedCustomersList);
  };

  return {
    searchIndividualCustomerSet,
    searchedCustomerSet,
    finalSortedListSet,
    setSearchedCustomerSet,
  };
};

export default SearchCustomer;
