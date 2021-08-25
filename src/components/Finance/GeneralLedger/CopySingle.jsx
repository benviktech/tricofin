import React from 'react';

const CopySingle = () => {
  const data = [{ BrID: '001', accountID: '0011000010005', AccountName: 'TELLER NAME' },
    { BrID: '001', accountID: '0011000010005', AccountName: 'TELLER NAME' },
    { BrID: '001', accountID: '0011000010005', AccountName: 'TELLER NAME' },
    { BrID: '001', accountID: '0011000010005', AccountName: 'TELLER NAME' }];
  return (
    <div className="main-copy-single-section">
      <div className="copy-single-section">
        <div className="gl-account-id-section">
          <div className="inner-gl-account-id-section">
            <span>GL A/C ID:</span>
          </div>
          <div className="input-gl-account-id-section">
            <input type="text" />
          </div>
          <div className="gl-account-name">
            <span>TELLER SHIVAN</span>
          </div>
        </div>
        <div className="gl-branch-id-section">
          <div className="inner-gl-branch-id-section">
            <span>BRANCH:</span>
          </div>
          <div className="details-gl-branch-id-section">
            <span>001</span>
          </div>
          <div className="details-gl-branch-name-section">
            <span>BRANCH NAME</span>
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
          <div className="gl-does-not-exist-section-outter top-outer-gl-header-section">
            <div className="gl-does-not-exist-section-first">BrID</div>
            <div className="gl-does-not-exist-section-second">AccountName</div>
          </div>
          <div className="main-gl-does-not-exist-section">
            {
                data.map(value => (
                  <div key={value.BrID} className="gl-does-not-exist-section-outter">
                    <div className="gl-does-not-exist-section-first gl-does-not-exist-section-first-loop">
                      <div className="gl-does-not-exist-section-first-chechbox">
                        <input type="checkbox" />
                      </div>
                      <div className="gl-does-not-exist-section-first-brID">
                        {value.BrID}
                      </div>
                    </div>
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

export default CopySingle;
