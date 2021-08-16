/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */

import { useState, useEffect } from 'react';
import axios from 'axios';

const fetchData = () => {
  const [searchedCustomer, setSearchedCustomer] = useState('');
  const [finalSortedList, setFinalSortedList] = useState([]);
  const [glTypes, setGlTypes] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [glSubTypes, setGlSubTypes] = useState([]);
  const sortedCustomersList = [];

  const searchIndividualCustomer = e => {
    const { value } = e.target;
    displaySortedList(responseData, value);
    setSearchedCustomer(value);
  };

  useEffect(async () => {
    try {
      const response = await axios.get('https://tricofin.azurewebsites.net/api/Finance/GetGeneralLedgerTypes');
      setGlTypes(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(async () => {
    try {
      const response = await axios.get('https://tricofin.azurewebsites.net/api/Finance/GetGeneralLedgerIDs');
      setResponseData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://tricofin.azurewebsites.net/api/Finance/GetGeneralLedgerSubTypes')
        .then(response => setGlSubTypes(response.data))
        .catch(error => console.log(error.message));
    };
    fetchData();
  }, []);

  const displaySortedList = (data, value) => {
    data.forEach(customer => {
      Object.values(customer).forEach(element => {
        if (typeof element === 'string') {
          const elementResult = element.toLowerCase();
          if (elementResult.indexOf(value.toLowerCase()) !== -1) {
            sortedCustomersList.push(customer);
          }
        }
      });
    });

    setFinalSortedList(sortedCustomersList);
  };

  return {
    searchIndividualCustomer,
    searchedCustomer,
    finalSortedList,
    setSearchedCustomer,
    glTypes,
    setFinalSortedList,
    glSubTypes,
    responseData,
  };
};

export default fetchData;
