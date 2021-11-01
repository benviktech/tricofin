import React, { useEffect, useState } from 'react';
import { FixedAssetsSidebar } from '../../Sidebar/Sidebar';
import './index.css';
import TrCodesModal from '../Transactions/TrCodesModal';

const initialState = {
  productID: '',
  productName: '',
  accountPrefix: 'string',
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
};

const displayGLs = {
  controlAccountGL: { glName: '', glType: '' },
  accumDepGL: { glName: '', glType: '' },
  depExpenseGL: { glName: '', glType: '' },
  saleoffLossGL: { glName: '', glType: '' },
  saleoffProfitGL: { glName: '', glType: '' },
};

const FixedAssetsPrdt = () => {
  const [values, setValues] = useState(initialState);
  const [displyvalues, setDisplyValues] = useState(displayGLs);
  const [modal, setModal] = useState(false);
  const [cursorPosition, setCursorPosition] = useState('');
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
    });

    setDisplyValues({
      ...displyvalues,
      controlAccountGL: cursorPosition === 'control gl' ? product : displyvalues.controlAccountGL,
      accumDepGL: cursorPosition === 'Accum Drep' ? product : displyvalues.accumDepGL,
      depExpenseGL: cursorPosition === 'Dep Expense' ? product : displyvalues.depExpenseGL,
      saleoffLossGL: cursorPosition === 'Saleoff Loss' ? product : displyvalues.saleoffLossGL,
      saleoffProfitGL: cursorPosition === 'Saleoff Profit' ? product : displyvalues.saleoffProfitGL,

    });
    setModal(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleChecked = e => {
    const { name, checked } = e.target;
    setValues({
      ...values,
      [name]: checked,
    });
  };

  const submitData = () => console.log(values, 'vales');
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
                    name="productID"
                    value={values.productID}
                    onChange={handleChange}
                    onFocus={() => setCursorPosition('product id')}
                    type="text"
                  />
                </div>
                <div className="fixed-assets-product-info-section-first">
                  <div className="fixed-assets-product-info-section-label">Product Name:</div>
                  <input
                    name="productName"
                    value={values.productName}
                    onChange={handleChange}
                    type="text"
                  />
                </div>
                <div className="fixed-assets-product-info-section-first">
                  <div className="fixed-assets-product-info-section-label">Account Prefix:</div>
                  <input type="text" />
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
                    value={values.allowCredits}
                    style={{ height: '15px', width: '15px', marginLeft: '10px' }}
                    type="checkbox"
                  />
                </div>
                <div className="lower-fixed-assets-postin-options-section">
                  <div className="lower-fixed-assets-postin-options-section-label">Can Go In Credit:</div>
                  <input
                    name="canGoInCredit"
                    onChange={handleChecked}
                    value={values.canGoInCredit}
                    style={{ height: '15px', width: '15px', marginLeft: '10px' }}
                    type="checkbox"
                  />
                </div>
                <div className="lower-fixed-assets-postin-options-section">
                  <div className="lower-fixed-assets-postin-options-section-label">Allow Debits:</div>
                  <input
                    name="allowDebits"
                    onChange={handleChecked}
                    value={values.allowDebits}
                    style={{ height: '15px', width: '15px', marginLeft: '10px' }}
                    type="checkbox"
                  />
                </div>
                <div className="lower-fixed-assets-postin-options-section">
                  <div className="lower-fixed-assets-postin-options-section-label">Can Go In Debit:</div>
                  <input
                    name="canGoInDebit"
                    onChange={handleChecked}
                    value={values.canGoInDebit}
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
                  <input type="text" />
                  <div className="fixed-assets-product-info-section-lower-grid-first">First</div>
                  <div className="fixed-assets-product-info-section-lower-grid-second">12</div>
                </div>
              </div>
            </div>
            <div className="fixed-assets-product-info-section">
              <div className="fixed-assets-product-info-section-button">
                <button type="button">Supervise</button>
                <button type="button">Add</button>
                <button type="button">Edit</button>
                <button onClick={submitData} type="button">Save</button>
                <button type="button">Cancel</button>
                <button type="button">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default FixedAssetsPrdt;
