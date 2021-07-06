import { useState, useEffect } from 'react';
import axios from 'axios';

const systemProductRequest = () => {
  const [systemsLoanDetails, setSystemsLoanDetails] = useState([]);
  const [systemsSavings, setSystemsSavings] = useState([]);
  useEffect(async () => {
    await axios.get('https://tricofin.azurewebsites.net/api/Loans/GetLoanProducts')
      .then(response => setSystemsLoanDetails(response.data))
      .catch(error => console.log(error.message));
  }, []);

  useEffect(async () => {
    await axios.get('https://tricofin.azurewebsites.net/api/Savings/GetSavingsProducts')
      .then(response => setSystemsSavings(response.data))
      .catch(error => console.log(error.message));
  }, []);

  return { systemsLoanDetails, systemsSavings };
};

export default systemProductRequest;
