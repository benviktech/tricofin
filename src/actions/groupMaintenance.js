import {
  PostGroupMaintenanceRequest,
  GetGroupMaintenanceRequest,
  UpdateGroupMaintenanceRequest,
} from '../utils/api';

export const POST_GROUP_MAINTENANCE_SUCCESS = 'POST_GROUP_MAINTENANCE_SUCCESS';
export const LOADING_CONTENT = 'LOADING_CONTENT';
export const LOADING_ERROR = 'LOADING_ERROR';

export const groupMaintenaceSucces = data => ({
  type: POST_GROUP_MAINTENANCE_SUCCESS,
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