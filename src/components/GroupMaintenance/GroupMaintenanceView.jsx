/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import { getGroupMaintenance } from '../../actions/groupMaintenance';
import { GroupMaintenanceSidebar } from '../Sidebar/Sidebar';
import './index.css';
import MoreInfo from './MoreInfo';
import meetingDays from './FormData';
import systemProductRequest from './systemProducts';

const GroupMaintenanceView = () => {
  const { id } = useParams();
  const [frequencies, setFrequencies] = useState([]);
  const [systemBranches, setSystemBranches] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const groupDetails = useSelector(state => state.groupMaintenanceReducer);

  useEffect(() => {
    dispatch(getGroupMaintenance(id));
  }, []);

  const { systemsLoanDetails, systemsSavings } = systemProductRequest();

  const sortSavingsProduct = savingId => {
    let result = '';
    systemsSavings.forEach(val => {
      if (val.productID === savingId) {
        result = val.productName;
      }
    });
    return result;
  };

  const sortLoanProduct = loanId => {
    let result = '';
    systemsLoanDetails.forEach(val => {
      if (val.productID === loanId) {
        result = val.productName;
      }
    });
    return result;
  };

  useEffect(() => {
    const fetchData = () => {
      axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetSystemFrequencies')
        .then(response => {
          setFrequencies(response.data);
          axios.get('https://tricofin.azurewebsites.net/api/System/GetSystemUsers')
            .then(response => setUsersList(response.data))
            .catch(error => console.log(error.message));
        })
        .catch(error => console.log(error.message));
    };

    fetchData();
  }, []);

  const sortMeetingDay = day => {
    let date;
    meetingDays.forEach(meet => {
      if (meet.value === day) {
        date = meet.day;
      }
    });
    return date;
  };

  const sortMeetingFrequency = freq => {
    let result;
    if (frequencies.length > 0) {
      frequencies.forEach(frequency => {
        if (frequency.freqID === freq) {
          result = frequency.frequency;
        }
      });
    }

    return result;
  };

  useEffect(() => {
    axios.get('https://tricofin.azurewebsites.net/api/System/GetBranches')
      .then(response => setSystemBranches(response.data))
      .catch(error => console.log(error.message));
  }, []);

  const displayCreditedBy = userDetail => {
    let result = '';
    usersList.forEach(user => {
      if ((user.userName.toUpperCase()) === userDetail) {
        result = `${`${user.userName.trim()},`} ${
          user.surName.toUpperCase()} ${
          user.otherNames.toUpperCase()}`;
      }
    });
    return result;
  };

  const displayBranch = branchId => {
    let result = '';
    systemBranches.forEach(branch => {
      if (branch.branchID === branchId) {
        result = branch.branchName;
      }
    });
    return result;
  };

  const routeBack = () => history.goBack();

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Customer Information</span>
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
            <GroupMaintenanceSidebar />
          </div>
          <div className="submit-form-top-section">
            <div className="main-form-color boder">
              <div className="left-section">
                <div className="horizontal-section">
                  <div className="left-horizontal-section">Group Name:</div>
                  <div className="right-horizontal-section">
                    <div className="information-section">
                      {groupDetails.groupMaintenance.groupName}
                    </div>
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">Formation Date:</div>
                  <div className="right-horizontal-section">
                    <div className="inner-left-section">
                      <div className="information-section">
                        {new Date(groupDetails.groupMaintenance.formationDate)
                          .toUTCString()
                          .split(' ')
                          .slice(0, 4)
                          .join(' ')}
                      </div>
                    </div>
                    <div className="inner-right-section">
                      <div className="inner-right-label">Reg Date :</div>
                      <div className="inner-right-input">
                        <div className="information-section">
                          {new Date(groupDetails.groupMaintenance.regDate)
                            .toUTCString()
                            .split(' ')
                            .slice(0, 4)
                            .join(' ')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">Branch ID :</div>
                  <div className="right-horizontal-section">
                    <div className="inner-left-section">
                      <div className="information-section">
                        {displayBranch(groupDetails.groupMaintenance.branchID)}
                      </div>
                    </div>
                    <div className="inner-right-section">
                      <div className="inner-right-label">Reg No :</div>
                      <div className="inner-right-input">
                        <div className="information-section">
                          {groupDetails.groupMaintenance.regNo
                          && (groupDetails.groupMaintenance.regNo).toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">Location :</div>
                  <div className="right-horizontal-section">
                    <div className="information-section">
                      {groupDetails.groupMaintenance.location}
                    </div>
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">Village :</div>
                  <div className="right-horizontal-section">
                    <div className="information-section">
                      {groupDetails.groupMaintenance.village}
                    </div>
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">Sourced By :</div>
                  <div className="right-horizontal-section">
                    <div className="information-section-left">
                      {groupDetails.groupMaintenance.sourcedBy
                      && (displayCreditedBy(groupDetails.groupMaintenance.sourcedBy))
                        .split(',')[0]}
                    </div>
                    <div className="information-section">
                      {groupDetails.groupMaintenance.sourcedBy
                      && (displayCreditedBy(groupDetails.groupMaintenance.sourcedBy))
                        .split(',')[1]}
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-section">
                <div className="horizontal-section">
                  <div className="left-horizontal-section">Credit Officer :</div>
                  <div className="right-horizontal-section">
                    <div className="information-section-left">
                      {groupDetails.groupMaintenance.creditOfficer
                      && (displayCreditedBy(groupDetails.groupMaintenance.creditOfficer))
                        .split(',')[0]}
                    </div>
                    <div className="information-section">
                      {groupDetails.groupMaintenance.creditOfficer
                      && (displayCreditedBy(groupDetails.groupMaintenance.creditOfficer))
                        .split(',')[1]}
                    </div>
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">Savings Product :</div>
                  <div className="right-horizontal-section">
                    <div className="information-section-left">
                      {groupDetails.groupMaintenance.savingsProductID}
                    </div>
                    <div className="information-section">
                      {sortSavingsProduct(groupDetails.groupMaintenance.savingsProductID)}
                    </div>
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">Loan Product :</div>
                  <div className="right-horizontal-section">
                    <div className="information-section-left">
                      {groupDetails.groupMaintenance.loanProductID}
                    </div>
                    <div className="information-section">
                      {sortLoanProduct(groupDetails.groupMaintenance.loanProductID)}
                    </div>
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">Max Members Allowed :</div>
                  <div className="right-horizontal-section">
                    <div className="inner-left-section">
                      <div className="information-section">
                        {groupDetails.groupMaintenance.maxMembers}
                      </div>
                    </div>
                    <div className="inner-right-section">
                      <div className="inner-right-label members-number">
                        Min Members for Loan Disburesment
                      </div>
                      <div className="inner-right-input">
                        <div className="information-section">
                          {groupDetails.groupMaintenance.minMembersLoanDisb}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">Meeting Day :</div>
                  <div className="right-horizontal-section">
                    <div className="inner-left-section select-section">
                      <div className="information-section">
                        {sortMeetingDay(groupDetails.groupMaintenance.meetingDay)}
                      </div>
                    </div>
                    <div className="inner-right-section select-section-two">
                      <div className="inner-right-label">Meeting Frequency :</div>
                      <div className="inner-right-input">
                        <div className="information-section">
                          {sortMeetingFrequency(groupDetails.groupMaintenance.meetingFreq)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="horizontal-section">
                  <div className="left-horizontal-section">Meeting Place :</div>
                  <div className="right-horizontal-section">
                    <div className="information-section">
                      {groupDetails.groupMaintenance.meetingPlace}
                    </div>
                  </div>
                </div>

                <div className="submit-button-section">
                  <Link
                    className="add-customer-btn"
                    to={{
                      pathname: `/updategroupmember/${groupDetails.groupMaintenance.groupID}`,
                    }}
                  >
                    Update
                  </Link>
                  <Link
                    className="add-customer-btn"
                    to={{
                      pathname: '/groupmaintenanceform',
                    }}
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
            <MoreInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupMaintenanceView;
