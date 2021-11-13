/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { editTransactionCode, postTransactionCode } from '../../../actions/generalLedger';
import TrCodesModal from './TrCodesModal';
import transactionCodesValidator from '../../Validators/TransactionCodes';

const initialState = {
  tranCode: '',
  partTranType: '',
  narration: '',
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
  const [addState, setAddState] = useState(true);
  const [editState, setEditState] = useState(false);
  const [saveState, setSaveState] = useState(false);
  const [cancelState, setCancelState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [inputState, setInputState] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = e => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
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
      if (addState) { await dispatch(postTransactionCode(values)); }
      if (editState) { await dispatch(editTransactionCode(values)); }
      setValues(initialState);
    }
  }, [errors]);

  useEffect(() => {
    document.addEventListener('keydown', e => { if (e.code === 'F2') { setModal(true); } });
  });

  const setCurrentCode = data => {
    setValues({ ...data }); setModal(false); setEditState(true);
  };

  const submitState = text => {
    if (text === 'Add') {
      setAddState(false); setSaveState(true); setInputState(true);
      setCancelState(true); setEditState(false); setValues(initialState);
    }
    if (text === 'Edit') { setEditState(true); setErrorModal(true); }
  };

  const cancelTransactionCode = () => {
    setCancelState(false); setDeleteState(false); setSaveState(false);
    setAddState(true); setValues(initialState);
  };

  console.log(values, 'values');

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info-lg">
          <span>Transaction Code Maintenance</span>
        </div>
        <div className="transaction-codes-main-section">
          {
            values.isSystem && errorModal ? (
              <div className="edit-error-modal">
                <div className="edit-error-modal-inner">
                  <i onClick={() => setErrorModal(false)} className="far fa-times-circle" />
                  <div className="edit-error-modal-inner-header">Edit Denied</div>
                  <div className="edit-error-modal-inner-span">This is a System Tran Code, You Cannot Edit it</div>
                  <div className="edit-error-modal-inner-button">
                    <button onClick={() => setErrorModal(false)} className="m-1" type="button">OK</button>
                  </div>
                </div>
              </div>
            ) : null
          }
          { modal && <TrCodesModal currenTComp="Transaction Codes" setModal={setModal} setCurrentCode={setCurrentCode} />}
          <div className="transaction-codes-main-section-top">
            <div className="transaction-codes-main-section-left">
              <div className="transaction-codes-main-section-top-label">TranCode:</div>
              <input name="tranCode" value={values.tranCode} onChange={handleChange} type="text" />
              <div className="transaction-codes-main-section-div-section">{values.narration}</div>
            </div>
            <div className="transaction-codes-main-section-right">
              <div className="transaction-codes-main-section-right-label">IsSys:</div>
              <input
                style={{ height: '20px', width: '20px' }}
                name="isSystem"
                checked={values.isSystem}
                disabled={editState === true}
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
                disabled={(values.isSystem && editState) || inputState === false ? true : null}
              >
                <option value="" disabled selected hidden>Select</option>
                {trxTypes.map(category => (
                  <option key={category.tranType} value={category.tranType}>
                    {category.transactionType}
                  </option>
                ))}
              </select>
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Tran Category:</div>
              <select
                name="tranCat"
                value={values.tranCat}
                disabled={(values.isSystem && editState) || inputState === false ? true : null}
                onChange={handleChange}
              >
                <option value="" disabled selected hidden>Select</option>
                {transactionCodes.map(category => (
                  <option key={category.catID} value={category.catID}>{category.category}</option>
                ))}
              </select>
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Tran Type:</div>
              <select
                name="tranType"
                value={values.tranType}
                disabled={(values.isSystem && editState) || inputState === false ? true : null}
                onChange={handleChange}
              >
                <option value="" disabled selected hidden>Select</option>
                {transactionCategories.map(category => (
                  <option key={category.catID} value={category.catID}>{category.category}</option>
                ))}
              </select>
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Attach To:</div>
              <select
                name="attachTo"
                value={values.attachTo}
                disabled={(values.isSystem && editState) || inputState === false ? true : null}
                onChange={handleChange}
              >

                <option value="" disabled selected hidden>Select</option>
                {attachTo.map(category => (
                  <option key={category.code} value={category.code}>{category.description}</option>
                ))}
              </select>
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Charge Type:</div>
              <select
                name="chargeType"
                value={values.chargeType}
                disabled={(values.isSystem && editState) || inputState === false ? true : null}
                onChange={handleChange}
              >
                <option value="" disabled selected hidden>Select</option>
                {chargeTypes.map(type => (
                  <option key={type.code} value={type.code}>{type.description}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="transaction-codes-main-section-bottom-behind-scenes">
            Behind the Scene
          </div>
          <div className="transaction-codes-main-section-middle transaction-codes-main-section-bottom">
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Created By:</div>
              <input value={values.createdBy ? values.createdBy : ''} disabled="true" type="text" />
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Last Modified By:</div>
              <input value={values.modifiedBy ? values.modifiedBy : ''} disabled="true" type="text" />
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Created On:</div>
              <input
                value={
                  values.createdOn ? new Date(values.createdOn).toISOString().substring(0, 10) : ''
                }
                disabled="true"
                type="text"
              />
            </div>
            <div className="transaction-codes-main-section-middle-inner">
              <div className="transaction-codes-main-section-middle-label">Last Modified On:</div>
              <input
                value={
                  values.modifiedOn ? new Date(values.modifiedOn).toISOString().substring(0, 10) : ''
                }
                disabled="true"
                type="text"
              />
            </div>
          </div>
          <div className="transaction-codes-main-section-buttons">
            <button
              className={addState === false ? 'btn btn-info' : ''}
              disabled={addState === false}
              onClick={() => submitState('Add')}
              type="button"
            >
              Add
            </button>
            <button
              className={editState === false ? 'btn btn-info' : ''}
              disabled={editState === false}
              onClick={() => submitState('Edit')}
              type="button"
            >
              Edit
            </button>
            <button
              disabled={saveState === false}
              className={saveState === false ? 'btn btn-info' : ''}
              onClick={saveTransactionCode}
              type="button"
            >
              Save
            </button>
            <button
              disabled={cancelState === false}
              className={cancelState === false ? 'btn btn-info' : ''}
              onClick={cancelTransactionCode}
              type="button"
            >
              Cancel
            </button>
            <button
              disabled={deleteState === false}
              className={deleteState === false ? 'btn btn-info' : ''}
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCodes;
