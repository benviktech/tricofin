import React, { useState, useEffect } from 'react';

import axios from 'axios';
import './index.css';

const GeneralLedgerPayments = () => {
  const [glParameters, setGlParameters] = useState([]);
  const [glIds, setGlids] = useState([]);

  useEffect(async () => {
    await axios.get('https://tricofin.azurewebsites.net/api/Finance/GetGeneralLedgerParameters')
      .then(response => setGlParameters(response?.data))
      .catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/Finance/GetGeneralLedgerIDs')
      .then(response => setGlids(response?.data))
      .catch(error => error.message);
  }, []);

  const fetchAccount = accountId => {
    let result = '';
    if (glIds.length > 0) {
      result = (glIds.filter(element => element.glid === accountId))[0].glName;
    }
    return result;
  };
  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info-lg">
          <span>Main General Ledger Parameters</span>
        </div>
        <div className="lower-downer-section-gen-led">
          <div className="first-ledger-parameters text-white">SerialID</div>
          <div className="second-ledger-parameters text-white">Description</div>
          <div className="third-ledger-parameters text-white">GL Account ID</div>
          <div className="forth-ledger-parameters text-white">GL Account Name</div>
        </div>
        {
          glParameters.length > 0 ? glParameters.map(element => (
            <div key={element.serialID} className="lower-downer-section-gen-led lower-downer-section-gen-led-lower">
              <div className="first-ledger-parameters">{ element.serialID }</div>
              <div className="second-ledger-parameters">{ element.description }</div>
              <div className="third-ledger-parameters">{ element.accountID }</div>
              <div className="forth-ledger-parameters">
                { element.accountID && fetchAccount(element.accountID) }
              </div>
            </div>
          )) : null
        }
        <div className="gl-parameters-submission-form">
          <div className="mb-2 gl-parameters-submission-form-header">GL Parameters Details</div>
          <div className="gl-parameter-details-bottom">
            <div className="inter-branch-left">GL Parameter :</div>
            <div className="inter-branch-right">3 - InterBranch Account :</div>
          </div>
          <div className="gl-parameter-details-bottom">
            <div className="inter-branch-left">GL AccountID :</div>
            <input type="text" />
            <div className="first-empty-parameter">1</div>
            <div className="second-empty-parameter">2</div>
          </div>
        </div>
        <div className="gl-parameters-button-section">
          <button type="button">Edit</button>
          <button type="button">Save</button>
          <button type="button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default GeneralLedgerPayments;
