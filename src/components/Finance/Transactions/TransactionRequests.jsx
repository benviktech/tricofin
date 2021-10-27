import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fectchDailyTransactions } from '../../../actions/generalLedger';

const TransactionRequests = () => {
  const [tranTypes, setTranTypes] = useState([]);
  const [accTypes, setAccTypes] = useState([]);
  const [glList, setGlList] = useState([]);
  const [sharesList, setSharesList] = useState([]);
  const [savingsList, setSavingsList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetTransactionTypes')
      .then(response => setTranTypes(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetAccountTypes')
      .then(response => setAccTypes(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/Finance/GetGeneralLedgers')
      .then(response => setGlList(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/Finance/GetAccounts/S')
      .then(response => setSavingsList(response?.data))
      .catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/Finance/GetAccounts/C')
      .then(response => setSharesList(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  useEffect(() => {
    dispatch(fectchDailyTransactions());
  }, []);

  const modalBranchList = [{ id: '000', name: 'Head Office' }, { id: '001', name: 'Nansana' },
    { id: '002', name: 'Rugika' }, { id: '004', name: 'All Branches' }];

  return {
    tranTypes,
    accTypes,
    modalBranchList,
    glList,
    savingsList,
    sharesList,
  };
};

export default TransactionRequests;
