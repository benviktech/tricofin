import React from 'react';

const CopyMultiple = () => {
  const data = [{ BrID: '001', accountID: '0011000010005', AccountName: 'TELLER NAME' },
    { BrID: '001', accountID: '0011000010005', AccountName: 'TELLER NAME' },
    { BrID: '001', accountID: '0011000010005', AccountName: 'TELLER NAME' },
    { BrID: '001', accountID: '0011000010005', AccountName: 'TELLER NAME' }];
  return (
    <div className="main-copy-single-section">
      <div className="copy-single-section copy-single-section-many">
        <div className="gl-account-id-section gl-account-id-section-many">
          <div className="inner-gl-account-id-section">
            <span>From Branch:</span>
          </div>
          <div className="input-gl-account-id-section">
            <select>
              <option value="">value</option>
            </select>
          </div>
        </div>
        <div className="gl-branch-id-section gl-branch-id-section-many">
          <div className="inner-gl-branch-id-section">
            <span>To Branch:</span>
          </div>
          <div className="details-gl-branch-id-section">
            <select>
              <option value="">value</option>
            </select>
          </div>
        </div>
        <button type="button" className="btn btn-success">
          <i className="far fa-check-circle mr-2" />
          Submit
        </button>
      </div>
      <div className="lower-copy-single-section">
        <div className="gl-exists-section">
          <div className="gl-exists-section-header">GL Exists</div>
          <div className="gl-exists-details-section">
            <div className="gl-exists-details-section-id bg-secondary-header">BrID</div>
            <div className="gl-exists-details-section-accountId bg-secondary-header">AccountID</div>
            <div className="gl-exists-details-section-account-name bg-secondary-header">Account Name</div>
          </div>
          <div className="main-gl-exists-details-section">
            {
          data.map(value => (
            <div key={value.BrID} className="gl-exists-details-section">
              <div className="gl-exists-details-section-id">{value.BrID}</div>
              <div className="gl-exists-details-section-accountId">{value.accountID}</div>
              <div className="gl-exists-details-section-account-name">{value.AccountName}</div>
            </div>
          ))
        }
          </div>
        </div>
        <div className="gl-does-not-exist-section">
          <div className="gl-does-not-exist-section-header">
            GL Does Not Exist
          </div>
          <div className="lower-gl-does-not-exist-section-header">
            <div className="first-lower-gl-does-not-exist-section-header">
              <input type="checkbox" name="allSelect" />
            </div>
            <div className="checkbox-label">Select All</div>
          </div>
          <div className="gl-does-not-exist-section-outter gl-does-not-exist-section-outter-many top-outer-gl-header-section">
            <div className="gl-does-not-exist-section-first">BrID</div>
            <div className="gl-does-not-exist-section-second">GLID</div>
            <div className="gl-does-not-exist-section-second">GLName</div>
          </div>
          <div className="main-gl-does-not-exist-section">
            {
              data.map(value => (
                <div key={value.BrID} className="gl-does-not-exist-section-outter gl-does-not-exist-section-outter-many">
                  <div className="gl-does-not-exist-section-first gl-does-not-exist-section-first-loop">
                    <div className="gl-does-not-exist-section-first-chechbox">
                      <input type="checkbox" />
                    </div>
                    <div className="gl-does-not-exist-section-first-brID">
                      {value.BrID}
                    </div>
                  </div>
                  <div className="gl-does-not-exist-section-second">{value.AccountName}</div>
                  <div className="gl-does-not-exist-section-second">{value.AccountName}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyMultiple;
