/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FixedAssetsSidebar } from '../../Sidebar/Sidebar';
import './index.css';
import TrCodesModal from '../Transactions/TrCodesModal';
import {
  deleteFixedAssetsPrdt,
  saveFixedAssetsPrdt, updateFixedAssetsPrdt,
} from '../../../actions/generalLedger';
import fixedAssetsPrdtValidator from '../../Validators/FixedAssetsPrdtValidator';

const initialState = {
  productID: '',
  productName: '',
  accountPrefix: '',
  allowCredits: false,
  canGoInCredit: false,
  allowDebits: false,
  canGoInDebit: false,
  controlAccountGL: '',
  accumDepGL: '',
  depExpenseGL: '',
  saleoffLossGL: '',
  saleoffProfitGL: '',
  isDeleted: false,
  setID: '',
};

const displayGLs = {
  controlAccountGL: { glName: '', glType: '' },
  accumDepGL: { glName: '', glType: '' },
  depExpenseGL: { glName: '', glType: '' },
  saleoffLossGL: { glName: '', glType: '' },
  saleoffProfitGL: { glName: '', glType: '' },
  setID: { setID: '', setName: '' },
};

const FixedAssetsPrdt = () => {
  const [values, setValues] = useState(initialState);
  const [displyvalues, setDisplyValues] = useState(displayGLs);
  const [modal, setModal] = useState(false);
  const [cursorPosition, setCursorPosition] = useState('');
  const [errors, setErrors] = useState({});
  const [addState, setAddState] = useState(false);
  const [editState, setEditState] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.code === 'F4') { setModal(true); }
    });
  });

  const setCurrentCode = (product, cursorPosition) => {
    setValues({
      ...values,
      controlAccountGL: cursorPosition === 'control gl' ? product.glid : values.controlAccountGL,
      accumDepGL: cursorPosition === 'Accum Drep' ? product.glid : values.accumDepGL,
      depExpenseGL: cursorPosition === 'Dep Expense' ? product.glid : values.depExpenseGL,
      saleoffLossGL: cursorPosition === 'Saleoff Loss' ? product.glid : values.saleoffLossGL,
      saleoffProfitGL: cursorPosition === 'Saleoff Profit' ? product.glid : values.saleoffProfitGL,
      setID: cursorPosition === 'Set ID' ? product.setID : values.setID,
    });

    setDisplyValues({
      ...displyvalues,
      controlAccountGL: cursorPosition === 'control gl' ? product : displyvalues.controlAccountGL,
      accumDepGL: cursorPosition === 'Accum Drep' ? product : displyvalues.accumDepGL,
      depExpenseGL: cursorPosition === 'Dep Expense' ? product : displyvalues.depExpenseGL,
      saleoffLossGL: cursorPosition === 'Saleoff Loss' ? product : displyvalues.saleoffLossGL,
      saleoffProfitGL: cursorPosition === 'Saleoff Profit' ? product : displyvalues.saleoffProfitGL,
      setID: cursorPosition === 'Set ID' ? product : displyvalues.setID,
    });
    if (cursorPosition === 'product id') {
      setValues({ ...product }); setAddState(false); setEditState(true);
    }
    setModal(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleChecked = e => {
    const { name, checked } = e.target;
    setValues({ ...values, [name]: checked });
  };

  const submitData = () => setErrors(fixedAssetsPrdtValidator(values, 'save'));
  const setAddStateFnc = () => { setAddState(true); setEditState(false); };
  const setEditStateFnc = () => { setAddState(false); setEditState(true); };
  const deleteProduct = () => {
    dispatch(deleteFixedAssetsPrdt(values.productID)); setValues(initialState);
  };
  const cancelSubmit = () => {
    setErrors({}); setAddState(true); setEditState(false); setValues(initialState);
  };

  useEffect(async () => {
    if (Object.keys(errors).length === 1) {
      if (Object.keys(errors).includes('state')) {
        if (addState) { await dispatch(saveFixedAssetsPrdt(values)); }
        if (editState) { await dispatch(updateFixedAssetsPrdt(values)); }
        setValues(initialState); setDisplyValues(displayGLs);
      }
    }
  }, [errors]);
  const routeBack = () => history.goBack();

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
                onClick={routeBack}
              />
            </div>
            <FixedAssetsSidebar />
          </div>
          <div className="submit-form-top-section">
            <div className="fixed-assets-product-info-section">
              <div className="fixed-assets-product-info-section-header">
                Product Info
              </div>
              <div className="fixed-assets-product-info-section-content mb-2">
                <div className="fixed-assets-product-info-section-first">
                  <div className="fixed-assets-product-info-section-label">Product ID:</div>
                  <input
                    name="productID"
                    value={values.productID}
                    onChange={handleChange}
                    onFocus={() => setCursorPosition('product id')}
                    type="text"
                  />
                  {errors.productID && <span className="error-span">{ errors.productID }</span>}
                </div>
                <div className="fixed-assets-product-info-section-first">
                  <div className="fixed-assets-product-info-section-label">Product Name:</div>
                  <input
                    name="productName"
                    value={values.productName}
                    onChange={handleChange}
                    type="text"
                  />
                  { errors.productName && <span className="error-span">{ errors.productName }</span>}
                </div>
                <div className="fixed-assets-product-info-section-first">
                  <div className="fixed-assets-product-info-section-label">Account Prefix:</div>
                  <input value={values.accountPrefix} disabled="true" type="text" />
                </div>
              </div>
              { modal
              && (
              <TrCodesModal
                currenTComp="Fixed Assets Products"
                setModal={setModal}
                setCurrentCode={setCurrentCode}
                cursorPosition={cursorPosition}
              />
              )}
            </div>
            <div className="fixed-assets-product-info-section ">
              <div className="fixed-assets-product-info-section-header">
                Posting Options
              </div>
              <div className="lower-fixed-assets-postin-options-section-grid">
                <div className="lower-fixed-assets-postin-options-section">
                  <div className="lower-fixed-assets-postin-options-section-label">Allow Credits:</div>
                  <input
                    name="allowCredits"
                    onChange={handleChecked}
                    checked={values.allowCredits}
                    style={{ height: '15px', width: '15px', marginLeft: '10px' }}
                    type="checkbox"
                  />
                </div>
                <div className="lower-fixed-assets-postin-options-section">
                  <div className="lower-fixed-assets-postin-options-section-label">Can Go In Credit:</div>
                  <input
                    name="canGoInCredit"
                    onChange={handleChecked}
                    checked={values.canGoInCredit}
                    style={{ height: '15px', width: '15px', marginLeft: '10px' }}
                    type="checkbox"
                  />
                </div>
                <div className="lower-fixed-assets-postin-options-section">
                  <div className="lower-fixed-assets-postin-options-section-label">Allow Debits:</div>
                  <input
                    name="allowDebits"
                    onChange={handleChecked}
                    checked={values.allowDebits}
                    style={{ height: '15px', width: '15px', marginLeft: '10px' }}
                    type="checkbox"
                  />
                </div>
                <div className="lower-fixed-assets-postin-options-section">
                  <div className="lower-fixed-assets-postin-options-section-label">Can Go In Debit:</div>
                  <input
                    name="canGoInDebit"
                    onChange={handleChecked}
                    checked={values.canGoInDebit}
                    style={{ height: '15px', width: '15px', marginLeft: '10px' }}
                    type="checkbox"
                  />
                </div>
              </div>
            </div>
            <div className="fixed-assets-product-info-section ">
              <div className="fixed-assets-product-info-section-header">
                Product Control and Depreciation GLs:
              </div>
              <div className="fixed-assets-product-info-section-lower-grid">
                <div className="fixed-assets-product-info-section-lower-grid-inner">
                  <div className="fixed-assets-product-info-section-lower-grid-label">Control GL:</div>
                  <input
                    name="controlAccountGL"
                    value={values.controlAccountGL}
                    onChange={handleChange}
                    onFocus={() => setCursorPosition('control gl')}
                    type="text"
                  />
                  <div className="fixed-assets-product-info-section-lower-grid-first">
                    {displyvalues.controlAccountGL.glName}
                  </div>
                  <div className="fixed-assets-product-info-section-lower-grid-second">
                    {displyvalues.controlAccountGL.glType}
                  </div>
                  { errors.controlAccountGL && <span className="error-span">{ errors.controlAccountGL}</span>}
                </div>
                <div className="fixed-assets-product-info-section-lower-grid-inner">
                  <div className="fixed-assets-product-info-section-lower-grid-label">Accum Drep GL:</div>
                  <input
                    name="accumDepGL"
                    value={values.accumDepGL}
                    onChange={handleChange}
                    onFocus={() => setCursorPosition('Accum Drep')}
                    type="text"
                  />
                  <div className="fixed-assets-product-info-section-lower-grid-first">
                    {displyvalues.accumDepGL.glName}
                  </div>
                  <div className="fixed-assets-product-info-section-lower-grid-second">
                    {displyvalues.accumDepGL.glType}
                  </div>
                  { errors.accumDepGL && <span className="error-span">{errors.accumDepGL}</span>}
                </div>
                <div className="fixed-assets-product-info-section-lower-grid-inner">
                  <div className="fixed-assets-product-info-section-lower-grid-label">Dep Expense GL:</div>
                  <input
                    name="depExpenseGL"
                    value={values.depExpenseGL}
                    onChange={handleChange}
                    onFocus={() => setCursorPosition('Dep Expense')}
                    type="text"
                  />
                  <div className="fixed-assets-product-info-section-lower-grid-first">
                    {displyvalues.depExpenseGL.glName}
                  </div>
                  <div className="fixed-assets-product-info-section-lower-grid-second">
                    {displyvalues.depExpenseGL.glType}
                  </div>
                  {errors.depExpenseGL && <span className="error-span">{ errors.depExpenseGL }</span>}
                </div>
              </div>
            </div>
            <div className="fixed-assets-product-info-section ">
              <div className="fixed-assets-product-info-section-header">
                Disposal / Sale off GLs:
              </div>
              <div className="fixed-assets-product-info-section-lower-grid">
                <div className="fixed-assets-product-info-section-lower-grid-inner">
                  <div className="fixed-assets-product-info-section-lower-grid-label">Saleoff Loss GL:</div>
                  <input
                    name="saleoffLossGL"
                    value={values.saleoffLossGL}
                    onChange={handleChange}
                    onFocus={() => setCursorPosition('Saleoff Loss')}
                    type="text"
                  />
                  <div className="fixed-assets-product-info-section-lower-grid-first">
                    {displyvalues.saleoffLossGL.glName}
                  </div>
                  <div className="fixed-assets-product-info-section-lower-grid-second">
                    {displyvalues.saleoffLossGL.glType}
                  </div>
                  { errors.saleoffLossGL && <span className="error-span">{ errors.saleoffLossGL }</span>}
                </div>
                <div className="fixed-assets-product-info-section-lower-grid-inner">
                  <div className="fixed-assets-product-info-section-lower-grid-label">Saleoff Profit GL:</div>
                  <input
                    name="saleoffProfitGL"
                    value={values.saleoffProfitGL}
                    onChange={handleChange}
                    onFocus={() => setCursorPosition('Saleoff Profit')}
                    type="text"
                  />
                  <div className="fixed-assets-product-info-section-lower-grid-first">
                    {displyvalues.saleoffProfitGL.glName}
                  </div>
                  <div className="fixed-assets-product-info-section-lower-grid-second">
                    {displyvalues.saleoffProfitGL.glType}
                  </div>
                  {errors.saleoffProfitGL && <span className="error-span">{ errors.saleoffProfitGL }</span>}
                </div>
              </div>
            </div>
            <div className="fixed-assets-product-info-section ">
              <div className="fixed-assets-product-info-section-header">
                Product Applies To:
              </div>
              <div className="fixed-assets-product-info-section-lower-grid">
                <div className="fixed-assets-product-info-section-lower-grid-inner">
                  <div className="fixed-assets-product-info-section-lower-grid-label">Set ID:</div>
                  <input
                    name="setID"
                    value={values.setID}
                    onChange={handleChange}
                    onFocus={() => setCursorPosition('Set ID')}
                    type="text"
                  />
                  <div className="fixed-assets-product-info-section-lower-grid-first">
                    {displyvalues.setID.setName}
                  </div>
                  <div className="fixed-assets-product-info-section-lower-grid-second">...</div>
                  { errors.setID && <span className="error-span">{ errors.setID }</span>}
                </div>
              </div>
            </div>
            <div className="fixed-assets-product-info-section">
              <div className="fixed-assets-product-info-section-button">
                <button type="button">Supervise</button>
                <button
                  className={editState === true ? 'btn btn-info' : ''}
                  disabled={editState === true}
                  onClick={setAddStateFnc}
                  type="button"
                >
                  Add
                </button>
                <button
                  className={editState === false ? 'btn btn-info' : ''}
                  disabled={editState === false}
                  onClick={setEditStateFnc}
                  type="button"
                >
                  Edit
                </button>
                <button
                  disabled={addState === false && editState === false}
                  className={addState === false && editState === false ? 'btn btn-info' : ''}
                  onClick={submitData}
                  type="button"
                >
                  Save
                </button>
                <button onClick={cancelSubmit} type="button">Cancel</button>
                <button
                  className={editState === false ? 'btn btn-info' : ''}
                  onClick={deleteProduct}
                  disabled={editState === false}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedAssetsPrdt;
