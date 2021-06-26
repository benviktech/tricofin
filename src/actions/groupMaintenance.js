import {
  PostGroupMaintenanceRequest,
  GetGroupMaintenanceRequest,
  UpdateGroupMaintenanceRequest,
  PostGroupMemberRequest,
  FetchGroupMembersListRequest,
  DeleteGroupMemberRequest,
} from '../utils/api';

export const POST_GROUP_MAINTENANCE_SUCCESS = 'POST_GROUP_MAINTENANCE_SUCCESS';
export const GROUP_MAINTENANCE_LIST = 'GROUP_MAINTENANCE_LIST';
export const LOADING_CONTENT = 'LOADING_CONTENT';
export const LOADING_ERROR = 'LOADING_ERROR';

export const groupMaintenaceSucces = data => ({
  type: POST_GROUP_MAINTENANCE_SUCCESS,
  payload: data,
});

export const groupMemberList = data => ({
  type: GROUP_MAINTENANCE_LIST,
  payload: data,
});

export const postGroupMaintenance = (data, history) => async dispatch => {
  const method = 'post';
  const path = '/api/Customers/SaveCustomerGroup';
  const values = {
    groupName: (data.groupName).toUpperCase(),
    formationDate: data.formationDate,
    location: (data.location).toUpperCase(),
    village: (data.village).toUpperCase(),
    regDate: data.regDate,
    regNo: data.regNo,
    meetingDay: parseInt(data.meetingDay, 10),
    meetingFreq: (data.meetingFreq).toUpperCase(),
    meetingPlace: (data.meetingPlace).toUpperCase(),
    sourcedBy: (data.sourcedBy).toUpperCase(),
    creditOfficer: (data.creditOfficer).toUpperCase(),
    savingsProductID: (data.savingsProductID).toUpperCase(),
    loanProductID: (data.loanProductID).toUpperCase(),
    maxMembers: parseInt(data.maxMembers, 10),
    minMembersLoanDisb: parseInt(data.minMembersLoanDisb, 10),
    createdOn: (new Date()).toISOString(),
    createdBy: 'BENVIK',
    modifiedOn: (new Date()).toISOString(),
    modifiedBy: 'BENVIK',
  };

  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await PostGroupMaintenanceRequest(method, path, values);
    history.push(`/groupmaintenanceview/${response.data.groupID}`);
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const getGroupMaintenance = GroupId => async dispatch => {
  const method = 'get';
  const path = `/api/Customers/GetCustomerGroup/${GroupId}`;

  try {
    const response = await GetGroupMaintenanceRequest(method, path);
    dispatch(groupMaintenaceSucces(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const updateGroupMaintenance = (data, groupId, history) => async dispatch => {
  const method = 'put';
  const path = '/api/Customers/UpdateCustomerGroup';

  const values = {
    groupID: groupId,
    groupName: (data.groupName).toUpperCase(),
    formationDate: data.formationDate,
    location: (data.location).toUpperCase(),
    village: (data.village).toUpperCase(),
    regDate: data.regDate,
    regNo: data.regNo,
    meetingDay: parseInt(data.meetingDay, 10),
    meetingFreq: (data.meetingFreq).toUpperCase(),
    meetingPlace: (data.meetingPlace).toUpperCase(),
    sourcedBy: (data.sourcedBy).toUpperCase(),
    creditOfficer: (data.creditOfficer).toUpperCase(),
    savingsProductID: (data.savingsProductID).toUpperCase(),
    loanProductID: (data.loanProductID).toUpperCase(),
    maxMembers: parseInt(data.maxMembers, 10),
    minMembersLoanDisb: parseInt(data.minMembersLoanDisb, 10),
    createdOn: (new Date()).toISOString(),
    createdBy: 'BENVIK',
    modifiedOn: (new Date()).toISOString(),
    modifiedBy: 'BENVIK',
  };
  try {
    const response = await UpdateGroupMaintenanceRequest(method, values, path);
    history.push(`/groupmaintenanceview/${response.data.groupID}`);
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const postGroupMember = data => async dispatch => {
  const path = '/api/Customers/SaveCustomerGroupMember';
  const method = 'post';
  try {
    const response = await PostGroupMemberRequest(method, data, path);
    dispatch(groupMemberList(response.data));
  } catch (error) {
    const result = `${error.message} 5423`;
    dispatch({ type: LOADING_ERROR, payload: result });
  }
};

export const fetchGroupMembersList = GroupId => async dispatch => {
  const path = `/api/Customers/GetCustomerGroupMembers/${GroupId}`;
  const method = 'get';
  try {
    const response = await FetchGroupMembersListRequest(method, path);
    dispatch(groupMemberList(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const deleteGroupMember = data => async dispatch => {
  const path = 'api/Customers/DeleteCustomerGroupMember';
  const method = 'delete';
  try {
    const response = await DeleteGroupMemberRequest(method, data, path);
    dispatch(groupMemberList(response.data));
  } catch (error) {
    console.log(error.message);
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};
