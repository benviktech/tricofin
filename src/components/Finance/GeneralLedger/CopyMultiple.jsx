import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CopyMultiple = () => {
  const [branchList, setBranchList] = useState([]);
  const [branchListFirst, setBranchListFirst] = useState([]);
  const [values, setValues] = useState({});
  const [secondValues, setSecondValues] = useState({});
  const [ledgerAccounts, setLedgerAccounts] = useState([]);
  const [currentBranchList, setCurrentBranchList] = useState([]);
  const [currentBranchListFirst, setCurrentBranchListFirst] = useState([]);
  const [globalState, setGlobalState] = useState(false);
  const [finalSortedList, setFinalSortedList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [checkSorted, setCheckedSorted] = useState([]);

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/System/GetBranches')
      .then(response => {
        const updatedBranchList = [...response?.data, { branchID: '004', branchName: 'Global' }];
        setBranchList(updatedBranchList);
        setBranchListFirst(response?.data);
      })
      .catch(error => console.log(error.message));
  }, []);

  useEffect(async () => {
    await axios.get('https://tricofin.azurewebsites.net/api/Finance/GetGeneralLedgers')
      .then(response => setLedgerAccounts(response?.data))
      .catch(error => console.log(error.message));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSecondChange = e => {
    const { name, value } = e.target;
    setSecondValues({
      ...secondValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (values.branch === '004') {
      setCurrentBranchList(ledgerAccounts);
      setGlobalState(true);
    } else {
      setGlobalState(false);
      const result = ledgerAccounts.filter(element => element.branchID === values.branch);
      setCurrentBranchList(result);
    }
  }, [values]);

  useEffect(() => {
    const result = ledgerAccounts.filter(element => element.branchID === secondValues.branch);
    setCurrentBranchListFirst(result);
  }, [secondValues]);

  useEffect(() => {
    if (currentBranchListFirst.length > 0 && currentBranchList.length > 0) {
      const result = currentBranchList.filter(
        a => !currentBranchListFirst.map(b => b.accountID).includes(a.accountID),
      );
      setFinalSortedList(result);
    }
  }, [currentBranchListFirst, currentBranchList]);

  useEffect(() => {
    setSortedList(finalSortedList);
  }, [finalSortedList]);

  const handleSort = e => {
    const { name, checked } = e.target;
    if (name === 'allSelect') {
      const tempGL = sortedList.map(ledger => ({ ...ledger, isChecked: checked }));
      setSortedList(tempGL);
    } else {
      const tempGL = sortedList.map(
        ledger => (ledger.accountID === name ? { ...ledger, isChecked: checked } : ledger),
      );
      setSortedList(tempGL);
    }
  };

  const CopySingleGL = () => {
    setCheckedSorted(sortedList.filter(element => element.isChecked === true));
  };

  useEffect(() => {
    console.log(checkSorted, 'checkSorted to be submitted');
  }, [checkSorted]);

  return (
    <div className="main-copy-single-section">
      <div className="copy-single-section copy-single-section-many">
        <div className="gl-account-id-section gl-account-id-section-many">
          <div className="inner-gl-account-id-section">
            <span>From Branch:</span>
          </div>
          <div className="input-gl-account-id-section">
            {
              branchList.length > 0 ? (
                <select
                  name="branch"
                  value={values.branch}
                  className="h-100"
                  onChange={handleChange}
                >
                  <option value="" disabled selected hidden>Select</option>
                  {
                    branchList.map(branch => (
                      <option
                        key={branch.branchID}
                        value={branch.branchID}
                      >
                        {branch.branchName}
                      </option>
                    ))
                  }
                </select>
              ) : (
                <select>
                  <option value="" disabled selected hidden>Select</option>
                </select>
              )
            }
          </div>
        </div>
        <div className="gl-branch-id-section gl-branch-id-section-many">
          <div className="inner-gl-branch-id-section">
            <span>To Branch:</span>
          </div>
          <div className="details-gl-branch-id-section">
            {
              branchListFirst.length > 0 ? (
                <select
                  name="branch"
                  value={secondValues.branch}
                  onChange={handleSecondChange}
                >
                  <option value="" disabled selected hidden>Select</option>
                  {
                    branchListFirst.map(branch => (
                      <option
                        key={branch.branchID}
                        value={branch.branchID}
                      >
                        {branch.branchName}
                      </option>
                    ))
                  }
                </select>
              ) : (
                <select>
                  <option value="" disabled selected hidden>Select</option>
                </select>
              )
            }
          </div>
        </div>
        <button onClick={CopySingleGL} type="button" className="btn btn-success">
          <i className="far fa-check-circle mr-2" />
          Submit
        </button>
      </div>
      <div className="lower-copy-single-section">
        <div className="gl-exists-section">
          <div className="gl-exists-section-header">GL Exists</div>
          <div className="gl-exists-details-section">
            <div className="gl-exists-details-section-id bg-secondary-header">BrID</div>
            <div className="gl-exists-details-section-accountId bg-secondary-header">
              {globalState ? 'AccountID' : 'GLID'}
            </div>
            <div className="gl-exists-details-section-account-name bg-secondary-header">GLName</div>
          </div>
          <div className="main-gl-exists-details-section">
            {
              currentBranchList.map(value => (
                <div key={value.accountID} className="gl-exists-details-section">
                  <div className="gl-exists-details-section-id">
                    {globalState ? 'GLB' : value.branchID}
                  </div>
                  <div className="gl-exists-details-section-accountId">
                    {globalState ? value.glid : value.accountID}
                  </div>
                  <div className="gl-exists-details-section-account-name">
                    {
                      value.accountName.length < 25 ? value.accountName
                        : (`${value.accountName.substring(0, 25)} ...`)
                      }
                  </div>
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
              <input
                type="checkbox"
                name="allSelect"
                checked={!sortedList.some(ledger => ledger?.isChecked !== true)}
                onChange={handleSort}
              />
            </div>
            <div className="checkbox-label">Select All</div>
          </div>
          <div className="gl-does-not-exist-section-outter gl-does-not-exist-section-outter-many top-outer-gl-header-section">
            <div className="gl-does-not-exist-section-first d-flex justify-content-center">BrID</div>
            <div className="gl-does-not-exist-section-second d-flex justify-content-center">GLID</div>
            <div className="gl-does-not-exist-section-second d-flex justify-content-center">GLName</div>
          </div>
          <div className="main-gl-does-not-exist-section">
            {
              sortedList.map(value => (
                <div key={value.accountID} className="gl-does-not-exist-section-outter gl-does-not-exist-section-outter-many">
                  <div className="gl-does-not-exist-section-first d-flex justify-content-center gl-does-not-exist-section-first-loop">
                    <div className="gl-does-not-exist-section-first-chechbox">
                      <input
                        type="checkbox"
                        name={value.accountID}
                        checked={value?.isChecked || false}
                        onChange={handleSort}
                      />
                    </div>
                    <div className="gl-does-not-exist-section-first-brID">
                      {value.branchID}
                    </div>
                  </div>
                  <div className="gl-does-not-exist-section-second d-flex justify-content-center">{value.glid}</div>
                  <div className="gl-does-not-exist-section-second d-flex justify-content-center">
                    {
                      value.accountName.length < 20 ? value.accountName
                        : (`${value.accountName.substring(0, 20)} ...`)
                      }
                  </div>
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
