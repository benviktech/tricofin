import React from 'react';
import { FixedAssetsSidebar } from '../../Sidebar/Sidebar';

const BookAssets = () => (
  <div className="individual-customer-form">
    <div className="lower-form-section">
      <div className="maintenance-customer-info">
        <span>Book Fixed Assets</span>
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
          <div className="book-fixed-asset-container">
            <div className="book-fixed-asset-container-header">
              Fixed Asset Tran Details
            </div>
            <div className="book-fixed-asset-container-header-grid mt-2">
              <div className="book-fixed-asset-container-header-inner-grid">
                <div className="book-fixed-asset-container-header-inner-grid-label">
                  Debit/Credit:
                </div>
                <input type="text" />
              </div>
              <div className="book-fixed-asset-container-header-inner-grid">
                <div className="book-fixed-asset-container-header-inner-grid-label">
                  TranID:
                </div>
                <input type="text" />
              </div>
              <div className="book-fixed-asset-container-header-inner-grid-lower">
                <div className="book-fixed-asset-container-header-inner-grid-label">
                  AccountID:
                </div>
                <div className="book-fixed-asset-container-header-inner-grid-right">
                  <input type="text" />
                  <div className="book-fixed-asset-container-header-inner-grid-right-inner">0</div>
                </div>
              </div>
              <div className="book-fixed-asset-container-header-inner-grid">
                <div className="book-fixed-asset-container-header-inner-grid-label">
                  Amount:
                </div>
                <input type="text" />
              </div>
              <div className="book-fixed-asset-container-header-inner-grid-lower">
                <div className="book-fixed-asset-container-header-inner-grid-label">
                  Branch:
                </div>
                <div className="book-fixed-asset-container-header-inner-grid-right">
                  <input type="text" />
                  <div className="book-fixed-asset-container-header-inner-grid-right-inner">0</div>
                </div>
              </div>
            </div>
            <div className="book-assets-container-grid-section">
              <div className="book-assets-container-grid-section-header">
                <div className="book-assets-container-grid-section-header-grid">SerialNo</div>
                <div className="book-assets-container-grid-section-header-grid">BranchID</div>
                <div className="book-assets-container-grid-section-header-grid">BranchName</div>
                <div className="book-assets-container-grid-section-header-grid">AcciID</div>
                <div className="book-assets-container-grid-section-header-grid">AcctType</div>
                <div className="book-assets-container-grid-section-header-grid">AccountName</div>
                <div className="book-assets-container-grid-section-header-grid">ProdtID</div>
                <div className="book-assets-container-grid-section-header-grid">TranCode</div>
                <div className="book-assets-container-grid-section-header-grid">TrxType</div>
                <div className="book-assets-container-grid-section-header-grid">TranAmount</div>
                <div className="book-assets-container-grid-section-header-grid">TranParticulars</div>
                <div className="book-assets-container-grid-section-header-grid">TranRemarks</div>
              </div>
              <div className="book-assets-container-grid-section-content">
                <div className="book-assets-container-grid-section-header">
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                </div>
                <div className="book-assets-container-grid-section-header">
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                  <div className="book-assets-container-grid-section-header-grid">ProdtId</div>
                </div>
              </div>
            </div>
            <div className="book-assets-container-grid-section-button">
              <button type="button">Post</button>
              <button type="button">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

);

export default BookAssets;
