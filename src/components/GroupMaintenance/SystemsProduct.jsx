/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from 'react';
import axios from 'axios';

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
    const fetchData = async () => {
      await axios.get('https://tricofin.azurewebsites.net/api/Savings/GetSavingsProducts')
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
