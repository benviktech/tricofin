/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { FixedAssetsSidebar } from '../../Sidebar/Sidebar';
import './index.css';
import BehindScene from './BehindScene';
import TrCodesModal from '../Transactions/TrCodesModal';
import {
  deleteFixedAssets,
  fetchFixedAssetList, postMaintainFixedAsst,
} from '../../../actions/generalLedger';
import Modal from '../Transactions/Modal';
import TransactionRequests from '../Transactions/TransactionRequests';

const initialState = {
  accountID: '',
  supplierID: '',
  serialNo: '',
  tagNo: '',
  brandName: '',
  location: '',
  depMthd: '',
  depRate: 0,
  costPrice: 0,
  terms: 0,
  residualValue: 0,
  depAmount: 0,
  disposalValue: 0,
  profitLoss: 0,
  netBookValue: 0,
  isBooked: false,
  tranID: 0,
  isDeleted: false,
  depFrom: '',
  purchasedOn: '',
  branchID: '',
};

const MaintainFixedAsset = () => {
  const [values, setValues] = useState(initialState);
  const [depMethods, setDepMethods] = useState([]);
  const [modal, setModal] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [cursorPosition, setCursorPosition] = useState('');
  const [product, setProduct] = useState({});
  const [fixedAssetType, setFixedAssetType] = useState(false);
  const [asstInnerModalList, setAsstInnerModalList] = useState([]);
  const [branch, setBranch] = useState({});
  const dispatch = useDispatch();
  const [savingModalBranch, setSavingModalBranch] = useState('');
  const [addState, setAddState] = useState(false);
  const [editState, setEditState] = useState(false);

  useEffect(() => { dispatch(fetchFixedAssetList()); }, []);

  const fixedAssetsList = useSelector(
    state => state.generalLedgerReducer.fixedAssetList,
  );

  useEffect(() => {
    if (savingModalBranch.length > 0 && savingModalBranch !== '004') {
      const newModalList = (fixedAssetType ? fixedAssetsList : null).filter(
        account => account.branchID === savingModalBranch,
      );
      if (fixedAssetType) { setAsstInnerModalList(newModalList); }
    }
  }, [savingModalBranch]);

  const { modalBranchList } = TransactionRequests();
  const setAddStateFnc = () => { setAddState(true); setEditState(false); };
  const setEditStateFnc = () => { setAddState(false); setEditState(true); };

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetSystemDepreciationMethods')
      .then(response => setDepMethods(response?.data))
      .catch(error => error.message);
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetSuppliers')
      .then(response => setSuppliers(response?.data))
      .catch(error => error.message);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (parseInt(values.terms, 10) > 0) {
      const result = (100 / parseInt(values.terms, 10)).toFixed(2);
      setValues({ ...values, depRate: result });
    } else { setValues({ ...values, depRate: 0 }); }
  }, [values.terms]);

  useEffect(() => {
    if (!isNaN(values.costPrice) && !isNaN(values.residualValue)) {
      const result = (values.costPrice - values.residualValue).toFixed(2);
      setValues({ ...values, depAmount: result });
    }
  }, [values.costPrice, values.residualValue]);

  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.code === 'F4') { setModal(true); }
    });
  });

  const setCurrentCode = (product, cursorPosition) => {
    if (cursorPosition === 'product id') { setProduct(product); }
    if (cursorPosition === 'branch id') {
      setBranch(product); setValues({ ...values, branchID: product.setID });
    }
    setModal(false);
  };

  const saveFixedAsset = async () => {
    await dispatch(postMaintainFixedAsst(values, product.productID, addState, editState));
    setValues(initialState); setEditState(false); setAddState(false);
  };
  const displayCurrent = data => { setValues(data); setModal(false); setEditStateFnc(); };

  useEffect(() => {
    if (cursorPosition === 'Account id') { setFixedAssetType(true); }
    return () => { setFixedAssetType(false); };
  }, [cursorPosition]);

  const cancelSubmit = () => {
    setAddState(true); setEditState(false); setValues(initialState);
  };

  const deleteFixedAsset = () => {
    dispatch(deleteFixedAssets(values.accountID));
    setValues(initialState);
  };

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Fixed Assets Maintenance</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <div className="back-button-section">
              <i
                className="fas fa-arrow-circle-left"
                style={{ fontSize: '20px', marginRight: '10px', cursor: 'pointer' }}
              />
            </div>
            <FixedAssetsSidebar />
          </div>
          <div className="submit-form-top-section">
            <div className="fixed-assets-product-info-section">
              <div className="fixed-assets-product-info-section-header">
                Product Info
              </div>
              <div className="fixed-assets-product-info-section-content">
                <div className="fixed-assets-product-info-section-first">
                  <div className="fixed-assets-product-info-section-label">Product ID:</div>
                  <input
                    value={product.productID}
                    onFocus={() => setCursorPosition('product id')}
                    type="text"
                  />
                </div>
                <div className="fixed-assets-product-info-section-first">
                  <div className="fixed-assets-product-info-section-label">Account Prefix:</div>
                  <input disabled="true" value={product.accountPrefix} type="text" />
                </div>
                <div className="fixed-assets-product-info-section-first">
                  <div className="fixed-assets-product-info-section-label">Product Name:</div>
                  <input value={product.productName} disabled="true" type="text" />
                </div>
              </div>
              { modal && cursorPosition === 'Account id' && fixedAssetType ? (
                <Modal
                  modalBranchList={modalBranchList}
                  hideModal={() => setModal(false)}
                  fixedAssetType={fixedAssetType}
                  setSavingModalBranch={setSavingModalBranch}
                  asstInnerModalList={asstInnerModalList}
                  displayCurrent={displayCurrent}
                />
              ) : modal && cursorPosition !== 'Account id' ? (
                <TrCodesModal
                  currenTComp="Fixed Assets Products"
                  setModal={setModal}
                  setCurrentCode={setCurrentCode}
                  cursorPosition={cursorPosition}
                />
              ) : null}
            </div>
            <div className="fixed-assets-product-info-section">
              <div className="fixed-assets-product-info-section-header">Fixed Assets Details</div>
              <div className="fixed-assets-details-info-section-content">
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Branch:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <input
                      onFocus={() => setCursorPosition('branch id')}
                      value={values.branchID && values.branchID}
                      type="text"
                    />
                    <div className="fixed-assets-details-info-section-input-inner">
                      { branch.setName && branch.setName }
                    </div>
                  </div>
                </div>
                <div className="fixed-assets-details-info-section-first-two">
                  <div className="fixed-assets-details-info-section-label">Supplier:</div>
                  { suppliers.length > 0 ? (
                    <select name="supplierID" value={values.supplierID} onChange={handleChange}>
                      <option value="" disabled selected hidden>Select</option>
                      { suppliers.map(data => (
                        <option key={data.supplierID} value={data.supplierID}>
                          {data.supplier}
                        </option>
                      ))}
                    </select>
                  ) : (<select><option value="" disabled selected hidden>Select</option></select>)}
                </div>
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Account ID:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <input
                      onFocus={() => setCursorPosition('Account id')}
                      onChange={handleChange}
                      value={values.accountID}
                      name="accountID"
                      type="text"
                    />
                    <div className="fixed-assets-details-info-section-input-inner">BENVIK</div>
                  </div>
                </div>
                <div className="fixed-assets-details-info-section-first-two">
                  <div className="fixed-assets-details-info-section-label">Serial #:</div>
                  <input value={values.serialNo} name="serialNo" onChange={handleChange} type="text" />
                </div>
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Brand Name:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <input value={values.brandName} name="brandName" onChange={handleChange} type="text" />
                    <div className="fixed-assets-details-info-section-input-inner-two">
                      <div className="fixed-assets-details-info-section-input-inner-div">Tag Number:</div>
                      <input value={values.tagNo} name="tagNo" onChange={handleChange} type="text" />
                    </div>
                  </div>
                </div>
                <div className="fixed-assets-details-info-section-first-two">
                  <div className="fixed-assets-details-info-section-label">Location:</div>
                  <input value={values.location} name="location" onChange={handleChange} type="text" />
                </div>
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Cost Price:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <input value={values.costPrice} name="costPrice" onChange={handleChange} type="text" />
                    <div className="fixed-assets-details-info-section-input-inner-two">
                      <div className="fixed-assets-details-info-section-input-inner-div">Dep Rate:</div>
                      <div className="fixed-assets-details-info-section-input-container">
                        <input value={values.depRate} name="depRate" disabled="true" type="text" />
                        <div className="fixed-assets-details-info-section-input-container-label">% P.M</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fixed-assets-details-info-section-first-two">
                  <div className="fixed-assets-details-info-section-label">Depreciation Mthd:</div>
                  { depMethods.length > 0 ? (
                    <select name="depMthd" value={values.depMthd} onChange={handleChange}>
                      <option value="" disabled selected hidden>Select</option>
                      { depMethods.map(data => (
                        <option key={data.depMthdID} value={data.depMthdID}>
                          {data.depMthd}
                        </option>
                      ))}
                    </select>
                  ) : (<select><option value="" disabled selected hidden>Select</option></select>)}
                </div>
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Residual Value:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <input autoComplete="off" name="residualValue" onChange={handleChange} value={values.residualValue} type="text" />
                    <div className="fixed-assets-details-info-section-input-inner-two">
                      <div className="fixed-assets-details-info-section-input-inner-div">Useful Life / Terms:</div>
                      <div className="fixed-assets-details-info-section-input-container">
                        <input value={values.terms} name="terms" onChange={handleChange} type="text" />
                        <div className="fixed-assets-details-info-section-input-container-label">Months</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fixed-assets-details-info-section-first-two">
                  <div className="fixed-assets-details-info-section-label">Purchased On:</div>
                  <input
                    onChange={handleChange}
                    value={values.purchasedOn
                    && new Date(values.purchasedOn).toISOString().substring(0, 10)}
                    name="purchasedOn"
                    type="date"
                  />
                </div>
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Amount to Depreciate:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <input value={values.depAmount} name="depAmount" onChange={handleChange} type="text" />
                    <div className="fixed-assets-details-info-section-input-inner-two">
                      <div className="fixed-assets-details-info-section-input-inner-div">Depreciation From:</div>
                      <input
                        onChange={handleChange}
                        value={values.depFrom
                          && new Date(values.depFrom).toISOString().substring(0, 10)}
                        name="depFrom"
                        type="date"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <BehindScene
              addState={addState}
              editState={editState}
              saveFixedAsset={saveFixedAsset}
              setAddStateFnc={setAddStateFnc}
              setEditStateFnc={setEditStateFnc}
              cancelSubmit={cancelSubmit}
              deleteFixedAsset={deleteFixedAsset}
            />
          </div>
        </div>
      </div>
    </div>

  );
};

export default MaintainFixedAsset;
