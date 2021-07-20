/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from 'react';
import axios from 'axios';

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
    const fetchData = async () => {
      await axios.get('https://tricofin.azurewebsites.net/api/Loans/GetLoanProducts')
        .then(response => settestState(response.data))
        .catch(error => console.log(error.message));
    };
    fetchData();
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
