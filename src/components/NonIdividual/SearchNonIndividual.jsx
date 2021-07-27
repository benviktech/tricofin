/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchCustomer = () => {
  const [searchedCustomer, setSearchedCustomer] = useState('');
  const [finalSortedList, setFinalSortedList] = useState([]);
  const [testState, settestState] = useState([]);
  const sortedCustomersList = [];

  const searchNonIndividualCustomer = e => {
    const { value } = e.target;
    displaySortedList(testState, value);
    setSearchedCustomer(value);
  };

  useEffect(async () => {
    try {
      const response = await axios.get('https://tricofin.azurewebsites.net/api/Customers/GetNonIndividualCustomers');
      settestState(response.data);
    } catch (error) {
      console.log(error.message);
    }
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

    setFinalSortedList(sortedCustomersList);
  };

  return {
    searchNonIndividualCustomer,
    searchedCustomer,
    finalSortedList,
    setSearchedCustomer,
  };
};

export default SearchCustomer;
