import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { editTransactionCode, postTransactionCode } from '../../../actions/generalLedger';
import TrCodesModal from './TrCodesModal';
import transactionCodesValidator from '../../Validators/TransactionCodes';

const initialState = {
  tranCode: '',
  partTranType: '',
  narration: 'SAMPLE',
  isSystem: false,
  tranCat: '',
  tranType: '',
  attachTo: '',
  isAccessible: true,
  chargeType: '',
};

const TransactionCodes = () => {
  const [transactionCategories, setTransactionCategories] = useState([]);
  const [trxTypes, setTrxTypes] = useState([]);
  const [values, setValues] = useState(initialState);
  const [chargeTypes, setChargeTypes] = useState([]);
  const [transactionCodes, setTransactionCodes] = useState([]);
  const [modal, setModal] = useState(false);
  const [attachTo, setAttachTo] = useState([]);
  const [addState, setAddState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = e => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetTransactionTypes')
      .then(response => setTrxTypes(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetTransactionCategories')
      .then(response => setTransactionCategories(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetChargeTypes')
      .then(response => setChargeTypes(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetTransactionCodeCategory')
      .then(response => setTransactionCodes(response?.data))
      .catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetAttachTo')
      .then(response => setAttachTo(response?.data))
      .catch(error => console.log(error?.message));
  }, []);

  const saveTransactionCode = () => setErrors(transactionCodesValidator(values));

  useEffect(async () => {
    if (Object.keys(errors).length === 0) {
      if (addState) {
        await dispatch(postTransactionCode(values));
      }
      if (editState) {
        await dispatch(editTransactionCode(values));
      }
      setValues(initialState);
    }
  }, [errors]);

  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.code === 'F2') { setModal(true); }
    });
  });

  const setCurrentCode = data => { setValues({ ...data }); setModal(false); };

  const submitState = text => {
    if (text === 'Add') { setAddState(true); setEditState(false); }
    if (text === 'Edit') { setAddState(false); setEditState(true); }
  };

  console.log(errors, 'errors');

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info-lg">
          <span>Transaction Code Maintenance</span>
        </div>
        <div className="transaction-codes-main-section">
          { modal && <TrCodesModal currenTComp="Transaction Codes" setModal={setModal} setCurrentCode={setCurrentCode} />}
          <div className="transaction-codes-main-section-top">
            <div className="transaction-codes-main-section-left">
              <div className="transaction-codes-main-section-top-label">TranCode:</div>
              <input
                name="tranCode"
                value={values.tranCode}
                onChange={handleChange}
                type="text"
              />
              <div className="transaction-codes-main-section-div-section">{values.narration}</div>
            </div>
            <div className="transaction-codes-main-section-right">
              <div className="transaction-codes-main-section-right-label">IsSys:</div>
              <input
                style={{ height: '20px', width: '20px' }}
                name="isSystem"
                value={values.isSystem}
                onChange={handleChange}
                type="checkbox"
              />
            </div>
          </div>
          <div className="transaction-codes-main-section-middle">
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Trx Type:</div>
              <select
                name="partTranType"
                value={values.partTranType}
                onChange={handleChange}
              >
                <option value="" disabled selected hidden>Select</option>
                {
                  trxTypes.map(category => (
                    <option
                      key={category.tranType}
                      value={category.tranType}
                    >
                      {category.transactionType}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Tran Category:</div>
              <select
                name="tranCat"
                value={values.tranCat}
                onChange={handleChange}
              >
                <option value="" disabled selected hidden>Select</option>
                {
                  transactionCodes.map(category => (
                    <option
                      key={category.catID}
                      value={category.catID}
                    >
                      {category.category}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Tran Type:</div>
              <select
                name="tranType"
                value={values.tranType}
                onChange={handleChange}
              >
                <option value="" disabled selected hidden>Select</option>
                {
                      transactionCategories.map(category => (
                        <option
                          key={category.catID}
                          value={category.catID}
                        >
                          {category.category}
                        </option>
                      ))
                    }
              </select>
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Attach To:</div>
              <select
                name="attachTo"
                value={values.attachTo}
                onChange={handleChange}
              >

                <option value="" disabled selected hidden>Select</option>
                {
                      attachTo.map(category => (
                        <option
                          key={category.code}
                          value={category.code}
                        >
                          {category.description}
                        </option>
                      ))
                    }
              </select>
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Charge Type:</div>
              <select
                name="chargeType"
                value={values.chargeType}
                onChange={handleChange}
              >
                <option value="" disabled selected hidden>Select</option>
                {
                  chargeTypes.map(type => (
                    <option
                      key={type.code}
                      value={type.code}
                    >
                      {type.description}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="transaction-codes-main-section-bottom-behind-scenes">
            Behind the Scene
          </div>
          <div className="transaction-codes-main-section-middle transaction-codes-main-section-bottom">
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Trx Type:</div>
              <input type="text" />
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Tran Category:</div>
              <input type="text" />
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Tran Type:</div>
              <select>
                <option value="VAAL">VAL</option>
                <option value="VAAL">VAL</option>
                <option value="VAAL">VAL</option>
                <option value="VAAL">VAL</option>
              </select>
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Attach To:</div>
              <select>
                <option value="VAAL">VAL</option>
                <option value="VAAL">VAL</option>
                <option value="VAAL">VAL</option>
                <option value="VAAL">VAL</option>
              </select>
            </div>
          </div>
          <div className="transaction-codes-main-section-buttons">
            <button onClick={() => submitState('Add')} type="button">Add</button>
            <button onClick={() => submitState('Edit')} type="button">Edit</button>
            <button
              disabled={!addState && !editState}
              onClick={saveTransactionCode}
              className={(!addState && !editState) ? 'bg-info' : ''}
              type="button"
            >
              Save
            </button>
            <button type="button">Cancel</button>
            <button type="button">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCodes;
