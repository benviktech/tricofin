import { useState, useEffect } from 'react';
import axios from 'axios';

const fetchData = () => {
  const [glTypes, setGlTypes] = useState([]);
  const [glSubTypes, setGlSubTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://tricofin.azurewebsites.net/api/Finance/GetGeneralLedgerTypes')
        .then(response => setGlTypes(response.data))
        .catch(error => console.log(error.message));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://tricofin.azurewebsites.net/api/Finance/GetGeneralLedgerSubTypes')
        .then(response => setGlSubTypes(response.data))
        .catch(error => console.log(error.message));
    };
    fetchData();
  }, []);

  return { glTypes, glSubTypes };
};

export default fetchData;
