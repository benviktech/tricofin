/* eslint-disable  react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */

import React from 'react';

const Modal = ({
  hideModal, savingsAcType, sharesAcType, filterListTwo,
  savingModalBranch, setSavingModalBranch, modalBranchList,
  gLAcType, filterGlList, modalBranch, setModalBranch,
  sVInnerModalList, setSelectedAccount, sHInnerModalList,
  innerModalList, fixedAssetType, asstInnerModalList,
  displayCurrent,
}) => (
  <div className="search-criteria-section shadow">
    <div className="search-criteria-section-header">
      Search Criteria Section
      <i
        className="far fa-times-circle"
        onClick={hideModal}
      />
    </div>
    {
          savingsAcType || sharesAcType || fixedAssetType ? (

            <div className="search-criteria-section-first">
              <div className="search-criteria-section-title">Account ID:</div>
              <div className="search-criteria-section-left">
                <input
                  onChange={
                  savingsAcType
                    ? e => filterListTwo(e.target.value, 'savings', 'accountId')
                    : fixedAssetType ? null
                      : e => filterListTwo(e.target.value, 'shares', 'accountId')
                }
                  type="text"
                />
                <div className="search-criteria-section-title">Client ID:</div>
                <input type="text" />
              </div>
            </div>
          ) : null
        }

    {
          savingsAcType || sharesAcType || fixedAssetType ? (
            <div className="search-criteria-section-first">
              <div className="search-criteria-section-title">Product ID:</div>
              <div className="search-criteria-section-left">
                <input type="text" />
                <div className="search-criteria-section-title">Branch:</div>
                <select
                  name="savingModalBranch"
                  value={savingModalBranch}
                  onChange={e => setSavingModalBranch(e.target.value)}
                >
                  <option value="" disabled selected hidden>Select</option>
                  {
                    modalBranchList.map(branch => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>
          ) : null
        }

    {
          gLAcType ? (
            <div className="search-criteria-section-first">
              <div className="search-criteria-section-title">Account ID:</div>
              <div className="search-criteria-section-left">
                <input onChange={e => filterGlList(e.target.value, 'accountId')} type="text" />
                <div className="search-criteria-section-title">Branch:</div>
                <select
                  name="modalBranch"
                  value={modalBranch}
                  onChange={e => setModalBranch(e.target.value)}
                >
                  <option value="" disabled selected hidden>Select</option>
                  {
                    modalBranchList.map(branch => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>
          ) : null
        }

    <div className="search-criteria-section-first">
      <div className="search-criteria-section-title">Account Name:</div>
      <div className="search-criteria-section-left d-flex">
        <input
          onChange={
                gLAcType ? e => filterGlList(e.target.value, 'accountName')
                  : (
                    savingsAcType ? e => filterListTwo(e.target.value, 'savings', 'accountName')
                      : e => filterListTwo(e.target.value, 'shares', 'accountName')
                  )
              }
          type="text"
          className="w-100"
        />
      </div>
    </div>
    <div className="search-creteria-account-details">
      <div className="search-creteria-account-details-header mb-2">Account Details:</div>
      {
          savingsAcType || sharesAcType || fixedAssetType ? (
            <div className="search-creteria-account-details-content-header">
              <div className="search-creteria-account-details-content-header-grid">AccountID</div>
              <div className="search-creteria-account-details-content-header-grid">
                { fixedAssetType ? 'SerialNO' : 'ProductID'}
              </div>
              <div className="search-creteria-account-details-content-header-grid">
                { fixedAssetType ? 'Location' : 'AccountName' }
              </div>
            </div>
          ) : gLAcType ? (
            <div className="search-creteria-account-details-content-header-two">
              <div className="search-creteria-account-details-content-header-grid">AccountID</div>
              <div className="search-creteria-account-details-content-header-grid">AccountName</div>
              <div className="search-creteria-account-details-content-header-grid">BranchID</div>
              <div className="search-creteria-account-details-content-header-grid">BranchName</div>
            </div>
          ) : null

          }
      {
            savingsAcType ? (
              <div className="search-creteria-account-details-content-outer">
                {
                  sVInnerModalList.map(account => (
                    <div
                      onClick={() => setSelectedAccount(account, 'SV')}
                      key={account.controlAccountGL}
                      className="search-creteria-account-details-content"
                    >
                      <div className="search-creteria-account-details-content-grid">{ account.accountID }</div>
                      <div className="search-creteria-account-details-content-grid">{ account.productID }</div>
                      <div className="search-creteria-account-details-content-grid">{ account.accountName }</div>
                    </div>
                  ))
                }
              </div>
            ) : sharesAcType || fixedAssetType ? (
              <div className="search-creteria-account-details-content-outer">
                {
                  (fixedAssetType
                    ? asstInnerModalList.filter(element => element.isDeleted === false)
                    : sHInnerModalList).map(account => (
                      <div
                        onClick={fixedAssetType ? () => displayCurrent(account)
                          : () => setSelectedAccount(account, 'SH')}
                        key={account.controlAccountGL}
                        className="search-creteria-account-details-content"
                      >
                        <div className="search-creteria-account-details-content-grid">{ account.accountID }</div>
                        <div className="search-creteria-account-details-content-grid">
                          {
                      fixedAssetType ? account.serialNo : account.productID
}
                        </div>
                        <div className="search-creteria-account-details-content-grid">
                          { fixedAssetType ? account.location : account.accountName }
                        </div>
                      </div>
                  ))
                }
              </div>
            ) : gLAcType ? (
              <div className="search-creteria-account-details-content-outer">
                {
                  innerModalList.map(account => (
                    <div
                      onClick={() => setSelectedAccount(account, 'GL')}
                      key={account.accountID}
                      className="search-creteria-account-details-content-two"
                    >
                      <div className="search-creteria-account-details-content-grid">
                        {account.accountID}
                      </div>
                      <div className="search-creteria-account-details-content-grid">
                        {
                        account.accountName.length < 22
                          ? (account.accountName)
                          : (`${account.accountName.substring(0, 22)} ...`)
                        }
                      </div>
                      <div className="search-creteria-account-details-content-grid">
                        {account.branchID}
                      </div>
                      <div className="search-creteria-account-details-content-grid">
                        {account.branchID === '000' ? 'Head Office'
                          : account.branchID === '001' ? 'Nansana'
                            : account.branchID === '002' ? 'Rugika' : null}
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : null
          }
    </div>
  </div>
);

export default Modal;
