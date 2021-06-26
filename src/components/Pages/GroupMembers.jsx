/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { GroupMaintenanceSidebar } from '../Sidebar/Sidebar';
import SearchCustomer from '../Customer/SearchCustomer';
import {
  deleteGroupMember, fetchGroupMembersList, getGroupMaintenance, postGroupMember,
} from '../../actions/groupMaintenance';

const GroupMembers = () => {
  const [hideErrorDiv, setHideErrorDiv] = useState('d-none');
  const [groupMember, setGroupMember] = useState({});
  const [memberPost, setMemberPost] = useState([]);
  const [customerList, setCutomerList] = useState([]);
  const [memberSortedList, setMembersSortedList] = useState([]);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    joinDate: '',
    post: '',
  });

  const {
    searchIndividualCustomer,
    searchedCustomer, finalSortedList,
    setSearchedCustomer,
  } = SearchCustomer();

  const groupMemberMethod = customer => {
    setGroupMember(customer);
    setSearchedCustomer('');
  };

  const groupDetails = useSelector(state => state.groupMaintenanceReducer);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(getGroupMaintenance(id));
  }, []);

  const validatorMethod = values => {
    const errorResults = {};
    if (!values.joinDate) {
      errorResults.joinDate = 'Join Date Required';
    }
    if (!values.post) {
      errorResults.post = 'Post is Required';
    }

    return errorResults;
  };

  const createMember = e => {
    e.preventDefault();
    const res = validatorMethod(values);
    if (Object.keys(groupMember).length > 0
    && Object.keys(res).length === 0) {
      const data = {
        groupID: id,
        memberID: groupMember.custID,
        joinDate: values.joinDate,
        post: values.post,
        isExited: true,
        exitedOn: '2021-06-18T11:07:01.463Z',
        createdOn: (new Date()).toISOString(),
        createdBy: 'BENVIK',
        modifiedOn: (new Date()).toISOString(),
        modifiedBy: 'BENVIK',
      };
      dispatch(postGroupMember(data));
      setHideErrorDiv('');
      setErrors({});
      setGroupMember({
        foreName1: '',
        surName: '',
        rAddress: '',
      });
      setValues({
        joinDate: '',
        post: '',
        resError: '',
      });
    } else if (Object.keys(groupMember).length === 0) {
      setErrors({
        ...res,
        member: 'Member is required ',
      });
    } else {
      setErrors(res);
    }
  };

  const membersList = useSelector(state => state.groupMaintenanceReducer);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://tricofin.azurewebsites.net/api/Customers/GetIndividualCustomers')
        .then(response => {
          setCutomerList(response.data);
          axios.get('https://tricofin.azurewebsites.net/api/StaticData/GetMemberPosts')
            .then(response => {
              setMemberPost(response.data);
              dispatch(fetchGroupMembersList(id));
            })
            .catch(error => console.log(error.message));
        })
        .catch(error => console.log(error.message));
    };
    fetchData();
  }, []);

  const sortMembers = () => {
    const result = [];
    if (membersList.listOfMembers.length > 0) {
      membersList.listOfMembers.forEach(member => {
        customerList.forEach(customer => {
          if ((member.memberID) === (customer.custID)) {
            result.push({
              ...customer,
              joindate: member.joinDate,
              post: member.post,
            });
          }
        });
      });
    }
    setMembersSortedList(result);
  };

  const displayPost = postId => {
    let result = '';
    memberPost.forEach(postMem => {
      if (postMem.postID === postId) {
        result = postMem.position;
      }
    });
    return result.toUpperCase();
  };

  useEffect(() => {
    sortMembers();
  }, [membersList.listOfMembers]);

  const deleteMember = mem => {
    const data = {
      groupID: id,
      memberID: mem.custID,
      post: mem.post,
      createdBy: 'BENVIK',
      modifiedBy: 'BENVIK',
    };
    dispatch(deleteGroupMember(data));
  };

  const cancelCreate = () => {
    setErrors({});
    setGroupMember({
      foreName1: '',
      surName: '',
      rAddress: '',
    });
    setValues({
      joinDate: '',
      post: '',
      resError: '',
    });
  };

  useEffect(() => {
    if (Object.keys(groupMember).length === 3) {
      setGroupMember({});
    }
  }, [groupMember]);

  useEffect(() => {
    if (Object.keys(values).includes('resError')) {
      setValues({});
    }
  }, [values]);

  const displayError = () => setHideErrorDiv('d-none');

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Group Members Section</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <GroupMaintenanceSidebar />
          </div>
          <form className="submit-form-top-section identification-form" onSubmit={createMember}>
            <div className="identification-section">
              <div className="main-groups-section">
                <div className="id-display-section border p-2 mb-1">
                  <div className="main-group-top-left">Group ID:</div>
                  <div className="main-group-top-right">
                    <div className="group-top-input-left border">
                      { groupDetails.groupMaintenance.groupID }
                    </div>
                    <div className="group-top-input-right border">
                      { groupDetails.groupMaintenance.groupName }
                    </div>
                  </div>
                  {

                    membersList.error.includes('5423') ? (
                      <div className={`${hideErrorDiv} submit-error-section shadow`}>
                        <i
                          onClick={displayError}
                          className="far fa-times-circle"
                        />
                        Director already exist
                      </div>
                    ) : null
                  }
                </div>
                <div className="customer-information-section border">
                  <div className="customer-more-info">
                    Member&apos;s Information
                  </div>
                  <div className="lower-customer-info-section">
                    <div className="left-lower-customer-info-section">
                      <div className="first-lower-customer-info-section manage-drop-down mb-3">
                        <div className="label-lower-customer-info-section">
                          Search Member:
                        </div>
                        <div className="input-lower-customer-info-section">
                          <input
                            autoComplete="off"
                            type="text"
                            name="searchcustomer"
                            value={searchedCustomer}
                            onChange={searchIndividualCustomer}
                          />
                        </div>
                        {
                         searchedCustomer === '' ? (
                           <div className="modal-hide-section" />
                         ) : (

                           <div className="modal-popup-section">
                             <div className="inner-section-modal-section">
                               {
                              Array.from(new Set(finalSortedList)).map(customer => (
                                <div
                                  className="inner-section-modal-section-inner border"
                                  key={customer.custID}
                                  onClick={() => groupMemberMethod(customer)}
                                >
                                  <div className="modal-customer-name-section mr-2">
                                    { customer.title }
                                  </div>
                                  <div className="modal-customer-name-section mr-2">
                                    { customer.surName}
                                  </div>
                                  <div className="modal-customer-surname-section">
                                    { customer.foreName1 }
                                  </div>
                                </div>
                              ))
                            }
                             </div>
                           </div>
                         )
                      }
                      </div>

                      <div className="second-lower-customer-info-section error-content-section mb-3">
                        <div className="label-lower-customer-info-section">Member Name :</div>
                        <div className="input-lower-customer-info-section">
                          {
                            Object.keys(groupMember).length > 0 ? (
                              <input
                                value={`${groupMember.surName} ${groupMember.foreName1}`}
                                type="text"
                              />

                            ) : (
                              <input type="text" />
                            )
                          }
                        </div>
                        {
                          errors.member && (
                          <div className="error-notifier-section">
                            { errors.member }
                          </div>
                          )
                        }
                      </div>
                      <div className="second-lower-customer-info-section">
                        <div className="label-lower-customer-info-section">Residential Address :</div>
                        <div className="input-lower-customer-info-section">
                          {
                            Object.keys(groupMember).length > 0 ? (
                              <input
                                value={groupMember.rAddress}
                                type="text"
                              />

                            ) : (
                              <input type="text" />
                            )
                          }
                        </div>
                      </div>
                    </div>
                    <div className="left-lower-customer-info-section">
                      <div className="first-lower-customer-info-section error-content-section mb-3">
                        <div className="label-lower-customer-info-section">Join Date :</div>
                        <div className="input-lower-customer-info-section">
                          <input
                            name="joinDate"
                            value={values.joinDate}
                            onChange={handleChange}
                            type="date"
                          />
                        </div>
                        {
                          errors.joinDate && (
                          <div className="error-notifier-section">
                            { errors.joinDate }
                          </div>
                          )
                        }
                      </div>
                      <div className="second-lower-customer-info-section error-content-section">
                        <div className="label-lower-customer-info-section">Post :</div>
                        <div className="input-lower-customer-info-section">
                          {
                            memberPost.length > 0 ? (
                              <select
                                name="post"
                                value={values.post}
                                onChange={handleChange}
                              >
                                <option value="" disabled selected hidden>Select</option>
                                {
                                  memberPost.map(data => (
                                    <option
                                      key={data.postID}
                                      value={data.postID}
                                    >
                                      {data.position}
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

                        {
                          errors.post && (
                          <div className="error-notifier-section">
                            { errors.post }
                          </div>
                          )
                        }
                      </div>
                    </div>
                    <div className="right-lower-customer-info-section">
                      <div className="image-section">
                        image here
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="identification-listing">
              <div className="top-section members-listings mb-1 d-flex justify-content-center align-items-center p-1">
                Members Listings
              </div>
              <div className="top-section">
                <div className="idcode-section">
                  MemberID
                </div>
                <div className="idcode-section">
                  Name
                </div>
                <div className="idcode-section">
                  RAddress
                </div>
                <div className="idcode-section">
                  JoinDate
                </div>
                <div className="idcode-section">
                  Post
                </div>
                <div className="idcode-section">
                  Photo
                </div>
                <div className="idcode-section">
                  Remove
                </div>
              </div>
              <div className="out-form-loop-section">
                {
                  memberSortedList.length > 0 ? (
                    <div>
                      {
                        memberSortedList.map(mem => (
                          <div key={mem.custID} className="middle-section">
                            <div className="idcode-section-inner first-border-left">
                              {mem.custID}
                            </div>
                            <div className="idcode-section-inner">
                              {`${mem.surName} ${mem.foreName1}`}
                            </div>
                            <div className="idcode-section-inner">
                              {mem.rAddress}
                            </div>
                            <div className="idcode-section-inner">
                              {
                                mem.joindate && (new Date(mem.joindate)
                                  .toUTCString()
                                  .split(' ')
                                  .slice(0, 4)
                                  .join(' '))
                              }
                            </div>
                            <div className="idcode-section-inner">
                              {displayPost(mem.post)}
                            </div>
                            <div className="idcode-section-inner">
                              sample
                            </div>
                            <div className="idcode-section-inner delete-info">
                              <button
                                type="button"
                                onClick={() => deleteMember(mem)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))
                      }
                    </div>

                  ) : (
                    <div className="middle-section lower-folder-icon-section">
                      <i className="far fa-folder-open" />
                    </div>
                  )
                }

              </div>
              <div className="add-form-data-button">
                <button
                  type="submit"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={cancelCreate}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupMembers;
