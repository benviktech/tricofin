import React from 'react';
import { FixedAssetsSidebar } from '../../Sidebar/Sidebar';
import './index.css';
import BehindScene from './BehindScene';

const MaintainFixedAsset = () => {
  console.log('Fied Assets');
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
                  <input type="text" />
                </div>
                <div className="fixed-assets-product-info-section-first">
                  <div className="fixed-assets-product-info-section-label">Account Prefix:</div>
                  <input type="text" />
                </div>
                <div className="fixed-assets-product-info-section-first">
                  <div className="fixed-assets-product-info-section-label">Product Name:</div>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="fixed-assets-product-info-section">
              <div className="fixed-assets-product-info-section-header">
                Fixed Assets Details
              </div>
              <div className="fixed-assets-details-info-section-content">
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Branch:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <input type="text" />
                    <div className="fixed-assets-details-info-section-input-inner">BENVIK</div>
                  </div>
                </div>
                <div className="fixed-assets-details-info-section-first-two">
                  <div className="fixed-assets-details-info-section-label">Supplier:</div>
                  <select>
                    <option value="VAL">VAL</option>
                    <option value="VAL">VAL</option>
                  </select>
                </div>
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Account ID:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <input type="text" />
                    <div className="fixed-assets-details-info-section-input-inner">BENVIK</div>
                  </div>
                </div>
                <div className="fixed-assets-details-info-section-first-two">
                  <div className="fixed-assets-details-info-section-label">Serial #:</div>
                  <input type="text" />
                </div>
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Brand Name:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <input type="text" />
                    <div className="fixed-assets-details-info-section-input-inner-two">
                      <div className="fixed-assets-details-info-section-input-inner-div">Tag Number:</div>
                      <input type="text" />
                    </div>
                  </div>
                </div>
                <div className="fixed-assets-details-info-section-first-two">
                  <div className="fixed-assets-details-info-section-label">Location:</div>
                  <input type="text" />
                </div>
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Depreciation Mthd:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <select>
                      <option value="VAL">VAL</option>
                      <option value="VAL">VAL</option>
                      <option value="VAL">VAL</option>
                    </select>
                    <div className="fixed-assets-details-info-section-input-inner-two">
                      <div className="fixed-assets-details-info-section-input-inner-div">Cost Price:</div>
                      <input type="text" />
                    </div>
                  </div>
                </div>
                <div className="fixed-assets-details-info-section-first-two">
                  <div className="fixed-assets-details-info-section-label">Residual Value:</div>
                  <input type="text" />
                </div>
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Dep Rate:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <div className="fixed-assets-details-info-section-input-container">
                      <input type="text" />
                      <div className="fixed-assets-details-info-section-input-container-label">% P.M</div>
                    </div>
                    <div className="fixed-assets-details-info-section-input-inner-two">
                      <div className="fixed-assets-details-info-section-input-inner-div">Useful Life / Terms:</div>
                      <div className="fixed-assets-details-info-section-input-container">
                        <input type="text" />
                        <div className="fixed-assets-details-info-section-input-container-label">Months</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fixed-assets-details-info-section-first-two">
                  <div className="fixed-assets-details-info-section-label">Purchased On:</div>
                  <input type="date" />
                </div>
                <div className="fixed-assets-details-info-section-first">
                  <div className="fixed-assets-details-info-section-label">Amount to Depreciate:</div>
                  <div className="fixed-assets-details-info-section-input">
                    <input type="text" />
                    <div className="fixed-assets-details-info-section-input-inner-two">
                      <div className="fixed-assets-details-info-section-input-inner-div">Depreciation Form:</div>
                      <input type="date" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <BehindScene />
          </div>
        </div>
      </div>
    </div>

  );
};

export default MaintainFixedAsset;
